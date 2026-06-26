export default function ThemeTrendForecast({ theme }) {
  const rows = [
    ["短期 1～4 週", theme.trendForecast?.short],
    ["中期 1～3 個月", theme.trendForecast?.mid],
    ["長期 6～12 個月", theme.trendForecast?.long]
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Trend Forecast</p>
      <h2 className="mt-1 text-xl font-semibold">AI 趨勢推演</h2>
      <p className="mt-1 text-sm text-muted">這不是預測，而是用目前資料推演短、中、長期可能情境與失效原因。</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {rows.map(([period, forecast]) => (
          <div key={period} className="rounded border border-line bg-paper p-3">
            <p className="text-xs font-semibold text-muted">{period}</p>
            <p className="mt-2 text-lg font-semibold">{forecast?.label || "不確定"}</p>
            <p className="mt-2 text-sm leading-6">{forecast?.reason || "資料不足，先保守觀察。"}</p>
          </div>
        ))}
      </div>
      {theme.invalidationReasons?.length > 0 && (
        <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-3">
          <p className="font-semibold text-amber-900">可能失效原因</p>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            {theme.invalidationReasons.map((reason) => (
              <p key={reason} className="rounded border border-amber-200 bg-white p-2 text-sm leading-6 text-amber-900">{reason}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
