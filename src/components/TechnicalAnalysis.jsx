export default function TechnicalAnalysis({ stock }) {
  const data = stock.technical || {
    overheated: stock.status === "波動過大" ? "短線波動偏大" : "未見明顯過熱",
    support: "等待靠近主要均線或前波整理區",
    volume: "量能需搭配價格方向觀察",
    range: "目前偏區間震盪",
    chase: stock.status === "可研究" ? "可研究但仍不宜追高" : "目前不適合追價"
  };
  const items = [
    ["是否過熱", data.overheated],
    ["是否接近支撐", data.support],
    ["是否放量", data.volume],
    ["是否高檔震盪", data.range],
    ["目前適不適合追價", data.chase]
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Technical</p>
      <h2 className="mt-1 text-xl font-semibold">技術面分析</h2>
      <div className="mt-4 grid gap-3">
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
