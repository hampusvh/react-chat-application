# 📒 Development Log
---
## main.jsx + App.jsx
### main.jsx:

Lade till BrowserRouter från react-router-dom för att appen ska kunna hantera olika URL-vyer utan att ladda om sidan.

Mountade <App /> som root-komponent, vilket betyder att det är därifrån hela applikationen startar.

### App.jsx:

Definierade alla routes med <Routes> och <Route> (t.ex. /login, /register, /chat osv).

Använde <ProtectedRoute> som wrapper för att skydda vissa sidor (/chat, /profile) så att de bara är tillgängliga för inloggade användare.

---

## ProtectedRoute.jsx
Denna komponent kollar om användaren har en giltig JWT-token.

Om token saknas eller har gått ut, skickas användaren automatiskt till /login.

På så sätt slipper jag lägga in kontroll på varje sida – jag kan bara wrappa hela routen med <ProtectedRoute>.

---

## jwt.js
Innehåller två hjälpfunktioner för att hantera JWT:

decodeToken(token) – Dekodar en JWT-token och plockar ut t.ex. användar-ID, användarnamn, och exp (utgångsdatum).

isExpired(token) – Kollar om tokenen har gått ut genom att jämföra exp med aktuell tid (Math.floor(Date.now() / 1000)).

Poängen med att lägga detta i en separat fil är att jag kan återanvända logiken på flera ställen – t.ex. i ProtectedRoute eller om jag vill visa en varning i framtiden när token är på väg att gå ut.

--- 

## auth.js
Innehåller alla funktioner för autentisering och säkerhet – alltså inloggning, registrering och CSRF-skydd.
Genom att samla dessa API-anrop i en separat fil slipper jag skriva fetch-logik direkt i komponenterna, vilket gör koden mer läsbar och lättare att underhålla.

### getCsrfToken()
Hämtar en CSRF-token från /auth/csrf.
Detta är ett säkerhetskrav från API:t, och måste göras innan jag skickar in data via POST, PUT eller DELETE.

Den sparas som en cookie automatiskt, tack vare att jag använder credentials: "include" i fetch-anropet.

Jag kallar alltid på getCsrfToken() direkt innan jag gör något som ändrar data (t.ex. registrering, login, posta/radera meddelande, uppdatera profil).

### registerUser(data)
Skickar ett POST-anrop till /auth/register med ett objekt som innehåller:

- username
- email
- password
- avatar

Om det finns något fel (t.ex. att e-postadressen redan är upptagen) returnerar API:t ett felmeddelande som visas i gränssnittet.

Registreringen loggar inte automatiskt in användaren – efter registrering skickas användaren manuellt vidare till /login.

### loginUser(data)
Skickar ett POST-anrop till /auth/token med användarnamn och lösenord.
Vid lyckad inloggning returnerar servern:

- en JWT-token
- användar-ID
- användarnamn
- avatar-URL

All denna data sparas i localStorage, så att användaren förblir inloggad även om sidan laddas om.

Om login misslyckas (t.ex. fel lösenord) visas ett felmeddelande, t.ex. "Invalid credentials".

--- 

## Login.jsx

Login-komponenten hanterar inloggning av befintliga användare.

Den använder useState för att lagra formulärdata och felmeddelanden, och useNavigate för att skicka användaren vidare efter inloggning.

Vid submit görs följande:

- Hämtar en CSRF-token med getCsrfToken() – detta krävs av API:t för att skydda mot CSRF-attacker.
- Skickar ett POST-anrop med användarnamn + lösenord till /auth/token via loginUser().

Vid lyckad inloggning sparas:

- JWT-token
- userId
- användarnamn
- avatar

i localStorage.

Användaren redirectas till /chat.

Om något går fel (t.ex. fel lösenord eller användarnamn) visas ett felmeddelande.


---

## Register.jsx

Register-komponenten låter nya användare skapa ett konto.

Formuläret innehåller fält för:
- användarnamn
- e-postadress
- lösenord
- avatar-URL

Vid submit:

- Hämtas en CSRF-token med getCsrfToken()
- Ett POST-anrop skickas till /auth/register via registerUser() med all data.
- Vid lyckad registrering redirectas användaren till /login.

Om API:et returnerar ett fel (t.ex. att e-posten redan är upptagen) visas ett tydligt felmeddelande i gränssnittet.

---

## api.js

Innehåller API_URL, som är bas-URL:en för alla anrop till backend-API:t.

Genom att centralisera detta i en egen fil kan vi slippa hårdkoda URL:er i varje fetch(), och håller det rent. 

---

