import DecisionLabel from "./DecisionLabel.jsx";
import ResearchPriority from "./ResearchPriority.jsx";
import { priceTone } from "../utils/score.js";

export default function RelatedStockTable({ stocks, onStock }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">AI Sorted Beneficiaries</p>
      <h2 className="mt-1 text-xl font-semibold">受惠股票排序</h2>
      <p className="mt-1 text-sm text-muted">這區用研究卡片比較受惠股票，重點是為什麼值得花時間研究，不是看誰分數最大。</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {stocks.map((stock) => (
          <button key={stock.id} onClick={() => onStock(stock.id)} className="rounded border border-line bg-paper p-3 text-left hover:border-accent hover:bg-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{stock.name} {stock.code}</h3>
                <p className="mt-1 text-xs text-muted">{stock.role} · {stock.themes.join(" / ")}</p>
              </div>
              <DecisionLabel label={stock.decision} />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <ResearchPriority score={stock.researchPriority} label={stock.researchPriorityLabel} compact />
              <div className="rounded border border-line bg-white p-2 text-sm">
                <span className="block text-xs text-muted">股價狀態</span>
                <span className={`font-semibold ${priceTone(stock.price.changePercent)}`}>{stock.price.current}｜{stock.price.changePercent > 0 ? "+" : ""}{stock.price.changePercent}%</span>
                <p className="mt-1 text-xs text-muted">{stock.price.trendLabel}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6">{stock.reason}</p>
            <p className="mt-1 text-sm leading-6 text-muted"><b>今天可學：</b>{stock.learningTopics?.[0]}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
