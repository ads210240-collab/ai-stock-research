export default function InstitutionalView({ stock }) {
  const data = stock.institutional || {
    buying: "法人籌碼尚未形成明確連續買超",
    target: "目標價調整資料不足，需等待正式報告",
    view: stock.aiScore >= 75 ? "中立偏多" : "中立",
    flow: `${stock.themes[0]} 題材資金仍需觀察是否延續`
  };
  const items = [
    ["近期是否買超", data.buying],
    ["是否調升目標價", data.target],
    ["法人看法", data.view],
    ["資金是否流入該題材", data.flow]
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Institutional View</p>
      <h2 className="mt-1 text-xl font-semibold">法人與券商觀點</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
