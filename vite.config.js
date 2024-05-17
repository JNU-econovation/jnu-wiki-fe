import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  extensions: [".js", ".jsx", ".css"],
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
    global: {},
  },
});
