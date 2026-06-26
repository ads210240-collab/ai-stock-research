import { AlertTriangle, Activity, Newspaper } from "lucide-react";

export default function MarketSummary({ summary }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">Market Brief</p>
          <h2 className="mt-1 text-xl font-semibold">今日市場摘要</h2>
          <p className="mt-1 text-sm text-muted">這區在看今天市場風向，先判斷該研究哪些題材。</p>
        </div>
        <span className="rounded bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{summary.sentiment}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Info icon={<Activity size={18} />} label="今日主流題材" value={summary.leadingThemes.join("、")} />
        <Info icon={<Newspaper size={18} />} label="最近七天市場變化" value={summary.sevenDayChange} />
      </div>
      <div className="mt-3 rounded border border-blue-100 bg-blue-50 p-3">
        <p className="text-xs font-semibold text-accent">AI 一句話總結</p>
        <p className="mt-1 text-sm leading-6">{summary.aiSummary}</p>
      </div>
      <div className="mt-3 flex gap-2 rounded border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
        <AlertTriangle className="mt-1 shrink-0" size={17} />
        <span>{summary.volatilityAlert}</span>
      </div>
    </section>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded border border-line bg-paper p-3">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted">{icon}{label}</div>
      <p className="text-sm leading-6">{value}</p>
    </div>
  );
}
