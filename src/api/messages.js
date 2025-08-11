import { API_URL } from "../config/api";

export async function getMessages(token) {
  const res = await fetch(`${API_URL}/messages`, {
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

export async function sendMessage({ token, text, conversationId = null, csrfToken }) {
    const res = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text,
            conversationId,
            csrfToken
        })
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Error sending message");
    }

    return res.json();
}

export async function deleteMessage({ token, id, csrfToken }) {
    const res = await fetch(`${API_URL}/messages/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ csrfToken })
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Error deleting message");
    }

    return res.json();
}