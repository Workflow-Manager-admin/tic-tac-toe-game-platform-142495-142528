import { component$, useStore, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { registerUser } from "../utils/api";

// PUBLIC_INTERFACE
export default component$(() => {
  const nav = useNavigate();
  const state = useStore({
    username: "",
    password: "",
    error: "",
    loading: false,
    success: false,
  });

  const performRegister = $(async (e: Event) => {
    e.preventDefault();
    state.loading = true;
    state.error = "";
    state.success = false;
    const res = await registerUser(state.username, state.password);
    if (res && res.username) {
      state.success = true;
      setTimeout(() => nav("/login"), 1200);
    } else {
      state.error = res?.error ?? "Registration failed";
    }
    state.loading = false;
  });

  return (
    <section class="flex-center">
      <form class="card" style={{ minWidth: "270px", maxWidth: "340px", width: "100%" }} onSubmit$={performRegister}>
        <h2 style={{ color: "var(--primary-color)" }}>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onInput$={e => state.username = (e.target as HTMLInputElement).value}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onInput$={e => state.password = (e.target as HTMLInputElement).value}
          required
        />
        {state.error && <div style={{ color: "var(--accent-color)", marginBottom: "0.5rem" }}>{state.error}</div>}
        {state.success && <div style={{ color: "var(--secondary-color)", marginBottom: "0.5rem" }}>Registration successful! Redirecting…</div>}
        <button type="submit" style={{ width: "100%" }} disabled={state.loading}>
          {state.loading ? "Registering..." : "Register"}
        </button>
        <div style={{ marginTop: "0.7rem", textAlign: "center" }}>
          <a href="/login" style={{ color: "var(--primary-color)" }}>Already have an account?</a>
        </div>
      </form>
    </section>
  );
});
