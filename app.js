"use strict";

// ====================================
// DEL 1 - ÖPPET JUST NU
// ====================================

// Formaterar tid med två siffror
function formatTid(tal) {
    return String(tal).padStart(2, "0");
}

// Kontrollerar öppettider
function arOppet(datum) {
    const dag = datum.getDay();
    const timme = datum.getHours();
    const minut = datum.getMinutes();

    const tid = timme * 60 + minut;

    // Måndag till fredag
    if (dag >= 1 && dag <= 5) {
        return tid >= 7 * 60 && tid < 18 * 60;
    }

    // Lördag
    if (dag === 6) {
        return tid >= 9 * 60 && tid < 14 * 60;
    }

    // Söndag
    return false;
}

// Uppdaterar klocka och status
function uppdateraOppetstatus() {
    const nu = new Date();

    const timmar = formatTid(nu.getHours());
    const minuter = formatTid(nu.getMinutes());
    const sekunder = formatTid(nu.getSeconds());

    const klocka = [timmar, minuter, sekunder].join(":");

    const datumText = nu.toLocaleDateString("sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("datum").textContent =
        datumText;

    document.getElementById("klocka").textContent =
        klocka;

    const status = document.getElementById("status");

    if (arOppet(nu)) {
        status.textContent = "Öppet just nu";
        status.className = "oppet";
    } else {
        status.textContent = "Stängt just nu";
        status.className = "stangt";
    }
}

// Startar klockan
uppdateraOppetstatus();

setInterval(uppdateraOppetstatus, 1000);


// ====================================
// DEL 2 - BOKNINGSFÖRFRÅGNINGAR
// ====================================

// Klass för bokningar
class Bokningslista {

    constructor() {
        this.bokningar = this.hamtaBokningar();
    }

    // Hämtar bokningar från localStorage
    hamtaBokningar() {
        try {
            const sparade = localStorage.getItem(
                "tassenBokningar"
            );

            if (!sparade) {
                return [];
            }

            const data = JSON.parse(sparade);

            return Array.isArray(data) ? data : [];

        } catch (fel) {
            console.error("Fel vid hämtning:", fel);
            return [];
        }
    }

    // Sparar bokningar
    spara() {
        try {
            localStorage.setItem(
                "tassenBokningar",
                JSON.stringify(this.bokningar)
            );
        } catch (fel) {
            console.error("Fel vid sparning:", fel);
        }
    }

    // Lägger till bokning
    laggTill(hund, datum) {
        const nyBokning = {
            id: Date.now() + Math.random(),
            hund: hund,
            datum: datum
        };

        this.bokningar.push(nyBokning);
        this.spara();
    }

    // Tar bort bokning
    taBort(id) {
        this.bokningar = this.bokningar.filter(
            bokning => bokning.id !== id
        );

        this.spara();
    }
}

// Skapar objekt från klassen
const bokningslista = new Bokningslista();

// Hämtar HTML-element
const bokningsForm = document.getElementById("bokningsForm");
const hundNamn = document.getElementById("hundNamn");
const bokningsDatum = document.getElementById("bokningsDatum");
const bokningsLista = document.getElementById("bokningsLista");
const tomLista = document.getElementById("tomLista");
const felmeddelande = document.getElementById("felmeddelande");

// Visar bokningarna
function renderaBokningar() {
    bokningsLista.innerHTML = "";

    if (bokningslista.bokningar.length === 0) {
        tomLista.hidden = false;
        return;
    }

    tomLista.hidden = true;

    bokningslista.bokningar.forEach(function(bokning) {
        const li = document.createElement("li");

        const information = document.createElement("span");

        information.textContent =
            bokning.hund + " – " + bokning.datum;

        const knapp = document.createElement("button");

        knapp.textContent = "Avboka";
        knapp.type = "button";
        knapp.className = "avboka-btn";

        knapp.addEventListener("click", function() {
            bokningslista.taBort(bokning.id);
            renderaBokningar();
        });

        li.appendChild(information);
        li.appendChild(knapp);

        bokningsLista.appendChild(li);
    });
}

// Hanterar formuläret
bokningsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const hund = hundNamn.value.trim();
    const datum = bokningsDatum.value;

    if (hund === "" || datum === "") {
        felmeddelande.textContent =
            "Fyll i hundens namn och önskat datum.";
        return;
    }

    // Kontrollerar datum
    const idag = new Date();

    const idagText =
        idag.getFullYear() + "-" +
        formatTid(idag.getMonth() + 1) + "-" +
        formatTid(idag.getDate());

    if (datum < idagText) {
        felmeddelande.textContent =
            "Välj dagens datum eller ett framtida datum.";
        return;
    }

    felmeddelande.textContent = "";

    bokningslista.laggTill(hund, datum);

    renderaBokningar();

    bokningsForm.reset();
});

// Visar sparade bokningar
renderaBokningar();


// ====================================
// DEL 3 - KUNDOMDÖMEN
// ====================================

// Array med omdömen
const omdomen = [
    {
        text: "Min hund älskar Tassen! personalen är fantastisk och miljön är perfekt för hundar.",
        namn: "Lele"
    },
    {
        text: "Ett fantastiskt ställe för hundar och deras ägare jämfört med andra omdömen.",
        namn: "Kulisara"
    },
    {
        text: "Alltid trevligt bemötande och bra service.",
        namn: "SALMA"
    },
    {
        text: "fantastiskt!",
        namn: "Roder"
    },
    {
        text: "Rekommenderar verkligen Tassen!",
        namn: "Odia"
    }
];

const omdomeText = document.getElementById("omdomeText");
const omdomeNamn = document.getElementById("omdomeNamn");
const nyttOmdome = document.getElementById("nyttOmdome");

let senasteIndex = -1;

// Visar ett slumpmässigt omdöme
function visaOmdome() {
    let nyttIndex;

    do {
        nyttIndex = Math.floor(
            Math.random() * omdomen.length
        );
    } while (
        nyttIndex === senasteIndex &&
        omdomen.length > 1
    );

    senasteIndex = nyttIndex;

    const valtOmdome = omdomen[nyttIndex];

    omdomeText.textContent = valtOmdome.text;
    omdomeNamn.textContent = "– " + valtOmdome.namn;
}

// Byter omdöme
nyttOmdome.addEventListener("click", visaOmdome);

// Visar första omdömet
visaOmdome();


// ====================================
// DEL 4 - NAVIGATION
// ====================================

// Hämtar meny och sektioner
const menyLankar = document.querySelectorAll("nav a");
const sektioner = document.querySelectorAll("main > section");
const footer = document.querySelector("footer");

// Visar vald sida
function visaSida(id) {

    // Döljer alla sektioner
    sektioner.forEach(function(sektion) {
        sektion.classList.remove("aktiv");
    });

    // Visar kontakt eller vald sektion
    if (id === "kontakt") {
        footer.style.display = "block";
    } else {
        footer.style.display = "none";

        const valdSektion = document.getElementById(id);

        if (valdSektion) {
            valdSektion.classList.add("aktiv");
        }
    }

    window.scrollTo(0, 0);
}

// Klick på menyn
menyLankar.forEach(function(lank) {
    lank.addEventListener("click", function(event) {
        event.preventDefault();

        const id = lank.getAttribute("href").substring(1);

        window.location.hash = id;
        visaSida(id);
    });
});

// Visar rätt sida vid start
const startSida =
    window.location.hash.substring(1) || "hem";

visaSida(startSida);

// Hanterar webbläsarens bakåt- och framåtknappar
window.addEventListener("hashchange", function() {
    const id =
        window.location.hash.substring(1) || "hem";

    visaSida(id);
});