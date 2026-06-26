export default function WhyThisStock({ stock, themes, sources, onTheme }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Discovery Reason</p>
      <h2 className="mt-1 text-xl font-semibold">為什麼這檔被 AI 找到</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        <div className="rounded border border-line bg-paper p-3 lg:col-span-2">
          <p className="text-xs font-semibold text-muted">來自哪些題材</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {themes.map((theme) => (
              <button key={theme.id} onClick={() => onTheme(theme.id)} className="rounded border border-line bg-white px-3 py-2 text-sm font-medium hover:border-accent">{theme.name}</button>
            ))}
          </div>
        </div>
        <Info label="被哪些來源提到" value={sources.map((source) => source.name).join("、") || "目前僅有族群資料，需補強來源"} />
        <Info label="角色定位" value={`${stock.role}，題材關聯度 ${stock.relevance}`} />
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded border border-line bg-paper p-3">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-2 text-sm leading-6">{value}</p>
    </div>
  );
}
