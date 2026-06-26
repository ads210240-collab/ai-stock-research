import TermChip from "./TermChip.jsx";

export default function BeginnerGlossary({ glossary }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Beginner Glossary</p>
      <h2 className="mt-1 text-xl font-semibold">新手白話翻譯</h2>
      <p className="mt-1 text-sm text-muted">這區把專有名詞翻成新手版，點一下就能展開解釋。</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {glossary.map((item) => (
          <TermChip key={item.term} term={item.term} explain={item.explain} />
        ))}
      </div>
    </section>
  );
}
