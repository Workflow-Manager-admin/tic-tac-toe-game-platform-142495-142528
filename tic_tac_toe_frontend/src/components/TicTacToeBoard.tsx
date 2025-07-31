import { component$, useSignal, PropFunction } from "@builder.io/qwik";

/**
 * A single Tic Tac Toe board, minimal style.
 * @param {string[][]} props.board - 2D array of "X", "O", or "".
 * @param {(row: number, col: number) => void} props.onCellClick$ - callback when user clicks cell (Qwik PropFunction).
 * @param {boolean} props.myTurn - is it this player's turn.
 * @param {string} props.winner - "X", "O", "Draw", or "".
 * @param {boolean} props.disabled - disables all interaction.
 * @param {string[]} props.symbols - [my symbol, opp symbol]
 */
// PUBLIC_INTERFACE
export const TicTacToeBoard = component$((props: {
  board: string[][];
  onCellClick$: PropFunction<(row: number, col: number) => void>;
  myTurn: boolean;
  winner: string;
  disabled: boolean;
  symbols: string[];
}) => {
  const hoverCell = useSignal<[number, number] | null>(null);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 70px)",
      gridTemplateRows: "repeat(3, 70px)",
      gap: "7px",
      background: "var(--surface-color)",
      borderRadius: "18px",
      boxShadow: "var(--panel-shadow)",
      margin: "0 auto"
    }}>
      {props.board.map((row, r) =>
        row.map((cell, c) => {
          const isHover = hoverCell.value?.[0] === r && hoverCell.value?.[1] === c;
          const playable = !cell && props.myTurn && !props.disabled && !props.winner;
          return (
            <button
              key={r + "-" + c}
              style={{
                width: "70px",
                height: "70px",
                fontSize: "2.1rem",
                fontWeight: 600,
                background: isHover && playable ? "var(--primary-color)" : "var(--surface-color)",
                color: cell === props.symbols[0]
                  ? "var(--primary-color)"
                  : cell === props.symbols[1]
                  ? "var(--accent-color)"
                  : "#aaa",
                border: "2px solid #222",
                borderRadius: "9px",
                transition: "background 0.14s, color 0.14s",
                outline: playable && isHover ? "2px solid var(--accent-color)" : "none",
                cursor: playable ? "pointer" : "default",
                userSelect: "none",
                boxShadow: "0 1px 3px #0002"
              }}
              onClick$={async () => { if (playable) await props.onCellClick$(r, c); }}
              disabled={!playable}
              onMouseEnter$={() => hoverCell.value = [r, c]}
              onMouseLeave$={() => hoverCell.value = null}
              aria-label={`cell${r},${c}`}
            >
              {cell}
            </button>
          );
        })
      )}
    </div>
  );
});
