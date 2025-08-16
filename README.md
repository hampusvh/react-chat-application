<h1 align="center">React Chat App</h1>

<p align="center">
  A web-based chat application built with React and Vite, powered by the Chatify API.
</p>

### 1. Projektstart
- Initierade projektet med `npm create vite@latest`.
- Satte upp **grundstruktur** med React Router och en enkel layout.

### 2. Autentisering
- Implementerade **registrering** med CSRF-skydd och validering av unika användarnamn.
- Laddade in **inloggning** med JWT-token som sparas i `localStorage`.
- Skapade **ProtectedRoute** för att skydda chatt- och profilsidor.
- Lät appen visa användarens **namn och avatar** efter inloggning.

### 3. Chatfunktionalitet
- Kopplade upp mot `/messages` för att hämta och visa meddelanden.
- Delade upp UI så att **egna meddelanden hamnar till höger**, andras till vänster.
- Lade till **skapa nya meddelanden**, med sanitering av innehållet innan det skickas.
- Införde möjlighet att **radera egna meddelanden**.

### 4. Navigation och logout
- Byggde en **SideNav** med avatar, användarnamn och logout-knapp.
- Logout rensar token och skickar tillbaka användaren till login.

### 5. Profilsida
- Lade till en **Profile-sida** där användaren kan uppdatera användarnamn, e-post och avatar.
- Införde **avatar-preview** när en ny bild-URL anges.
- Implementerade **radera konto** → med varning, feedback och automatisk utloggning.

### 6. Flera konversationer
- Utökade chatten till att hantera **flera konversationer** via `conversationId`.
- Satte upp stöd för minst två separata konversationer.

### 7. Säkerhet
- Införde **CSP (Content-Security-Policy)** via Netlify `_headers` för att begränsa bildkällor till betrodda domäner.
- Säkerställde att JWT-token kontrolleras mot expiration.
- Implementerade enkel sanitering av chattmeddelanden för att undvika skadlig HTML.

### 8. Loggning och monitorering
- Integrerade **Sentry** för loggning och felövervakning.
- Kan följa fel och händelser i applikationen i realtid.

### 9. Deployment
- Hostade projektet på **Netlify** med automatiska builds.
- Verifierade att CORS fungerar korrekt mot Chatify API.

---

## Teknisk översikt
- **Frontend:** React + Vite
- **Routing:** React Router
- **State & Auth:** localStorage + JWT decode
- **API-kommunikation:** Fetch + CSRF-hantering
- **Säkerhet:** CSP, sanitering av inputs, JWT-expiration
- **Loggning:** Sentry
- **Hosting:** Netlify

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
