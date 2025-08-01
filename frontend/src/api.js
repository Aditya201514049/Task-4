const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function getUsers(token) {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function blockUsers(ids, token) {
  const res = await fetch(`${API_URL}/users/block`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ids }),
  });
  return res.json();
}

export async function unblockUsers(ids, token) {
  const res = await fetch(`${API_URL}/users/unblock`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ids }),
  });
  return res.json();
}

export async function deleteUsers(ids, token) {
  const res = await fetch(`${API_URL}/users/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ids }),
  });
  return res.json();
}