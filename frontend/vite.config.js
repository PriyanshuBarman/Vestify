import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

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
          "Vestify is a virtual investment platform that simulates real mutual fund investing, providing a real, professional-grade experience with a Groww-inspired UI.",
        start_url: "/?source=pwa",
        scope: "/",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Screener",
            short_name: "Screener",
            description: "Discover and invest in mutual funds",
            url: "/mutual-funds/all-funds",
            icons: [
              {
                src: "/shortcut-screener.png",
                sizes: "96x96",
              },
            ],
          },
          {
            name: "Wallet",
            short_name: "Wallet",
            description: "Check your virtual wallet balance",
            url: "/wallet",
            icons: [
              {
                src: "/shortcut-wallet.png",
                sizes: "96x96",
              },
            ],
          },
          {
            name: "Send virtual money",
            short_name: "Send virtual money",
            description: "Send virtual money to otherss",
            url: "/wallet/send",
            icons: [
              {
                src: "/shortcut-send.png",
                sizes: "96x96",
              },
            ],
          },
        ],
        screenshots: [
          {
            src: "/screenshot-1.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshot-2.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshot-3.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshot-4.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshot-5.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshot-6.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshot-wide.png",
            sizes: "1919x975",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/og-image.png",
            sizes: "1600x900",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
