import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  return (
    <div class="flex-center" style={{ minHeight: "75vh" }}>
      <section class="card flex-center" style={{ flexDirection: "column", alignItems: "center" }}>
        <h1 class="main-title" style={{ color: "var(--primary-color)" }}>
          Welcome to Tic Tac Toe!
        </h1>
        <p style={{ marginTop: "1rem", color: "var(--text-color)", fontSize: "1.1em" }}>
          Fully featured, modern platform for playing the classic game. <br/>
          <span style={{ color: "var(--accent-color)" }}>Register</span>, challenge others or the AI, track your records, and climb the leaderboard.
        </p>
        <div class="flex-row gap" style={{ marginTop: "2rem" }}>
          <Link href="/play">
            <button class="accent" style={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Play Now
            </button>
          </Link>
          <Link href="/leaderboard">
            <button class="secondary" style={{ fontWeight: 500 }}>Leaderboard</button>
          </Link>
        </div>
      </section>
    </div>
  );
});


export const head: DocumentHead = {
  title: "Tic Tac Toe | Home",
  meta: [
    {
      name: "description",
      content: "Play classic Tic Tac Toe online, challenge friends or AI, view history, and leaderboard. Minimal, dark-theme, modern design.",
    },
  ],
};
