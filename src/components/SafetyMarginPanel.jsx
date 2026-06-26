import { starString } from "../utils/score.js";

export default function SafetyMarginPanel({ stock }) {
  const margin = stock.safetyMargin;
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Safety Margin</p>
      <h2 className="mt-1 text-xl font-semibold">安全邊際</h2>
      <p className="mt-1 text-sm text-muted">這區在看如果價格更接近合理區，研究風險是否下降。</p>
      <p className="mt-4 text-2xl font-semibold text-amber-700">{starString(margin.score)}</p>
      <p className="mt-2 text-sm leading-6">{margin.note}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {margin.reasons.map((item) => (
          <span key={item} className="rounded border border-line bg-paper px-3 py-2 text-sm">{item}</span>
        ))}
      </div>
    </section>
  );
}
