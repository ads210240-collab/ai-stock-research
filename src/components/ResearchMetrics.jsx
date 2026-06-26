import { starString } from "../utils/score.js";

const icons = {
  heat: "🔥",
  consensus: "🤝",
  maturity: "📈",
  fundamentals: "💰",
  volatility: "⚠"
};

export default function ResearchMetrics({ metrics }) {
  if (!metrics) return null;
  const rows = [
    ["heat", metrics.heat],
    ["consensus", metrics.consensus],
    ["maturity", metrics.maturity],
    ["fundamentals", metrics.fundamentals],
    ["volatility", metrics.volatility]
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Research Signals</p>
      <h2 className="mt-1 text-xl font-semibold">五大研究指標</h2>
      <p className="mt-1 text-sm text-muted">這區不是問會不會漲，而是幫新手判斷這個題材或股票值不值得花時間研究。</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {rows.map(([key, metric]) => (
          <div key={key} className="rounded border border-line bg-paper p-3">
            <p className="text-sm font-semibold">{icons[key]} {metric.title}</p>
            <p className="mt-1 text-xs text-muted">{metric.plain}</p>
            <p className="mt-3 text-lg font-semibold text-amber-700">{starString(metric.score)}</p>
            <p className="mt-2 text-sm leading-6">{metric.why}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
