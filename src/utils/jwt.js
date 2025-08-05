// 🧠 decodeToken: Tar en JWT och returnerar dess payload (d.v.s. innehåll) som ett objekt
export function decodeToken(token) {
  try {
    // JWT består av 3 delar: header.payload.signature – vi vill åt mitten (payload)
    const payload = token.split(".")[1];

    // atob = "ASCII to binary", alltså base64-dekoda payloaden
    const decoded = atob(payload);

    // Returnera JSON-parsade datan som ett objekt
    return JSON.parse(decoded);
  } catch {
    // Om något går fel (felaktig token etc.) – returnera null
    return null;
  }
}

// 🧠 isExpired: Kollar om tokenen har gått ut
export function isExpired(token) {
  const decoded = decodeToken(token);

  // Om ingen token eller ingen exp-tid finns, anta att den är ogiltig
  if (!decoded || !decoded.exp) return true;

  // Få nuvarande tid i sekunder (UTC)
  const now = Math.floor(Date.now() / 1000);

  // Returnera true om nuvarande tid är efter expiration-tid
  return decoded.exp < now;
}
