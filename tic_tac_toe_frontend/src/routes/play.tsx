import { component$, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { startGame, makeMove, getCurrentUser } from "../utils/api";
import { TicTacToeBoard } from "../components/TicTacToeBoard";
import { useNavigate } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const nav = useNavigate();
  const state = useStore({
    gameId: null as string | null,
    board: [["", "", ""], ["", "", ""], ["", "", ""]],
    mySymbol: "X",
    oppSymbol: "O",
    myTurn: true,
    winner: "",
    error: "",
    info: "",
    locked: false,
    opponentType: "computer",
    playing: false,
    loading: false,
    inited: false,
    user: null as null | { username: string },
  });

  // Get user at mount and redirect if not logged in
  useVisibleTask$(async () => {
    const res = await getCurrentUser();
    if (!res?.username) {
      nav("/login");
      return;
    }
    state.user = res;
    state.inited = true;
  });

  // Start a new game
  const startNewGame = $(async () => {
    state.loading = true;
    state.error = "";
    const g = await startGame(state.opponentType as "human" | "computer");
    state.loading = false;
    if (g?.id) {
      state.gameId = g.id;
      state.board = g.board || [["", "", ""], ["", "", ""], ["", "", ""]];
      state.mySymbol = g.my_symbol || "X";
      state.oppSymbol = g.opp_symbol || "O";
      state.myTurn = g.my_turn;
      state.winner = g.winner || "";
      state.playing = true;
      state.locked = false;
      state.info = "";
    } else {
      state.error = g?.error || "Failed to start game.";
    }
  });

  // User move
  const handleCellClick = $(async (row: number, col: number) => {
    if (!state.gameId || state.locked || !state.myTurn || state.board[row][col]) return;
    state.locked = true;
    const res = await makeMove(state.gameId, row, col);
    if (res?.board) {
      state.board = res.board;
      state.winner = res.winner || "";
      state.myTurn = res.my_turn;
      state.locked = false;
      if (state.winner) {
        state.info = "Game Over";
      }
    } else {
      state.error = res?.error || "Move failed.";
      state.locked = false;
    }
  });

  return (
    <section class="flex-center" style={{ minHeight: "60vh" }}>
      <div class="card" style={{ minWidth: "260px", alignItems: "center" }}>
        <h2 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>
          {state.playing ? "Tic Tac Toe" : "Start a Game"}
        </h2>
        {!state.playing && (
          <div style={{ marginBottom: "1.5rem" }}>
            <label>
              <span style={{ marginRight: "1em" }}>Opponent:</span>
              <select
                value={state.opponentType}
                onChange$={e =>
                  (state.opponentType = (e.target as HTMLSelectElement).value)
                }
              >
                <option value="computer">Computer</option>
                <option value="human">Another Player</option>
              </select>
            </label>
          </div>
        )}
        {state.error && (
          <div style={{ color: "var(--accent-color)", marginBottom: "0.8rem" }}>{state.error}</div>
        )}
        {!state.playing ? (
          <button
            onClick$={startNewGame}
            disabled={state.loading}
            style={{ width: "100%", fontWeight: 600, fontSize: "1.12em" }}
          >
            {state.loading ? "Starting..." : "Start Game"}
          </button>
        ) : (
          <div class="flex-center" style={{ flexDirection: "column" }}>
            <div style={{ marginBottom: "0.7rem" }}>
              <span style={{ color: "var(--secondary-color)" }}>{state.user?.username}</span>
              {" (" + state.mySymbol + ") "}
              vs {state.opponentType === "computer" ? "Computer" : state.oppSymbol}
            </div>
            <TicTacToeBoard
              board={state.board}
              onCellClick$={handleCellClick}
              myTurn={state.myTurn}
              winner={state.winner}
              disabled={state.locked}
              symbols={[state.mySymbol, state.oppSymbol]}
            />
            <div style={{
              marginTop: "1rem",
              color: state.winner
                ? state.winner === state.mySymbol
                  ? "var(--secondary-color)"
                  : state.winner === "Draw"
                  ? "#aaa"
                  : "var(--accent-color)"
                : "var(--text-color)",
              fontSize: "1.2rem"
            }}>
              {state.winner ? 
                (state.winner === "Draw" ? "Draw!" : (state.winner === state.mySymbol ? "You Win!" : "You Lose!"))
                : (state.myTurn ? "Your Turn" : "Opponent Turn")
              }
            </div>
            {state.winner && (
              <button
                class="secondary"
                style={{ fontSize: "1rem", marginTop: "1em" }}
                onClick$={() => {state.playing = false; state.winner = ""; state.error = "";}}
              >
                Play Again
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
});
