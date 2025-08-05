    # 📘 Chatify – Funktionell sammanfattning

    Detta är en genomgång av hur de viktigaste delarna i Chatify-applikationen fungerar. Allt är byggt steg för steg, metodiskt och i enlighet med uppgiftsbeskrivningen.

    ---

    ## 🟢 Registrering (`Register.jsx`)

    Registreringssidan låter användaren skapa ett konto genom att fylla i:

    - Användarnamn
    - E-postadress
    - Lösenord
    - Avatar-URL

    En CSRF-token hämtas först för säkerhet. Därefter skickas användarens data till API:et.  
    Vid fel (t.ex. att e-post redan används) visas ett tydligt felmeddelande. Vid lyckad registrering visas en bekräftelse och användaren skickas vidare till inloggningen.

    Inga onödiga komponenter eller extra logik används. Fokus ligger på enkelhet och funktion.

    ---

    ## 🟢 Inloggning (`Login.jsx`)

    Användaren loggar in med användarnamn och lösenord.  
    Samtidigt hämtas en CSRF-token som skickas med i anropet till API:et.

    Om inloggningen lyckas returneras en JWT-token som innehåller:

    - Användarens ID
    - Användarnamn
    - Avatar

    Dessa sparas i `localStorage`, vilket gör att användaren förblir inloggad även vid sidladdning.  
    Vid felaktiga uppgifter visas ett meddelande som t.ex. *"Invalid credentials"*.

    Efter lyckad inloggning skickas användaren vidare till `/chat`.

    ---

    ## 🟢 Chattsida (`Chat.jsx`)

    Chattsidan visar alla meddelanden i systemet.

    - Egna meddelanden visas till höger
    - Andras meddelanden visas till vänster

    Användaren kan skriva ett nytt meddelande i ett inmatningsfält längst ner.  
    När "Send" trycks:

    1. Hämtas en CSRF-token
    2. Meddelandet saneras (för att blockera HTML och script)
    3. Meddelandet skickas till API:t
    4. Meddelandelistan uppdateras

    Meddelandetexten saneras genom att ersätta `<` och `>` med deras HTML-kod.  
    Detta förhindrar XSS-attacker.

    Användaren kan radera sina egna meddelanden. En papperskorgsikon visas enbart på meddelanden som tillhör användaren, och radering sker med ett DELETE-anrop till API:et.

    ---

    ## ✅ Övrig funktionalitet

    - JWT-token sparas i `localStorage` och dekodas med `jwt-decode`
    - Alla API-anrop sker med `fetch` via funktioner i `utils/api.js`
    - CSRF-token hämtas innan varje POST/DELETE
    - Användarinfo (avatar, namn, ID) hämtas från JWT/localStorage

    ---

    ## 🟢 SideNav (`SideNav.jsx`)

    SideNav-komponenten visas i vänsterspalten på sidor där användaren är inloggad, t.ex. på chatt- eller profilsidan. Den visar:

    - Användarens avatar
    - Användarnamn
    - En tydlig logout-knapp

    ### 🔐 Logout

    När användaren klickar på "Logout" rensas all användardata ur `localStorage`:

    - JWT-token
    - Användar-ID
    - Användarnamn
    - Avatar

    Därefter skickas användaren till `/login`.  
    Detta gör att användaren blir fullständigt utloggad och inte längre kan komma åt skyddade delar av appen.

    SideNav är enkel att återanvända och ligger separat från resten av innehållet, vilket gör den lätt att importera på flera sidor.

    ---

    ## 🟢 Skyddade routes (`ProtectedRoute.jsx`)

    För att skydda sidor som endast ska vara tillgängliga för inloggade användare används en separat komponent som kontrollerar om en giltig JWT-token finns sparad i webbläsaren.

    Om ingen token hittas, skickas användaren automatiskt till inloggningssidan.

    Denna komponent används för att skydda till exempel `/chat` och `/profile`, vilket gör att en användare inte kan komma åt dessa sidor via URL utan att först vara inloggad.

    Skyddet är generellt och återanvändbart. Det gör att `App.jsx` kan hållas ren och tydlig, eftersom logiken för åtkomstkontroll ligger separat.

    ---

    ## 🟣 Profilhantering (`Profile.jsx`)

    Profilsidan låter användaren:

    - Se sitt nuvarande användarnamn, e-postadress och avatar
    - Uppdatera dessa uppgifter
    - Radera sitt konto helt

    När sidan laddas görs ett API-anrop för att hämta aktuell information om användaren. Denna information visas i ett formulär där användaren kan ändra fälten och skicka in ändringarna.

    För att spara ändringarna används ett PATCH-anrop till API:et, och en CSRF-token hämtas innan det sker. Lyckad uppdatering bekräftas i gränssnittet, och användarens information i `localStorage` uppdateras så att rätt avatar och namn visas direkt även i resten av appen.

    Användaren kan även välja att radera sitt konto. Detta görs via ett DELETE-anrop mot samma endpoint. Vid bekräftad radering rensas alla lokala användardata och användaren skickas tillbaka till inloggningssidan.

    ---

    ## 🚧 Fortsättning

    Nästa delar inkluderar:

    - Stöd för konversationer (VG)
    - Sentry (VG)