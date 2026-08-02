import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
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
          "Vestify is a virtual investment platform that helps beginners learn and practice investing using virtual money, with zero real money involved.",
        start_url: "/stocks#explore",
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
            name: "Stocks",
            short_name: "Stocks",
            description: "Explore and invest in stocks",
            url: "/stocks#explore",
            icons: [
              {
                src: "/shortcuts/stocks.png",
                sizes: "96x96",
              },
            ],
          },
          {
            name: "Mutual Funds",
            short_name: "Mutual Funds",
            description: "Explore and invest in mutual funds",
            url: "/mutual-funds#explore",
            icons: [
              {
                src: "/shortcuts/mutual-funds.png",
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
                src: "/shortcuts/wallet.png",
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
            src: "/screenshots/1.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/2.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/3.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/4.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/5.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/6.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            form_factor: "narrow",
          },
          {
            src: "/og-image.png",
            sizes: "1897x975",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
