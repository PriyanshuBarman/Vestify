import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Vestify",
        short_name: "Vestify",
        description:
          "Vestify is a virtual investment platform that simulates real-world investing using virtual money. It mimics the behavior of actual investment platforms like Groww, Zerodha, or Upstox, helping users who are new to investing and want to understand how the mutual fund investments work before getting started with real money",
        start_url: "/?source=pwa",
        scope: "/",
        icons: [
          {
            purpose: "maskable",
            sizes: "1137.7777777777778x1137.7777777777778",
            src: "maskable_icon.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "48x48",
            src: "maskable_icon_x48.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "72x72",
            src: "maskable_icon_x72.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "96x96",
            src: "maskable_icon_x96.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "128x128",
            src: "maskable_icon_x128.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "192x192",
            src: "maskable_icon_x192.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "384x384",
            src: "maskable_icon_x384.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "maskable_icon_x512.png",
            type: "image/png",
          },
        ],
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
});
