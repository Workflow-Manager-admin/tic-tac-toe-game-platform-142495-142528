import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { fetchLeaderboard } from "../utils/api";

// PUBLIC_INTERFACE
export default component$(() => {
  const state = useStore<{
    rows: any[];
    loading: boolean;
    error: string;
  }>({
    rows: [],
    loading: true,
    error: "",
  });

  useVisibleTask$(async () => {
    try {
      const data = await fetchLeaderboard();
      state.rows = Array.isArray(data) ? data : [];
      state.error = "";
    } catch {
      state.error = "Failed to load leaderboard";
    } finally {
      state.loading = false;
    }
  });

  return (
    <section class="card">
      <h2 style={{ color: "var(--secondary-color)" }}>Leaderboard</h2>
      {state.loading && <div>Loading...</div>}
      {state.error && <div style={{ color: "var(--accent-color)" }}>{state.error}</div>}
      {!state.loading && state.rows.length > 0 && (
        <table style={{ width: "100%", marginTop: "1rem", color: "#fff", borderSpacing: "0.7em 0.3em" }}>
          <thead>
            <tr style={{ color: "var(--accent-color)" }}>
              <th>Rank</th>
              <th>User</th>
              <th>Wins</th>
              <th>Games</th>
            </tr>
          </thead>
          <tbody>
            {state.rows.map((row: any, idx) => (
              <tr key={row.username}>
                <td>{idx + 1}</td>
                <td>{row.username}</td>
                <td>{row.wins || 0}</td>
                <td>{row.games_played || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!state.loading && state.rows.length === 0 && <div>No leaderboard data.</div>}
    </section>
  );
});
