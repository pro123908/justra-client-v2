import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), viteTsconfigPaths(), tailwindcss()],
  build: {
    target: "ES2022",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
