export default function ScoreBreakdown({ breakdown, type = "stock" }) {
  if (!breakdown) return null;
  const rows = [
    ["來源共識", breakdown.sourceConsensus, type === "stock" ? "25%" : "30%"],
    ["題材熱度", breakdown.themeHeat, type === "stock" ? "題材關聯" : "20%"],
    ["基本面支持", breakdown.fundamentals, "20%"],
    ["技術面位置", breakdown.technical, "15%"],
    ["法人資金", breakdown.institutional, "10%"],
    ["新手風險", breakdown.beginnerRisk, "5%"]
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Score Breakdown</p>
      <h2 className="mt-1 text-xl font-semibold">研究優先度怎麼來</h2>
      <p className="mt-1 text-sm text-muted">這區是展開細節，說明來源、題材、基本面、技術面、法人與新手風險如何影響研究排序。</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(([label, value, weight]) => (
          <div key={label} className="rounded border border-line bg-paper p-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold">{label}</span>
              <span className="text-muted">{weight}</span>
            </div>
            <div className="mt-3 h-2 rounded bg-slate-200">
              <div className="h-2 rounded bg-accent" style={{ width: `${Math.max(5, Math.min(100, value))}%` }} />
            </div>
            <p className="mt-2 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
