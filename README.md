Hundpensionatet Tassen 🐾

Om projektet

Jag har byggt en webbplats för Hundpensionatet Tassen med HTML, CSS och JavaScript. Här kan kunder se tjänster, priser, öppettider och kontaktuppgifter. Jag ville göra en enkel och användarvänlig webbplats.

Så kör man projektet

Öppna projektmappen i Visual Studio Code och starta index.html med Live Server. Ingen extra installation behövs.

Funktioner

* En klocka som uppdateras varje sekund och visar om Tassen är öppet eller stängt.
* Ett bokningsformulär där man kan lägga till och ta bort förfrågningar. De sparas i webbläsarens localStorage, inte hos företaget.
* Fem kundomdömen som visas slumpmässigt när man klickar på en knapp.
* En responsiv design med navigation, tjänster, bilder och kontaktinformation.

JavaScript och VG

Jag har skapat klassen Bokningslista med constructor och metoder för att lägga till, ta bort och spara bokningar. Jag skapar objektet med new Bokningslista().

Jag använder this.bokningar för att arbeta med objektets egen array av bokningar. Det är ett exempel på hur this fungerar i en klass.

I renderaBokningar() använder jag forEach() för att gå igenom bokningarna och skapa HTML-element. Jag valde forEach() eftersom jag vill visa varje bokning utan att skapa en ny array.

Varje klickfunktion kan använda bokning.id från sin omgivande funktion. Det är ett exempel på scope. Bokningarna sparas som en array av objekt, och omdömena är också en array av objekt.

Layout

Jag använde CSS Grid för tjänstekorten och Flexbox för navigationen. Grid gör det enkelt att visa korten i kolumner, medan Flexbox hjälper mig att placera länkarna. På mobilen anpassas layouten till en mindre skärm.

Felsökning

Jag hade problem med att några bilder blev beskurna. Jag använde DevTools för att undersöka CSS och testade olika värden på height och object-fit. Sedan ändrade jag CSS-filen och fick bilderna att visas bättre. Jag lärde mig hur DevTools kan hjälpa mig att hitta fel.

Reflektion

Det svåraste var att förstå hur JavaScript, DOM och localStorage fungerar tillsammans. Jag har lärt mig att använda funktioner, klasser, objekt och arrayer för att bygga en interaktiv webbplats.

AI-användning

Jag använde AI som stöd för att förstå kod och felsöka. Jag testade också ändringarna själv i VS Code och webbläsaren.