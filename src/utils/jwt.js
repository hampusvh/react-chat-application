export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];

    const decoded = atob(payload);

    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function isExpired(token) {
  const decoded = decodeToken(token);

  if (!decoded || !decoded.exp) return true;

  const now = Math.floor(Date.now() / 1000);

  return decoded.exp < now;
}
