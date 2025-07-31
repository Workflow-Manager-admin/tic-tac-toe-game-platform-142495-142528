import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { fetchGameHistory } from "../utils/api";

// PUBLIC_INTERFACE
export default component$(() => {
  const state = useStore<{
    games: any[];
    loading: boolean;
    error: string;
  }>({
    games: [],
    loading: true,
    error: "",
  });

  useVisibleTask$(async () => {
    try {
      const data = await fetchGameHistory();
      state.games = Array.isArray(data) ? data : [];
      state.error = "";
    } catch {
      state.error = "Failed to load history";
    } finally {
      state.loading = false;
    }
  });

  return (
    <section class="card">
      <h2 style={{ color: "var(--accent-color)" }}>Game History</h2>
      {state.loading && <div>Loading...</div>}
      {state.error && <div style={{ color: "var(--accent-color)" }}>{state.error}</div>}
      {!state.loading && state.games.length > 0 && (
        <table style={{ width: "100%", marginTop: "1rem", color: "#fff", borderSpacing: "0.6em 0.3em" }}>
          <thead>
            <tr style={{ color: "var(--primary-color)" }}>
              <th>Date</th>
              <th>Opponent</th>
              <th>Type</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {state.games.map((g: any) => (
              <tr key={g.id}>
                <td>{g.finished_at?.slice(0, 19).replace("T", " ")}</td>
                <td>{g.opponent || (g.opponent_is_ai ? "Computer" : "-")}</td>
                <td>{g.opponent_is_ai ? "vs Computer" : "vs Human"}</td>
                <td style={{
                  color:
                    g.result === "win"
                      ? "var(--secondary-color)"
                      : g.result === "lose"
                      ? "var(--accent-color)"
                      : "#aaa",
                }}>
                  {g.result ? g.result.charAt(0).toUpperCase() + g.result.slice(1) : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!state.loading && state.games.length === 0 && <div>No game history yet.</div>}
    </section>
  );
});
