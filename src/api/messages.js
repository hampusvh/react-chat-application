export async function getMessages(token) {
  const res = await fetch("https://chatify-api.up.railway.app/messages", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error(`Error fetching messages: ${res.status}`);
  }

  return res.json();
}
