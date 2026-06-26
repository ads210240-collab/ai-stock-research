import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import ResearchPriority from "./ResearchPriority.jsx";
import DecisionLabel from "./DecisionLabel.jsx";
import { priceTone } from "../utils/score.js";

export default function CoachStockCard({ stock, onClick }) {
  const reasons = ["題材共識高", "法人偏多", "基本面穩"];
  const risk = stock.price.twentyDayReturn > 20 ? "股價偏熱" : stock.maxRisk;
  return (
    <button onClick={onClick} className="rounded border border-line bg-white p-3 text-left shadow-soft hover:border-accent sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold sm:text-xl">{stock.name} {stock.code}</h3>
          <p className="mt-1 text-sm text-muted">{stock.themes.join(" / ")}</p>
        </div>
        <ArrowRight className="text-muted" size={18} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_0.75fr] sm:gap-3">
        <ResearchPriority score={stock.researchPriority} label={stock.researchPriorityLabel} compact />
        <div className="rounded border border-line bg-paper p-2.5 sm:p-3">
          <p className="text-xs text-muted">目前</p>
          <p className="mt-1 text-xl font-semibold sm:text-2xl">{stock.price.current}</p>
          <p className={`mt-1 font-semibold ${priceTone(stock.price.changePercent)}`}>{stock.price.changePercent > 0 ? "▲" : "▼"}{Math.abs(stock.price.changePercent)}%</p>
        </div>
      </div>
      <p className="mt-3 rounded border border-blue-100 bg-blue-50 p-2.5 text-sm leading-6 sm:p-3"><b>AI 一句：</b>{stock.coachSummary}</p>
      <div className="mt-3">
        <DecisionLabel label={stock.decision} showExplain />
      </div>
      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        {reasons.map((item) => (
          <p key={item} className="flex items-center gap-2 rounded border border-line bg-paper p-2"><CheckCircle2 size={16} className="shrink-0 text-emerald-600" />{item}</p>
        ))}
        <p className="flex items-center gap-2 rounded border border-amber-200 bg-amber-50 p-2 text-amber-900"><AlertTriangle size={16} className="shrink-0" />{risk}</p>
      </div>
    </button>
  );
}
