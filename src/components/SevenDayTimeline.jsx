export default function SevenDayTimeline({ stock }) {
  const timeline = stock.timeline || [
    { date: "06/20", event: "題材討論增加", change: "+1", reason: "市場關注度提高" },
    { date: "06/21", event: "等待更高級別來源", change: "0", reason: "尚未納入評分" },
    { date: "06/22", event: "族群輪動", change: "+1", reason: "相關股票同步表現" },
    { date: "06/23", event: "波動升高", change: "-1", reason: "新手風險提高" },
    { date: "06/24", event: "來源共識維持", change: "0", reason: "沒有新變數" },
    { date: "06/25", event: "短線整理", change: "-1", reason: "技術分數下降" },
    { date: "06/26", event: "維持觀察", change: "0", reason: "等待下一個基本面驗證" }
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Seven Day Change</p>
      <h2 className="mt-1 text-xl font-semibold">最近七天變化</h2>
      <div className="mt-4 space-y-3">
        {timeline.map((item, index) => (
          <div key={`${item.date}-${index}`} className="grid gap-3 rounded border border-line bg-paper p-3 sm:grid-cols-[88px_1fr_80px_1.2fr]">
            <div className="font-semibold">{item.date}</div>
            <div>{item.event}</div>
            <div className={item.change.startsWith("-") ? "font-semibold text-rose-700" : item.change === "0" ? "font-semibold text-muted" : "font-semibold text-emerald-700"}>{item.change}</div>
            <div className="text-sm text-muted">{item.reason}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
