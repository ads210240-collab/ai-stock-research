import { Radio } from "lucide-react";

export default function CancerDailyPanel({ briefs = [] }) {
  return (
    <section className="rounded border border-line bg-white p-3 shadow-soft sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">Podcast Coach Notes</p>
          <h2 className="mt-1 text-xl font-semibold">今日股癌觀點整理</h2>
          <p className="mt-1 text-sm leading-6 text-muted">這區把節目觀點翻成新手研究任務，只做題材理解與問題整理，不當作喊單或買賣依據。</p>
        </div>
        <Radio className="text-accent" size={22} />
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sm:mt-4 sm:grid sm:overflow-visible sm:pb-0 lg:grid-cols-3">
        {briefs.map((brief) => (
          <article key={brief.title} className="min-w-[82vw] rounded border border-line bg-paper p-3 sm:min-w-0">
            <p className="text-xs font-semibold text-accent">{brief.theme}</p>
            <h3 className="mt-1 font-semibold">{brief.title}</h3>
            <p className="mt-2 text-sm leading-6">{brief.summary}</p>
            <div className="mt-3 rounded border border-blue-100 bg-blue-50 p-2 text-sm leading-6">
              <b>教練翻譯：</b>{brief.coachTranslation}
            </div>
            <div className="hidden sm:block">
              <p className="mt-3 text-xs leading-5 text-muted"><b>相關題材：</b>{brief.relatedThemes.join("、")}</p>
              <p className="mt-1 text-xs leading-5 text-muted"><b>相關股票：</b>{brief.relatedStocks.join("、")}</p>
              <p className="mt-3 rounded border border-amber-200 bg-amber-50 p-2 text-xs leading-5 text-amber-900">{brief.caution}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
