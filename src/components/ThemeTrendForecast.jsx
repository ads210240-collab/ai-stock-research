export default function ThemeTrendForecast({ theme }) {
  const rows = [
    ["短期 1～4 週", theme.trendForecast?.short],
    ["中期 1～3 個月", theme.trendForecast?.mid],
    ["長期 6～12 個月", theme.trendForecast?.long]
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Trend Forecast</p>
      <h2 className="mt-1 text-xl font-semibold">題材趨勢預估</h2>
      <p className="mt-1 text-sm text-muted">這區在看題材是短線升溫、循環復甦，還是長期結構成長。</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {rows.map(([period, forecast]) => (
          <div key={period} className="rounded border border-line bg-paper p-3">
            <p className="text-xs font-semibold text-muted">{period}</p>
            <p className="mt-2 text-lg font-semibold">{forecast?.label || "不確定"}</p>
            <p className="mt-2 text-sm leading-6">{forecast?.reason || "資料不足，先保守觀察。"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
