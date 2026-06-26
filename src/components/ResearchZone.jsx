export default function ResearchZone({ stock }) {
  const tone = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    yellow: "border-amber-200 bg-amber-50 text-amber-900",
    red: "border-rose-200 bg-rose-50 text-rose-800"
  };
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Research Zone</p>
      <h2 className="mt-1 text-xl font-semibold">AI 研究區間</h2>
      <p className="mt-1 text-sm text-muted">這區不是建議買進價格，而是提醒什麼價格範圍值得開始觀察與補資料。</p>
      <p className="mt-4 text-sm">目前股價：<b className="text-xl">{stock.price.current}</b></p>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {stock.researchZones.map((zone) => (
          <div key={zone.label} className={`rounded border p-3 ${tone[zone.tone]}`}>
            <h3 className="font-semibold">{zone.label}</h3>
            <p className="mt-1 text-2xl font-semibold">{zone.range}</p>
            <p className="mt-3 text-sm leading-6"><b>適合：</b>{zone.suitableFor}</p>
            <div className="mt-3 space-y-1 text-sm leading-6">
              {zone.reason.map((item) => <p key={item}>• {item}</p>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
