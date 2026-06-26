import { ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";
import DecisionLabel from "./DecisionLabel.jsx";
import { starString } from "../utils/score.js";

export default function ThemeCard({ theme, onClick }) {
  const TrendIcon = theme.trend === "升溫" ? TrendingUp : theme.trend === "降溫" ? TrendingDown : ShieldCheck;
  return (
    <button onClick={onClick} className="rounded border border-line bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-accent">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{theme.name}</h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{theme.plain}</p>
        </div>
        <span className="rounded bg-paper p-2 text-accent"><TrendIcon size={18} /></span>
      </div>
      <div className="mt-3">
        <DecisionLabel label={theme.decision} showExplain />
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <MiniMetric label="市場熱度" value={theme.researchMetrics.heat.score} />
        <MiniMetric label="市場共識" value={theme.researchMetrics.consensus.score} />
        <MiniMetric label="基本面支持" value={theme.researchMetrics.fundamentals.score} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <Badge label="風險" value={theme.risk} />
        <Badge label="趨勢" value={theme.trend} />
        <Badge label="來源" value={`${theme.sourceCount} 個`} />
        <Badge label="股票" value={`${theme.stockCount} 檔`} />
      </div>
      <p className="mt-3 text-sm leading-6 text-muted"><b>我該怎麼看：</b>{theme.beginnerNote}</p>
    </button>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded border border-line bg-paper px-2 py-2">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-amber-700">{starString(value)}</span>
    </div>
  );
}

function Badge({ label, value }) {
  return (
    <div className="rounded border border-line bg-paper px-2 py-2">
      <span className="block text-muted">{label}</span>
      <span className="block font-semibold text-ink">{value}</span>
    </div>
  );
}
