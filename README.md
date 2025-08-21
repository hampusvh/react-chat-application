<h1 align="center">React Chat App</h1>

<p align="center">
  A web-based chat application built with React and Vite, powered by the Chatify API.
</p>

---

## Applikationsbeskrivning
Detta projekt är en webbaserad chattapplikation byggd med **React** och **Vite**, som använder **Chatify API** för autentisering, meddelandehantering och profilhantering. Applikationen kräver registrering och inloggning för att kunna användas.

## Autentisering
Autentisering hanteras genom en kombination av CSRF- och JWT-tokens 
- En CSRF-token hämtas initialt via `PATCH /csrf` och används vid registrering och inloggning  
- Vid lyckad inloggning returneras en JWT som sparas i `localStorage` och används i `Authorization`-headern för skyddade anrop 
- Applikationen tillämpar `ProtectedRoute` för att endast tillåta åtkomst till chatten och profilsidan för inloggade användare
- Efter inloggning visas användarens användarnamn och avatar i gränssnittet

## Chat
Chatten kommunicerar mot `/messages`-endpointen och erbjuder följande funktioner:  
- Hämtning och visning av meddelanden
- Egna meddelanden renderas till höger, andras till vänster
- Skapande av nya meddelanden med sanitering av innehållet för att förhindra XSS
- Möjlighet att radera egna meddelanden  
- Stöd för flera konversationer via `conversationId`

## Profilhantering
Användaren kan hantera sin profil via `/user`- och `/users`-endpoints. 
Funktioner inkluderar:  
- Uppdatering av användarnamn, e-post och avatar  
- Avatar-preview i realtid när en ny bild-URL anges
- Radering av konto, vilket ger feedback/varning, rensar `localStorage` och loggar ut användaren

## Navigering och logout
Navigationen hanteras genom en `SideNav`-komponent som visar avatar, användarnamn och länkar till profil samt logout. Vid utloggning rensas JWT och användaren redirectas till login-sidan.

## Säkerhet
- CSRF-token används endast vid registrering och inloggning
- JWT verifieras och kontrolleras mot utgångsdatum
- **Content Security Policy (CSP)** begränsar tillåtna bildkällor till betrodda domäner (`i.pravatar.cc`, `freeimage.host`) 
- Alla meddelanden saneras innan de skickas för att motverka XSS

## Extra funktionalitet
- **Loggning och monitorering** via [Sentry](https://sentry.io) 
- **Flera konversationer** stöds genom `conversationId` 
- Deployment på **Netlify** med fungerande CORS-konfiguration

## 🗂 Filstruktur (src/)

```plaintext
src/
├── api/
│   ├── auth.js            # Login, register, hämta CSRF-token
│   ├── messages.js        # CRUD för meddelanden
│   └── user.js            # Hämta, uppdatera och radera användare
│
├── components/
│   ├── AvatarPreview.jsx  # Live-preview av avatar-URL
│   ├── MessageList.jsx    # Lista över meddelanden
│   ├── ProtectedRoute.jsx # Åtkomstskydd för routes
│   └── SideNav.jsx        # Navigering + Logout
│
├── config/
│   └── api.js             # Innehåller API_URL som hanterar API-anrop
│
├── pages/
│   ├── Chat.jsx           # Chattgränssnitt med meddelandehantering
│   ├── Login.jsx          # Inloggningsformulär
│   ├── Profile.jsx        # (VG) Redigera och radera användare
│   └── Register.jsx       # Registreringsformulär
│
├── styles/
│   ├── Auth.css           # Styling för Login/Register
│   ├── Chat.css           # Styling för chatkomponenter
│   ├── Global.css         # Styling för globala variabler
│   └── SideNav.css        # Styling för navigering
│
├── utils/
│   └── jwt.js             # decodeToken(), isTokenExpired()
│
├── App.jsx                # Routing + ProtectedRoute-logik
└── main.jsx               # Entrypoint, mountar App

