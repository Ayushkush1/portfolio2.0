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
    // Target modern browsers to reduce polyfill overhead
    target: "es2020",
    // Raise chunk warning limit slightly (our split chunks will be lean)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor dependencies into named, cacheable chunks
        manualChunks: (id) => {
          // Core React runtime – always tiny, cached forever
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react-vendor";
          }
          // Framer Motion – large animation library, isolated chunk
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion";
          }
          // GSAP + Lenis – animation/scroll utilities
          if (id.includes("node_modules/gsap") || id.includes("node_modules/@studio-freight/lenis")) {
            return "animation";
          }
          // Radix UI primitives – large but infrequently changing
          if (id.includes("node_modules/@radix-ui")) {
            return "radix-ui";
          }
          // Lucide icons – can be large, isolate
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
          // Recharts / recharts deps – only used on stats sections
          if (id.includes("node_modules/recharts") || id.includes("node_modules/d3-")) {
            return "charts";
          }
          // Everything else from node_modules → vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
}));
