import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { priorityLabel, priorityOneLiner, researchPriorityFormula, starString } from "../utils/score.js";

export default function ResearchPriority({ score, label, compact = false }) {
  const [open, setOpen] = useState(false);
  const displayLabel = label || priorityLabel(score);
  return (
    <div className="rounded border border-line bg-white p-2.5 sm:p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-muted">研究優先度</p>
          <p className="mt-1 text-lg font-semibold tracking-normal text-amber-700 sm:text-xl">{starString(score)}</p>
          <p className="mt-1 font-semibold">{displayLabel}</p>
          {!compact && <p className="mt-1 text-sm leading-6 text-muted">{priorityOneLiner(score)}</p>}
        </div>
        <button onClick={() => setOpen(!open)} className="rounded border border-line p-2 hover:bg-paper" aria-label="展開研究優先度">
          <ChevronDown size={16} className={open ? "rotate-180 transition" : "transition"} />
        </button>
      </div>
      {open && (
        <div className="mt-3 grid gap-2 text-xs">
          {researchPriorityFormula.map(([name, weight, note]) => (
            <div key={name} className="rounded border border-line bg-paper p-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{name}</span>
                <span>{weight}</span>
              </div>
              <p className="mt-1 leading-5 text-muted">{note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
