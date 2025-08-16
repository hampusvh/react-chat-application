<h1 align="center">Chats-App</h1>

<p align="center">
  A simple but functional chat application built with React and Vite.
</p>

---

##  Funktionalitet

###  Autentisering

- **Registrering** sker via `POST /auth/register`
- **Inloggning** sker via `POST /auth/token`  

- Vid lyckad inloggning returneras en **JWT-token** som innehåller:
  - användar-ID
  - användarnamn
  - avatar-URL  
- JWT-token sparas i `localStorage` och används för att kontrollera åtkomst till skyddade sidor
- En **CSRF-token** hämtas via `PATCH /csrf` och används endast vid registrering och inloggning

### Chat
- Hämtar meddelanden via `GET /messages`
- Skapar nya meddelanden via `POST /messages`
- Raderar egna meddelanden via `DELETE /messages/{id}`
- Visar:
  - Egna meddelanden till höger
  - Andras meddelanden till vänster
- Meddelanden saneras innan de skickas för att förhindra XSS

### Profilhantering
- Användaren kan:
  - Se och uppdatera sin användardata (`PUT /user`)
  - Radera sitt konto (`DELETE /users/{id}`)
- Avatar-URL visas i realtid som förhandsvisning
- Vid radering rensas `localStorage` och användaren skickas till `/register`

### Navigering
- `SideNav` visar:
  - Avatar
  - Användarnamn
  - Länkar till Profil och Logout
- `ProtectedRoute` används för att hindra åtkomst till `/chat` och `/profile` utan JWT

### Säkerhet

- CSRF-token krävs endast vid registrering och inloggning. Efter det används JWT i Authorization-headern för skyddade anrop
- Inkluderar **Content Security Policy (CSP)** i `index.html`, som endast tillåter bilder från:
  - `https://i.pravatar.cc`
  - `https://freeimage.host`
- JWT-token verifieras och kontrolleras för utgångsdatum

### Extra funktioner (VG-nivå)
- Loggning av fel med hjälp av [Sentry](https://sentry.io) via `config/sentry.js`
- Stöd för konversationer via `conversationId` (frivillig för VG)
- Deployment på Netlify med fungerande CORS-konfiguration från API:t

---

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
│   ├── api.js             # Innehåller API_URL som hanterar API-anrop
│   └── sentry.js          # Sentry-initiering för felrapportering
│
├── pages/
│   ├── Chat.jsx           # Chattgränssnitt med meddelandehantering
│   ├── Login.jsx          # Inloggningsformulär
│   ├── Profile.jsx        # (VG) Redigera och radera användare
│   └── Register.jsx       # Registreringsformulär
│
├── styles/
│   ├── Auth.css           # Gemensam CSS för Login/Register
│   ├── Chat.css           # Styling för chatkomponenter
│   ├── Global.css         # Reset och globala variabler
│   └── SideNav.css        # Styling för navigering
│
├── utils/
│   └── jwt.js             # decodeToken(), isTokenExpired()
│
├── App.jsx                # Routing + ProtectedRoute-logik
└── main.jsx               # Entrypoint, mountar App
