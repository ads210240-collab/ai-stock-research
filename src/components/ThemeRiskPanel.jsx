export default function ThemeRiskPanel({ theme }) {
  const items = [
    ["是否已經過熱", theme.risks.overheated],
    ["是否只是短線炒作", theme.risks.hype],
    ["是否有基本面支持", theme.risks.fundamentals],
    ["是否多數來源一致", theme.risks.consensus],
    ["題材轉弱會影響", theme.risks.impactedStocks.join("、")]
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Theme Risk</p>
      <h2 className="mt-1 text-xl font-semibold">題材風險</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(([label, value]) => (
          <div key={label} className="rounded border border-line bg-paper p-3">
            <p className="text-xs font-semibold text-muted">{label}</p>
            <p className="mt-2 text-sm leading-6">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
