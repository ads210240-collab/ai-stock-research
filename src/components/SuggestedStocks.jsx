import { BadgeCheck } from "lucide-react";
import { stockSortFormula } from "../utils/score.js";
import CoachStockCard from "./CoachStockCard.jsx";

export default function SuggestedStocks({ stocks, onStock }) {
  const suggested = [...stocks].sort((a, b) => b.aiSortScore - a.aiSortScore).slice(0, 5);
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">AI Suggested Research List</p>
          <h2 className="mt-1 text-xl font-semibold">今日值得研究股票</h2>
          <p className="mt-1 text-sm text-muted">手機版先顯示前 5 檔，讓你今天有明確研究清單。</p>
        </div>
        <BadgeCheck className="text-accent" size={22} />
      </div>
      <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted">
        {stockSortFormula.map(([label, weight]) => (
          <span key={label} className="rounded border border-line bg-paper px-2 py-1">{label} {weight}</span>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {suggested.map((stock) => (
          <CoachStockCard key={stock.id} stock={stock} onClick={() => onStock(stock.id)} />
        ))}
      </div>
    </section>
  );
}
