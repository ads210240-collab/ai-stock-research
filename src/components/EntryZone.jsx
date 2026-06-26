export default function EntryZone({ stock }) {
  const zones = [stock.entryZones?.aggressive, stock.entryZones?.balanced, stock.entryZones?.conservative].filter(Boolean);
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Entry Zone</p>
      <h2 className="mt-1 text-xl font-semibold">進場區間輔助</h2>
      <p className="mt-1 text-sm text-muted">這區不是買賣訊號，而是把價格拆成不同風險的研究觀察區。</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {zones.map((zone) => (
          <div key={zone.label} className="rounded border border-line bg-paper p-3">
            <p className="text-xs font-semibold text-muted">{zone.label}</p>
            <p className="mt-1 text-2xl font-semibold">{zone.range}</p>
            <p className="mt-3 text-sm leading-6"><b>適合誰：</b>{zone.suitableFor}</p>
            <p className="mt-1 text-sm leading-6 text-muted"><b>風險：</b>{zone.risk}</p>
            <p className="mt-1 text-sm leading-6 text-muted"><b>原因：</b>{zone.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
