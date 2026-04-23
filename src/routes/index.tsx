import { createFileRoute } from "@tanstack/react-router";
import GitEscrow from "@/components/GitEscrow";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Git Escrow — Verification Console" },
      {
        name: "description",
        content:
          "Git Escrow Verification Console — submit specification archive and deliverables for multi-model AI consensus scoring.",
      },
    ],
  }),
});

function Index() {
  return <GitEscrow />;
}
