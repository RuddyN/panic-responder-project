/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Use JSDOM for testing React components
    globals: true, // Make Vitest APIs globally available (optional)
    setupFiles: ["./setupTests.ts"], // Path to your test setup file (optional)
  },
});
