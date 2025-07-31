import { component$, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { getCurrentUser, logoutUser } from "../utils/api";

export const Navbar = component$(() => {
  const nav = useNavigate();
  const state = useStore({ user: null as null | { username: string } });

  useVisibleTask$(async () => {
    const res = await getCurrentUser();
    if (res?.username) state.user = res;
    else state.user = null;
  });

  const handleLogout = $(async () => {
    await logoutUser();
    state.user = null;
    nav("/");
  });

  return (
    <nav
      style={{
        background: "var(--surface-color)",
        boxShadow: "var(--panel-shadow)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 2rem",
        borderRadius: "0 0 var(--border-radius) var(--border-radius)",
        marginBottom: "1.5rem",
        fontWeight: 500
      }}
    >
      <div>
        <Link href="/" style={{ color: "var(--accent-color)", fontSize: "1.4rem", fontWeight: 600 }}>
          ⭕ Tic Tac Toe
        </Link>
      </div>
      <div class="flex-row gap">
        <Link href="/play">Play</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/history">History</Link>
        {!state.user && <Link href="/login" style={{ marginLeft: "1rem" }}>Sign In</Link>}
        {state.user && (
          <>
            <span style={{ fontSize: "1rem", marginLeft: "1.2rem" }}>
              {state.user.username}
            </span>
            <button
              onClick$={handleLogout}
              style={{
                background: "var(--accent-color)",
                marginLeft: "1rem",
                padding: "0.4em 0.9em",
                fontWeight: 500,
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
});
