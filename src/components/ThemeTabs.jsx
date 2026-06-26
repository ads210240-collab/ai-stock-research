import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import DecisionLabel from "./DecisionLabel.jsx";
import { starString } from "../utils/score.js";

const tabConfig = [
  ["AI Server", "ai-server"],
  ["ASIC", "asic"],
  ["PCB", "pcb-ccl"],
  ["CCL", "pcb-ccl"],
  ["ABF", "abf"],
  ["MLCC", "mlcc-passive"],
  ["Power", "power-supply"],
  ["散熱", "thermal"],
  ["記憶體", "memory"],
  ["MOSFET", "mosfet-power"],
  ["Robot", "robotics"],
  ["車用", "auto-electronics"]
];

export default function ThemeTabs({ themes, stocks, onTheme, onStock }) {
  const [activeId, setActiveId] = useState("ai-server");
  const activeTheme = themes.find((theme) => theme.id === activeId) || themes[0];
  const relatedStocks = useMemo(() => (
    stocks.filter((stock) => stock.themeIds.includes(activeTheme.id)).sort((a, b) => b.aiSortScore - a.aiSortScore).slice(0, 4)
  ), [activeTheme.id, stocks]);

  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">Theme Research Tabs</p>
          <h2 className="mt-1 text-xl font-semibold">題材分頁研究</h2>
          <p className="mt-1 text-sm text-muted">切換題材只更新下方內容，先看故事與研究原因，再決定要不要進詳情。</p>
        </div>
        <button onClick={() => onTheme(activeTheme.id)} className="inline-flex items-center gap-2 rounded border border-line px-3 py-2 text-sm font-semibold hover:border-accent">
          看完整分析 <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {tabConfig.map(([label, id]) => (
          <button
            key={`${label}-${id}`}
            onClick={() => setActiveId(id)}
            className={`shrink-0 rounded border px-3 py-2 text-sm font-semibold ${activeTheme.id === id ? "border-accent bg-blue-50 text-accent" : "border-line bg-paper text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded border border-line bg-paper p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">{activeTheme.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{activeTheme.marketSummaryLong}</p>
            </div>
            <DecisionLabel label={activeTheme.decision} showExplain />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <Metric label="市場熱度" value={starString(activeTheme.researchMetrics.heat.score)} />
            <Metric label="市場共識" value={starString(activeTheme.researchMetrics.consensus.score)} />
            <Metric label="基本面" value={starString(activeTheme.researchMetrics.fundamentals.score)} />
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">市場故事</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {activeTheme.marketStory.map((step, index) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded border border-line bg-white px-2 py-1 text-xs font-semibold">{step}</span>
                  {index < activeTheme.marketStory.length - 1 && <ArrowRight size={14} className="text-muted" />}
                </span>
              ))}
            </div>
          </div>
        </article>

        <aside className="grid gap-3">
          <div className="rounded border border-line bg-paper p-3">
            <p className="text-sm font-semibold">為什麼今天值得研究？</p>
            <div className="mt-2 space-y-2">
              {activeTheme.researchReasons.slice(0, 4).map((reason) => (
                <p key={reason.label} className="flex gap-2 rounded border border-line bg-white p-2 text-sm leading-6">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-600" />
                  <span><b>{reason.label}：</b>{reason.text}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="rounded border border-line bg-paper p-3">
            <p className="text-sm font-semibold">相關股票</p>
            <div className="mt-2 grid gap-2">
              {relatedStocks.map((stock) => (
                <button key={stock.id} onClick={() => onStock(stock.id)} className="rounded border border-line bg-white p-2 text-left text-sm hover:border-accent">
                  <span className="font-semibold">{stock.name} {stock.code}</span>
                  <span className="ml-2 text-muted">{stock.decision}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded border border-line bg-white p-2">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-semibold text-amber-700">{value}</p>
    </div>
  );
}
