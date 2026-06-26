import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icon.svg", "apple-touch-icon.svg"],
      manifest: {
        name: "AI 股票研究助理",
        short_name: "ResearchAI",
        description: "給股票新手使用的 AI Stock Research Coach，每天整理市場題材、研究優先度、價格觀察區與新手學習內容。",
        theme_color: "#0f172a",
        background_color: "#f8fafc",
        display: "standalone",
        start_url: "/",
        scope: "/",
        lang: "zh-Hant",
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
  server: {
    host: "127.0.0.1"
  }
});
