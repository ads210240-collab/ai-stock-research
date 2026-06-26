import DecisionLabel from "./DecisionLabel.jsx";
import ResearchPriority from "./ResearchPriority.jsx";
import { priceTone } from "../utils/score.js";

export default function StockSummary({ stock }) {
  return (
    <section className="rounded border border-line bg-white p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Stock Research Report</p>
      <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{stock.name} {stock.code}</h1>
          <p className="mt-2 text-sm text-muted">{stock.themes.join(" / ")}</p>
          <div className="mt-3">
            <DecisionLabel label={stock.decision} showExplain />
          </div>
          <p className="mt-4 max-w-3xl text-base leading-7">{stock.conclusion || stock.reason}</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted"><b>價格提醒：</b>{stock.price.trendLabel}，今日 <span className={priceTone(stock.price.changePercent)}>{stock.price.changePercent > 0 ? "+" : ""}{stock.price.changePercent}%</span>。</p>
        </div>
        <div className="grid min-w-full grid-cols-2 gap-2 sm:min-w-96 sm:grid-cols-4 lg:grid-cols-2">
          <ResearchPriority score={stock.researchPriority} label={stock.researchPriorityLabel} />
          <Metric label="新手適合度" value={stock.price.twentyDayReturn > 30 ? "短線偏熱" : "可學習"} />
          <Metric label="風險等級" value={stock.scores?.volatility || "中"} />
          <Metric label="目前狀態" value={stock.status} />
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded border border-line bg-paper p-3">
      <span className="block text-xs text-muted">{label}</span>
      <span className="mt-1 block text-lg font-semibold">{value}</span>
    </div>
  );
}
