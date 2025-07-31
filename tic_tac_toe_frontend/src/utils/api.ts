const API_BASE = "http://localhost:8000"; // TODO: Use env/config or relative path if proxied

// PUBLIC_INTERFACE
export async function registerUser(username: string, password: string) {
  /* Endpoint: /register POST { username, password } */
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

// PUBLIC_INTERFACE
export async function loginUser(username: string, password: string) {
  /* Endpoint: /login POST { username, password } */
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchLeaderboard() {
  /* Endpoint: /leaderboard GET */
  const res = await fetch(`${API_BASE}/leaderboard`, { credentials: "include" });
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchGameHistory() {
  /* Endpoint: /history GET */
  const res = await fetch(`${API_BASE}/history`, { credentials: "include" });
  return res.json();
}

// PUBLIC_INTERFACE
export async function startGame(opponent: "human" | "computer") {
  /* Endpoint: /game/new POST { opponent } */
  const res = await fetch(`${API_BASE}/game/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ opponent }),
  });
  return res.json();
}

// PUBLIC_INTERFACE
export async function makeMove(gameId: string, row: number, col: number) {
  /* Endpoint: /game/{gameId}/move POST { row, col } */
  const res = await fetch(`${API_BASE}/game/${gameId}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ row, col }),
  });
  return res.json();
}

// PUBLIC_INTERFACE
export async function getCurrentUser() {
  /* Endpoint: /me GET */
  const res = await fetch(`${API_BASE}/me`, { credentials: "include" });
  return res.json();
}

// PUBLIC_INTERFACE
export async function logoutUser() {
  /* Endpoint: /logout POST */
  const res = await fetch(`${API_BASE}/logout`, { method: "POST", credentials: "include" });
  return res.json();
}
