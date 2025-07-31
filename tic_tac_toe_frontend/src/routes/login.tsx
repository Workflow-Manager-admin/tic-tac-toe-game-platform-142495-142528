import { component$, useStore, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { loginUser } from "../utils/api";

// PUBLIC_INTERFACE
export default component$(() => {
  const nav = useNavigate();
  const state = useStore({
    username: "",
    password: "",
    error: "",
    loading: false,
  });

  const performLogin = $(async (e: Event) => {
    e.preventDefault();
    state.loading = true;
    state.error = "";
    const res = await loginUser(state.username, state.password);
    if (res && res.username) {
      nav("/play");
    } else {
      state.error = res?.error ?? "Login failed";
    }
    state.loading = false;
  });

  return (
    <section class="flex-center">
      <form class="card" style={{ minWidth: "270px", maxWidth: "340px", width: "100%" }} onSubmit$={performLogin}>
        <h2 style={{ color: "var(--primary-color)" }}>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onInput$={e => state.username = (e.target as HTMLInputElement).value}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onInput$={e => state.password = (e.target as HTMLInputElement).value}
          required
        />
        {state.error && <div style={{ color: "var(--accent-color)", marginBottom: "0.5rem" }}>{state.error}</div>}
        <button type="submit" style={{ width: "100%" }} disabled={state.loading}>
          {state.loading ? "Signing in..." : "Sign In"}
        </button>
        <div style={{ marginTop: "0.7rem", textAlign: "center" }}>
          <a href="/register" style={{ color: "var(--secondary-color)" }}>Don't have an account?</a>
        </div>
      </form>
    </section>
  );
});
