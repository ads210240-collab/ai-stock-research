import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";

export default function ThemeResearchBrief({ theme }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">AI Theme Research Brief</p>
      <h2 className="mt-1 text-xl font-semibold">題材完整分析</h2>
      <p className="mt-1 text-sm text-muted">這區把題材翻譯成新手能理解的市場故事、研究原因與學習任務。</p>

      <details open className="mt-4 rounded border border-line bg-paper p-3">
        <summary className="cursor-pointer font-semibold">市場摘要</summary>
        <p className="mt-3 text-sm leading-7 text-muted">{theme.marketSummaryLong}</p>
      </details>

      <details className="mt-3 rounded border border-line bg-paper p-3">
        <summary className="cursor-pointer font-semibold">為什麼今天值得研究？</summary>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {theme.researchReasons.map((reason) => (
            <div key={reason.label} className="flex gap-2 rounded border border-line bg-white p-3 text-sm leading-6">
              <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-600" />
              <p><b>{reason.label}：</b>{reason.text}</p>
            </div>
          ))}
        </div>
      </details>

      <details className="mt-3 rounded border border-line bg-paper p-3">
        <summary className="cursor-pointer font-semibold">市場故事</summary>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {theme.marketStory.map((step, index) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded border border-line bg-white px-2 py-1 text-xs font-semibold">{step}</span>
              {index < theme.marketStory.length - 1 && <ArrowRight size={14} className="text-muted" />}
            </span>
          ))}
        </div>
      </details>

      <details className="mt-3 rounded border border-line bg-paper p-3">
        <summary className="cursor-pointer font-semibold">Learning Mode：今天可以學到</summary>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {theme.learningItems.map((item) => (
            <div key={item} className="rounded border border-line bg-white p-3 text-sm leading-6">
              <GraduationCap size={16} className="mb-2 text-accent" />
              {item}
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
