import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // SAFE manualChunks: only split pure-JS libs that have NO React context deps.
        // Splitting React, Radix, Framer, or react-query into separate chunks
        // causes duplicate React instances → createContext crash in production.
        manualChunks: {
          // GSAP + Lenis are pure JS animation libs — completely React-free.
          // Splitting them saves ~125 KB from the main entry chunk.
          "animation": ["gsap", "@studio-freight/lenis"],
          // matter-js is a pure JS physics engine (used by FallingPillsArea).
          "physics": ["matter-js"],
        },
      },
    },
  },
}));
