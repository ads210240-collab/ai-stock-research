import { ArrowRight } from "lucide-react";

export default function MarketScenarioPanel({ scenarios = [] }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Market Scenario</p>
      <h2 className="mt-1 text-xl font-semibold">市場推演</h2>
      <p className="mt-1 text-sm text-muted">這區不是預測，而是把國際事件翻譯成新手看得懂的題材連動。</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {scenarios.map((scenario) => (
          <article key={scenario.title} className="rounded border border-line bg-paper p-3">
            <h3 className="font-semibold">{scenario.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {scenario.flow.map((step, index) => (
                <span key={`${scenario.title}-${step}`} className="flex items-center gap-2">
                  <span className={`rounded border px-2 py-1 text-xs font-semibold ${index === 0 ? "border-accent bg-blue-50 text-accent" : "border-line bg-white"}`}>
                    {step}
                  </span>
                  {index < scenario.flow.length - 1 && <ArrowRight size={14} className="text-muted" />}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{scenario.impact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
