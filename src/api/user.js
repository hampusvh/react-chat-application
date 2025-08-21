import { API_URL } from "../config/api";

export async function updateUser({ token, userId, updatedData, csrfToken }) {
    const res = await fetch(`${API_URL}/user`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, updatedData, csrfToken }),
    });

    let data = {};
    try { data = await res.json(); } catch { }
    if (!res.ok) throw new Error(data.error || data.message || "Update failed");
    return data;
}

export async function deleteUser({ token, userId, csrfToken }) {
    const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ csrfToken }),
    });

    let data = {};
    try { data = await res.json(); } catch { }
    if (!res.ok) throw new Error(data.error || data.message || "Delete failed");
    return data;
}
