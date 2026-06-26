export default function MacroImpactPanel({ factors = [], theme }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Macro Impact</p>
      <h2 className="mt-1 text-xl font-semibold">國際情勢影響</h2>
      <p className="mt-1 text-sm text-muted">這區每天回答：現在如何、影響哪些題材、影響哪些股票，以及新手該怎麼翻譯。</p>
      {theme?.macro && (
        <div className="mt-4 rounded border border-blue-100 bg-blue-50 p-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold">{theme.name} 對國際情勢敏感度：{theme.macro.sensitivity}</p>
            <p className="text-sm text-muted">主要因子：{theme.macro.factors.join("、")}</p>
          </div>
          <p className="mt-2 text-sm leading-6">{theme.macro.explanation}</p>
        </div>
      )}
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {factors.map((item) => (
          <div key={item.factor} className="rounded border border-line bg-paper p-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{item.factor}</h3>
              <span className="rounded border border-line bg-white px-2 py-1 text-xs">{item.now}</span>
            </div>
            <p className="mt-2 text-sm leading-6">{item.impact}</p>
            <p className="mt-2 text-xs leading-5 text-muted"><b>影響題材：</b>{item.themes?.join("、")}</p>
            <p className="mt-1 text-xs leading-5 text-muted"><b>影響股票：</b>{item.stocks?.join("、")}</p>
            <p className="mt-2 rounded border border-line bg-white p-2 text-sm leading-6">{item.plain}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
