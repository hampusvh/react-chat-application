Setup-plan för Chatify-projekt

Detta är en komplett och kronologisk plan för att bygga hela applikationen enligt uppgiftsbeskrivningen och API-dokumentationen.

✅ Steg 1 – Grundläggande setup

Initiera nytt Vite-projekt:

Skapa ny struktur:

src/
├── api/
├── components/
├── config/
├── pages/
├── styles/
├── utils/
├── App.jsx
└── main.jsx

Skapa tomma filer för att verifiera routing

🔐 Steg 3 – Routing + ProtectedRoute

Installera React Router:

npm install react-router-dom

Lägg till BrowserRouter i main.jsx

Skapa ProtectedRoute.jsx i components/

Kontrollera JWT i localStorage

Lägg in routes i App.jsx:

/login

/register

/chat (skyddad)

/profile (skyddad)

📄 Steg 4 – Sidor

Skapa React-komponenter i pages/:

Login.jsx

Register.jsx

Chat.jsx

Profile.jsx

🔐 Steg 5 – Autentisering

Skapa api/auth.js:

getCsrfToken()

loginUser()

registerUser()

Register.jsx:

Form

POST till /auth/register

Redirect till /login

Login.jsx:

POST till /auth/token

Spara JWT och userinfo

Redirect till /chat

Skapa utils/jwt.js:

decodeToken()

isTokenExpired()

💬 Steg 6 – Chatfunktion

Skapa api/messages.js:

getMessages()

postMessage()

deleteMessage()

Chat.jsx:

Hämta och visa meddelanden

Input för nytt meddelande

Sanera innan POST

Visa papperskorg för egna meddelanden

Använd MessageList.jsx, MessageInput.jsx

🧍 Steg 7 – Profilfunktion

Skapa api/user.js:

getUser()

updateUser()

deleteUser()

Profile.jsx:

Visa och uppdatera info

Live-preview för avatar

Bekräfta och radera konto

🧭 Steg 8 – Navigering

Skapa SideNav.jsx:

Avatar, namn, länkar

Logout rensar localStorage

Använd SideNav i skyddade sidor

🎨 Steg 9 – CSS

Skapa styles/:

Global.css

Auth.css

Chat.css

SideNav.css

Använd klassnamn i komponenter – ingen inline styling

🔐 Steg 10 – Säkerhet

CSRF-token krävs för skrivande operationer

Lägg till CSP i index.html:

<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  img-src 'self' https://i.pravatar.cc https://freeimage.host;
">

🚀 Steg 11 – Deploy

Deploya till Netlify

Lägg till API-URL som miljövariabel vid behov

Testa att allt fungerar live

🌟 Steg 12 – VG (Extra)

Skapa config/sentry.js

Lägg till loggning i catch-block

Implementera conversationId-stöd (frivilligt)

Klar! 🎉 Du har nu en komplett plan från tomt projekt till färdig funktionell app.

