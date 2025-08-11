# Chatify – Komplett Checklista

---

## 1. Projektsetup
- [ ] Initiera Vite + React-projekt.
- [ ] Rensa bort boilerplate.
- [ ] Skapa mappstruktur:
- [ ] Installera beroenden:
- React Router DOM
- Ev. axios
- Ev. Sentry/Rollbar/New Relic

---

## 2. Routing & struktur
- [ ] `main.jsx` → `BrowserRouter`.
- [ ] `App.jsx` med rutter:
- [ ] `/login`
- [ ] `/register`
- [ ] `/chat` (skyddad)
- [ ] `/profile` (skyddad, VG)
- [ ] `ProtectedRoute.jsx` som kollar JWT-expiry.

---

## 3. Autentisering (G)
- [ ] `src/api/auth.js`:
- [ ] `getCsrfToken()` – PATCH `/csrf`
- [ ] `registerUser()` – POST `/auth/register`
- [ ] `loginUser()` – POST `/auth/token`
- [ ] `src/utils/jwt.js`:
- [ ] `decodeToken()`
- [ ] `isExpired()`
- [ ] `Register.jsx`:
- [ ] Form → CSRF → register → redirect `/login`
- [ ] Visa serverfel (t.ex. “Username or email already exists”)
- [ ] `Login.jsx`:
- [ ] Form → CSRF → login
- [ ] Spara `token`, `userId`, `username`, `avatar` i localStorage
- [ ] Redirect `/chat`
- [ ] Visa fel “Invalid credentials”

---

## 4. Baslayout och navigation
- [ ] `Variables.css` för färger/teman.
- [ ] `Global.css` för reset och grundlayout.
- [ ] `SideNav`:
- [ ] Visa `avatar` och `username`
- [ ] Logout-knapp → rensar storage → redirect `/login`

---

## 5. Chatfunktionalitet (G)
- [ ] `src/api/messages.js`:
- [ ] `getMessages(conversationId)`
- [ ] `sendMessage(conversationId, text)`
- [ ] `deleteMessage(messageId)`
- [ ] `MessageList.jsx`:
- [ ] Visa meddelanden (mina höger, andras vänster)
- [ ] `MessageInput.jsx`:
- [ ] Inputfält + skicka-knapp
- [ ] `Chat.jsx`:
- [ ] Hämta meddelanden vid load
- [ ] Koppla MessageList och MessageInput
- [ ] Radera **egna** meddelanden
- [ ] Sanitering av text (ingen HTML-rendering)

---

## 6. Profilhantering (VG)
- [ ] `src/api/user.js`:
- [ ] `getUser(userId)`
- [ ] `updateUser(data)`
- [ ] `deleteUser(userId)`
- [ ] `Profile.jsx`:
- [ ] Form för att uppdatera `username`, `email`, `avatar`
- [ ] Live-preview av avatar-URL
- [ ] Radera användare → auto-logout

---

## 7. Flera konversationer (VG)
- [ ] `src/api/conversations.js`:
- [ ] `getConversations()`
- [ ] `inviteUser(userId)`
- [ ] UI:
- [ ] Lista konversationer i SideNav
- [ ] Byt `conversationId` vid klick
- [ ] Ladda meddelanden för vald konversation

---

## 8. Loggning/monitorering (VG)
- [ ] Välj tjänst (Sentry, Rollbar eller New Relic)
- [ ] Init i `src/config/sentry.js`
- [ ] Logga:
- [ ] API-fel (status, endpoint)
- [ ] Auth-händelser (login, logout, token-expired)
- [ ] Verifiera loggar (skärmdumpar/länk)

---

## 9. Säkerhet
- [ ] CSP-meta i `index.html`:
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self' https://i.pravatar.cc https://freeimage.host">
