import DecisionLabel from "./DecisionLabel.jsx";

export default function TodayFocus({ focus, themes, onTheme }) {
  const groups = [
    ["新手優先研究", focus.beginner, "先看共識高、來源多、風險相對可控的題材。"],
    ["進階投資人可研究", focus.advanced, "題材有機會，但波動、估值或資料判讀難度較高。"],
    ["新手暫時小心", focus.cautious, "可能有想像空間，但目前不適合新手重壓或追高。"]
  ];

  return (
    <section className="rounded border border-line bg-white p-3 shadow-soft sm:p-4">
      <p className="text-xs font-semibold uppercase text-muted">Today Focus</p>
      <h2 className="mt-1 text-xl font-semibold">今天我該看什麼？</h2>
      <p className="mt-1 text-sm text-muted">這區把市場題材翻譯成研究優先順序，幫新手先決定要看哪個方向。</p>
      <div className="mt-3 grid gap-3 sm:mt-4 lg:grid-cols-3">
        {groups.map(([title, items, note]) => (
          <div key={title} className="rounded border border-line bg-paper p-3">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">{note}</p>
            <div className="mt-3 space-y-3">
              {items.map((item) => {
                const theme = themes.find((candidate) => candidate.id === item.themeId);
                return (
                  <button key={`${title}-${item.themeId}`} onClick={() => onTheme(item.themeId)} className="w-full rounded border border-line bg-white p-2.5 text-left hover:border-accent sm:p-3">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold">{theme?.name || item.themeId}</h4>
                      <DecisionLabel label={theme?.decision || "可觀察"} />
                    </div>
                    <p className="mt-2 text-sm leading-6"><b>為什麼值得看：</b>{item.why}</p>
                    <div className="hidden sm:block">
                      <p className="mt-1 text-sm leading-6 text-muted"><b>目前風險：</b>{item.risk}</p>
                      <p className="mt-1 text-sm leading-6 text-muted"><b>對應股票：</b>{item.stocks.join("、")}</p>
                      <p className="mt-1 text-sm leading-6 text-muted"><b>新手：</b>{item.beginner}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
