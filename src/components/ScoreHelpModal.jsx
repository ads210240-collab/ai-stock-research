import { X } from "lucide-react";
import { scoreFormula } from "../utils/score.js";

export default function ScoreHelpModal({ open, onClose, title = "AI 分數怎麼看？" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-3 sm:items-center">
      <div className="max-h-[88vh] w-full max-w-lg overflow-auto rounded border border-line bg-white p-4 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-muted">Score Guide</p>
            <h2 className="mt-1 text-xl font-semibold">{title}</h2>
          </div>
          <button onClick={onClose} className="rounded border border-line p-2 hover:bg-paper" aria-label="關閉分數說明">
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm leading-6">
          <p>AI 分數是研究優先順序，不是買賣建議，也不代表高分一定會漲。</p>
          <p>低分不等於永遠不能研究，通常代表目前資料不足、波動較大，或需要等更多來源確認。</p>
          <div className="rounded border border-line bg-paper p-3">
            <p className="font-semibold">分數拆解</p>
            <div className="mt-2 space-y-2">
              {scoreFormula.map(([label, weight, note]) => (
                <div key={label} className="rounded border border-line bg-white p-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{label}</span>
                    <span>{weight}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{note}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="rounded border border-amber-200 bg-amber-50 p-3 text-amber-900">高分也要看價格位置。若近 20 日漲幅過大，即使題材強，也可能比較適合等待拉回。</p>
        </div>
      </div>
    </div>
  );
}
