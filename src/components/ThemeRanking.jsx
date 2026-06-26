export default function ThemeRanking({ themes }) {
  const rows = [
    ["熱度最高", [...themes].sort((a, b) => b.heat - a.heat)[0]],
    ["共識最高", [...themes].sort((a, b) => b.consensus - a.consensus)[0]],
    ["新興題材", themes.find((theme) => theme.emerging) || themes[0]],
    ["風險最高", [...themes].sort((a, b) => riskValue(b.risk) - riskValue(a.risk))[0]],
    ["最適合新手研究", [...themes].sort((a, b) => b.beginnerFit - a.beginnerFit)[0]]
  ];

  return (
    <section className="rounded border border-line bg-terminal p-4 text-white shadow-soft">
      <p className="text-xs font-semibold uppercase text-slate-300">Theme Ranking</p>
      <h2 className="mt-1 text-xl font-semibold">題材排行榜</h2>
      <p className="mt-1 text-sm text-slate-300">這區快速比較哪個題材最熱、共識最高、最適合新手。</p>
      <div className="mt-4 space-y-2">
        {rows.map(([label, theme]) => (
          <div key={label} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/5 px-3 py-3">
            <span className="text-sm text-slate-300">{label}</span>
            <span className="text-right font-semibold">{theme.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function riskValue(risk) {
  if (risk === "高") return 3;
  if (risk === "中高") return 2.5;
  if (risk === "中") return 2;
  return 1;
}
