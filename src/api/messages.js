import { API_URL } from "../config/api";

export async function getMessages(token, conversationId) {
    const url = conversationId
        ? `${API_URL}/messages?conversationId=${encodeURIComponent(conversationId)}`
        : `${API_URL}/messages`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        let data = {};
        try { data = await res.json(); } catch { }
        throw new Error(data.error || data.message || `Error fetching messages: ${res.status}`);
    }

    return await res.json();
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
        let data = {};
        try { data = await res.json(); } catch { }
        throw new Error(data.error || data.message || "Error sending message");
    }

    return await res.json();
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
        let data = {};
        try { data = await res.json(); } catch { }
        throw new Error(data.error || data.message || "Error deleting message");
    }

    return await res.json();
}
