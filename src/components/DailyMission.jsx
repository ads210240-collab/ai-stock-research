import ResearchPriority from "./ResearchPriority.jsx";
import DecisionLabel from "./DecisionLabel.jsx";

export default function DailyMission({ themes, stocks, onTheme, onStock }) {
  const themeIds = ["mlcc-passive", "ai-server", "pcb-ccl"];
  const stockIds = ["2327", "2308", "2383", "3017", "3037"];
  const missionThemes = themeIds.map((id) => themes.find((theme) => theme.id === id)).filter(Boolean);
  const missionStocks = stockIds.map((id) => stocks.find((stock) => stock.id === id)).filter(Boolean);

  return (
    <section className="rounded border border-line bg-white p-3 shadow-soft sm:p-4">
      <p className="text-xs font-semibold uppercase text-muted">AI Stock Research Coach</p>
      <h1 className="mt-1 text-2xl font-semibold leading-tight sm:text-3xl">AI 今日任務</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">今天 AI 幫你整理好了：看 3 個題材、5 檔股票、學 1 個觀念。這不是買賣清單，是研究清單。</p>
      <div className="mt-3 grid gap-3 sm:mt-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded border border-line bg-paper p-3">
          <h2 className="font-semibold">今天建議研究題材</h2>
          <div className="mt-3 grid gap-2">
            {missionThemes.map((theme, index) => (
              <button key={theme.id} onClick={() => onTheme(theme.id)} className="flex w-full items-start gap-3 rounded border border-line bg-white p-2.5 text-left hover:border-accent sm:p-3">
                <span className="font-semibold text-accent">0{index + 1}</span>
                <span>
                  <span className="block font-semibold">{theme.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted sm:block">{theme.beginnerNote}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {missionStocks.map((stock, index) => (
            <button key={stock.id} onClick={() => onStock(stock.id)} className="rounded border border-line bg-paper p-3 text-left hover:border-accent hover:bg-white">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-accent">今日研究股票 0{index + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold">{stock.name} {stock.code}</h3>
                  <p className="mt-1 text-xs text-muted">{stock.themes.join(" / ")}</p>
                </div>
                <ResearchPriority score={stock.researchPriority} label={stock.researchPriorityLabel} compact />
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                <Info title="為什麼今天推薦" body={stock.todayReason} />
                <Info title="今天可以學到什麼" body={stock.learningTopics[0]} compactMobile />
                <Info title="是否適合觀察" body={stock.decision} extra={<DecisionLabel label={stock.decision} />} compactMobile />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Info({ title, body, extra, compactMobile = false }) {
  return (
    <div className={`${compactMobile ? "hidden sm:block" : ""} rounded border border-line bg-white p-2 text-sm leading-6`}>
      <p className="text-xs font-semibold text-muted">{title}</p>
      <p className="mt-1">{body}</p>
      {extra && <div className="mt-2">{extra}</div>}
    </div>
  );
}
