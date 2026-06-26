export default function FairValuePanel({ stock }) {
  const value = stock.fairValue;
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Fair Value</p>
      <h2 className="mt-1 text-xl font-semibold">合理估值</h2>
      <p className="mt-1 text-sm text-muted">這區用 mock 法人目標價和合理區間，幫你判斷現在是低估、合理或偏高。</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Box title="法人平均目標價" value={value.analystTarget} />
        <Box title="合理估值區" value={value.range} />
        <Box title="目前位置" value={value.position} />
      </div>
      <p className="mt-3 rounded border border-blue-100 bg-blue-50 p-3 text-sm leading-6">{value.reason}</p>
    </section>
  );
}

function Box({ title, value }) {
  return (
    <div className="rounded border border-line bg-paper p-3">
      <p className="text-xs text-muted">{title}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
