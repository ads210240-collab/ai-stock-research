import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { getScoreGuide } from "../utils/score.js";
import ScoreHelpModal from "./ScoreHelpModal.jsx";

export default function ScoreBadge({ score, reason, label = "分數", compact = false }) {
  const [open, setOpen] = useState(false);
  const guide = getScoreGuide(Number(score) || 0);
  const tone = {
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700"
  }[guide.tone];

  return (
    <div className={`rounded border ${tone} ${compact ? "px-2 py-1" : "p-3"}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="block text-xs opacity-75">{label}</span>
          <span className={`${compact ? "text-sm" : "text-lg"} font-semibold`}>{score} 分｜{guide.level}</span>
        </div>
        <button onClick={() => setOpen(true)} className="rounded p-1 hover:bg-white/70" aria-label="查看分數說明">
          <HelpCircle size={compact ? 15 : 17} />
        </button>
      </div>
      {!compact && (
        <p className="mt-2 text-sm leading-6">
          {reason || guide.explanation}
        </p>
      )}
      <ScoreHelpModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
