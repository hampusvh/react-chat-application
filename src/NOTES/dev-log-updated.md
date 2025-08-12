# 📒 Development Log – Sammanfattat Flöde

Applikationen är uppbyggd med React och använder `react-router-dom` för sidnavigering utan omladdning.  
I `main.jsx` mountas `<App />` som root-komponent och wrappas i `BrowserRouter` så att URL-vyer kan hanteras smidigt.

## Routing och skyddade sidor
`App.jsx` definierar alla routes (`/login`, `/register`, `/chat`, `/profile` osv).  
För skyddade sidor används `<ProtectedRoute>`, som kontrollerar JWT-token. Saknas eller är den ogiltig skickas användaren till `/login`.

## JWT-hantering
`jwt.js` innehåller återanvändbara hjälpfunktioner:
- `decodeToken()` – plockar ut data (ID, användarnamn, exp) från JWT.  
- `isExpired()` – kontrollerar om token gått ut.  

## Autentisering och CSRF-skydd
`auth.js` samlar alla autentiseringsanrop till API:t:
- `getCsrfToken()` – hämtar CSRF-token innan POST/PUT/DELETE (krav från API:t, cookies hanteras automatiskt).  
- `registerUser(data)` – skickar registreringsdata, visar felmeddelanden vid behov, redirectar sedan till `/login`.  
- `loginUser(data)` – loggar in, sparar JWT + användardata i `localStorage`, redirectar till `/chat`.  

## Login-flöde
`Login.jsx`:
1. Användaren fyller i formulär.  
2. Hämtar CSRF-token.  
3. Skickar login-anrop via `loginUser()`.  
4. Vid lyckad inloggning sparas token och användardata i `localStorage` → redirect till `/chat`.  
5. Vid fel visas meddelande.

## Registreringsflöde
`Register.jsx`:
1. Användaren fyller i användarnamn, e-post, lösenord, avatar.  
2. Hämtar CSRF-token.  
3. Skickar registreringsanrop via `registerUser()`.  
4. Vid lyckad registrering → redirect till `/login`, annars visas fel.

## API-baskonfiguration
`api.js` innehåller `API_URL` – central plats för backend-URL så att alla anrop kan uppdateras på ett ställe.
