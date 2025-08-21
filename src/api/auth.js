import { API_URL } from "../config/api";

export async function getCsrfToken() {
  const response = await fetch(`${API_URL}/csrf`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not fetch CSRF-token");
  }

  const data = await response.json();
  return data.csrfToken;
}

export async function registerUser({ username, email, password, avatar }) {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      avatar,
      csrfToken,
    }),
  });

  if (!response.ok) {
    let data = {};
    try {
      data = await response.json();
    } catch { }
    throw new Error(data.error || data.message || "Registration failed");
  }

  return await response.json();
}

export async function loginUser({ username, password }) {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      csrfToken,
    }),
  });

  if (!response.ok) {
    let data = {};
    try {
      data = await response.json();
    } catch { }
    throw new Error(data.error || data.message || "Login failed");
  }

  return await response.json();
}
