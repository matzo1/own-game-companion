import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Own",
        name: "Own Game Companion",
        description: "App complementaria para el juego de mesa Own",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon"
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any maskable"
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable"
          }
        ],
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#000000",
        background_color: "#ffffff",
        prefer_related_applications: false,
        categories: ["games", "entertainment"],
        shortcuts: [
          {
            name: "Escanear QR",
            short_name: "Escanear",
            description: "Escanea un código QR de una carta",
            url: "/?source=scanner",
            icons: [{ src: "logo192.png", sizes: "192x192" }]
          }
        ],
        screenshots: [
          {
            src: "screenshot1.png",
            sizes: "1280x720",
            type: "image/png",
            platform: "wide",
            label: "Pantalla principal de Own"
          }
        ],
        related_applications: [],
        scope: "/",
        lang: "es-AR"
      }
    })
  ],
})
