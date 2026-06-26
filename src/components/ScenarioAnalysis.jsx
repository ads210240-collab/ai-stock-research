export default function ScenarioAnalysis({ stock }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Scenario Coach</p>
      <h2 className="mt-1 text-xl font-semibold">AI 情境分析</h2>
      <p className="mt-1 text-sm text-muted">這區幫你練習：價格變動時，研究價值如何改變，而不是看到漲跌就衝動。</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {stock.scenarios.map((item) => (
          <div key={item.title} className="rounded border border-line bg-paper p-3">
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-2 text-2xl font-semibold text-accent">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{item.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
