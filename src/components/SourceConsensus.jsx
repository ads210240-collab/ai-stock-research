import { sourceRules, sourceTiers } from "../mockData/sources.js";

export default function SourceConsensus({ sources }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">Source Consensus</p>
          <h2 className="mt-1 text-xl font-semibold">來源共識</h2>
        </div>
        <div className="grid gap-2 text-xs sm:grid-cols-2 lg:max-w-2xl">
          {Object.entries(sourceTiers).map(([tier, names]) => (
            <div key={tier} className="rounded border border-line bg-paper p-2">
              <span className="font-semibold">{tier} 級</span>
              <span className="ml-2 text-muted">{names.join("、")}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 rounded border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
        {sourceRules.join("；")}。
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {sources.length === 0 && (
          <div className="rounded border border-line bg-paper p-3 text-sm leading-6 text-muted">
            目前 mock sources 尚未放入此題材的逐筆來源；實際串 API 時，會優先補 S/A 級來源後再納入 AI 評分。
          </div>
        )}
        {sources.map((source) => (
          <article key={source.id} className="rounded border border-line bg-paper p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{source.name}</h3>
                <p className="text-xs text-muted">{source.date}</p>
              </div>
              <span className="rounded bg-terminal px-2 py-1 text-xs font-semibold text-white">{source.tier} 級</span>
            </div>
            <p className="mt-3 text-sm leading-6">{source.summary}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              <Flag label="可信度" value={source.credibility} />
              <Flag label="原始來源" value={source.original ? "是" : "否"} />
              <Flag label="主觀判斷" value={source.subjective ? "有" : "無"} />
              <Flag label="納入評分" value={source.included ? "是" : "否"} />
            </div>
            <div className="mt-2 text-xs text-muted">與題材關聯度：<b className="text-ink">{source.relevance}</b></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Flag({ label, value }) {
  return (
    <div className="rounded border border-line bg-white px-2 py-2">
      <span className="block text-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
