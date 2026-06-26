import { getScoreGuide } from "../utils/score.js";

export default function ScoreExplanation({ score, reason }) {
  const guide = getScoreGuide(Number(score) || 0);
  return (
    <div className="rounded border border-line bg-paper p-3 text-sm leading-6">
      <p className="font-semibold">{score} 分｜{guide.level}</p>
      <p className="mt-1 text-muted">{guide.explanation}</p>
      {reason && <p className="mt-2">{reason}</p>}
    </div>
  );
}
