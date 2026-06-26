export default function LoadingSkeleton() {
  return (
    <section className="grid gap-3 rounded border border-line bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
      {["今日任務", "市場摘要", "熱門題材", "研究股票"].map((label) => (
        <div key={label} className="rounded border border-line bg-paper p-3">
          <div className="h-3 w-20 rounded bg-slate-200" />
          <div className="mt-3 h-5 w-28 rounded bg-slate-200" />
          <div className="mt-4 space-y-2">
            <div className="h-2.5 rounded bg-slate-200" />
            <div className="h-2.5 w-4/5 rounded bg-slate-200" />
            <div className="h-2.5 w-2/3 rounded bg-slate-200" />
          </div>
          <p className="mt-4 text-xs text-muted">{label}載入中</p>
        </div>
      ))}
    </section>
  );
}
