import { decisionExplain, decisionTone } from "../utils/score.js";

export default function DecisionLabel({ label, showExplain = false }) {
  return (
    <div className={`inline-flex flex-col rounded border px-2.5 py-1.5 text-xs font-semibold ${decisionTone(label)}`}>
      <span>{label}</span>
      {showExplain && <span className="mt-1 max-w-xs font-normal leading-5">{decisionExplain(label)}</span>}
    </div>
  );
}
