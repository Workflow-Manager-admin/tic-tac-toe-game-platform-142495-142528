import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";
import { Navbar } from "../components/Navbar";

// PUBLIC_INTERFACE
export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);
  return (
    <div>
      <Navbar />
      <main style={{
        minHeight: "80vh",
        maxWidth: "900px",
        margin: "0 auto 2rem auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Slot />
      </main>
    </div>
  );
});
