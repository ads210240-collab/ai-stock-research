export default function LearningMode({ stock }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Learning Mode</p>
      <h2 className="mt-1 text-xl font-semibold">今天你可以學到</h2>
      <p className="mt-1 text-sm text-muted">這區把研究股票變成學習任務，讓你每天累積一個股票知識。</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {stock.learningTopics.map((topic) => (
          <div key={topic} className="rounded border border-line bg-paper p-3 text-sm font-medium">{topic}</div>
        ))}
      </div>
    </section>
  );
}
