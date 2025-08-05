# 📘 FÖRKLARING – Min Chatify-app

Detta dokument är till för mig själv. Jag vill förstå vad min app gör, varför varje del finns, och hur jag kan ändra saker utan att förstöra allt.

---

## 🧱 STRUKTUR

Min app är uppdelad i:

- `pages/` – Sidor som användaren navigerar till (Login, Register, Chat, Profile)
- `components/` – Återanvändbara delar, t.ex. `SideNav`
- `styles/` – All CSS i separata filer, ingen inline styling
- `utils/` – API-anrop, tokenhantering, meddelandesanering

---

## 🔐 Login (`Login.jsx`)

Syfte: Låter användaren logga in med användarnamn + lösenord.

### Vad som händer:
1. En CSRF-token hämtas automatiskt från servern (för säkerhet).
2. Ett `fetch`-anrop skickas med användarnamn + lösenord till API:et.
3. Om det lyckas får vi en JWT-token tillbaka, som innehåller:
   - användarens ID
   - användarnamn
   - avatar
4. Allt detta sparas i `localStorage` så att användaren kan förbli inloggad.
5. Användaren skickas till `/chat`.

---

## 🧾 Register (`Register.jsx`)

Syfte: Skapa ett nytt konto med namn, e-post, lösenord och avatar-URL.

### Vad som händer:
- CSRF-token hämtas
- API-anrop görs till `/auth/register`
- Fel visas tydligt (t.ex. e-post redan i bruk)
- Vid lyckad registrering skickas användaren till `/login`

---

## 💬 Chat (`Chat.jsx`)

Syfte: Visa alla meddelanden, skriva nya, radera egna.

### Vad som händer:
- Alla meddelanden hämtas från API:et (`GET /messages`)
- Nya meddelanden skickas (`POST /messages`) efter att de sanerats (för att undvika XSS)
- Egna meddelanden har en "radera"-ikon (papperskorg)
- Radering sker med `DELETE /messages/{id}`
- Eget meddelande = blå bubblor till höger
- Andras meddelanden = grå bubblor till vänster

---

## 🧍‍♂️ Profil (`Profile.jsx`)

Syfte: Låta användaren uppdatera eller radera sin användardata

### Vad som händer:
- Användardata hämtas med `GET /users/me`
- Uppdatering sker med `PATCH /users/me`
- Radering sker med `DELETE /users/me`
- Vid uppdatering: localStorage uppdateras också
- Vid radering: localStorage rensas och användaren skickas till `/register`

---

## 📚 SideNav (`SideNav.jsx`)

Visas på alla sidor där användaren är inloggad.

### Innehåller:
- Avatar + användarnamn
- En knapp till `Profile`
- En Logout-knapp som rensar localStorage och skickar användaren till `/login`

---

## 💡 Vad betyder...

### CSRF-token?
Skyddar mot att andra webbsidor kan skicka falska formulär i mitt namn. Måste hämtas innan man skickar `POST`, `PATCH`, `DELETE`.

### JWT?
En token (dvs digitalt ID-kort) som innehåller info om användaren. Sparas lokalt så användaren slipper logga in varje gång.

### Sanitize?
Rensar `<script>` eller annan HTML ur meddelandetext, så ingen kan köra skadlig kod i chatten.

---

## ✅ Saker jag kan testa själv

- Ändra färger i `Chat.css` och se hur layouten förändras
- Logga ut och logga in igen för att se hur JWT sparas
- Ta bort en rad i `api.js` och se vilket fel som dyker upp
- Lägg till `console.log()` i `Chat.jsx` för att se när data laddas

---

