import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import ThemeDashboard from "./components/ThemeDashboard.jsx";
import ThemeDetail from "./components/ThemeDetail.jsx";
import StockDetail from "./components/StockDetail.jsx";
import { themes, marketSummary, macroFactors, todayFocus } from "./mockData/themes.js";
import { stocks } from "./mockData/stocks.js";
import { sources } from "./mockData/sources.js";
import { glossary } from "./mockData/glossary.js";
import { useLiveStocks } from "./hooks/useLiveStocks.js";
import LoadingSkeleton from "./components/LoadingSkeleton.jsx";

export default function App() {
  const [route, setRoute] = useState({ type: "dashboard" });
  const [query, setQuery] = useState("");
  const { stocks: liveStocks, loading, error, liveCount } = useLiveStocks(stocks);

  const selectedTheme = themes.find((theme) => theme.id === route.themeId) || themes[1];
  const selectedStock = liveStocks.find((stock) => stock.id === route.stockId) || liveStocks[0];

  const filteredStocks = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return [];
    return liveStocks.filter((stock) => {
      return `${stock.name} ${stock.code} ${stock.themes.join(" ")}`.toLowerCase().includes(text);
    });
  }, [liveStocks, query]);

  const navigate = (nextRoute) => {
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        query={query}
        setQuery={setQuery}
        results={filteredStocks}
        onHome={() => navigate({ type: "dashboard" })}
        onStock={(stockId) => {
          setQuery("");
          navigate({ type: "stock", stockId });
        }}
      />
      <main className="mx-auto w-full max-w-7xl px-3 pb-10 pt-3 sm:px-6 sm:pb-12 sm:pt-4 lg:px-8">
        <div className="mb-3 rounded border border-line bg-white px-3 py-2 text-xs leading-5 text-muted shadow-soft sm:flex sm:items-center sm:justify-between">
          <span>
            資料狀態：{loading ? "正在準備研究資料..." : liveCount ? `已接入 ${liveCount} 檔外部資料` : "使用前端離線研究資料"}
          </span>
          <span>{error || "目前正式公開版不需要後端；未來設定 VITE_API_URL 後可接 API。"}</span>
        </div>
        {loading && <LoadingSkeleton />}
        {route.type === "dashboard" && (
          <ThemeDashboard
            marketSummary={marketSummary}
            macroFactors={macroFactors}
            todayFocus={todayFocus}
            themes={themes}
            stocks={liveStocks}
            onTheme={(themeId) => navigate({ type: "theme", themeId })}
            onStock={(stockId) => navigate({ type: "stock", stockId })}
          />
        )}
        {route.type === "theme" && (
          <ThemeDetail
            theme={selectedTheme}
            stocks={liveStocks}
            sources={sources}
            macroFactors={macroFactors}
            onBack={() => navigate({ type: "dashboard" })}
            onStock={(stockId) => navigate({ type: "stock", stockId })}
          />
        )}
        {route.type === "stock" && (
          <StockDetail
            stock={selectedStock}
            themes={themes}
            sources={sources}
            glossary={glossary}
            onBack={() => navigate({ type: "dashboard" })}
            onTheme={(themeId) => navigate({ type: "theme", themeId })}
          />
        )}
      </main>
      <footer className="border-t border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs leading-5 text-muted sm:px-6 lg:px-8">
          本系統提供的是研究輔助與資訊整理。研究優先度代表值得花時間研究，不代表買賣建議。AI 研究區間代表值得開始觀察的價格範圍，不是建議買進價格。
        </div>
      </footer>
    </div>
  );
}
