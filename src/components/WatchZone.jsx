import { useMemo, useState } from "react";
import { Bell, BellRing, Save } from "lucide-react";
import { priceTone } from "../utils/score.js";

const storageKey = "ai-stock-research-watchlist:v1";

function readWatchList() {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || "{}");
  } catch {
    return {};
  }
}

export default function WatchZone({ stock }) {
  const saved = useMemo(() => readWatchList()[stock.code] || {}, [stock.code]);
  const [below, setBelow] = useState(saved.below || "");
  const [above, setAbove] = useState(saved.above || "");
  const [checks, setChecks] = useState(() => new Set(saved.checks || []));
  const current = Number(stock.price.current);

  const alerts = [
    below && current <= Number(below) ? `已跌破 ${below}，研究優先度可重新檢查。` : "",
    above && current >= Number(above) ? `已突破 ${above}，注意是否進入偏熱區。` : ""
  ].filter(Boolean);

  const toggle = (item) => {
    setChecks((next) => {
      const copy = new Set(next);
      if (copy.has(item)) copy.delete(item);
      else copy.add(item);
      return copy;
    });
  };

  const save = () => {
    const list = readWatchList();
    list[stock.code] = {
      symbol: stock.code,
      name: stock.name,
      below,
      above,
      checks: [...checks],
      updatedAt: new Date().toISOString()
    };
    window.localStorage.setItem(storageKey, JSON.stringify(list));
  };

  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">Watch Zone</p>
          <h2 className="mt-1 text-xl font-semibold">Watch Zone 觀察提醒</h2>
          <p className="mt-1 text-sm text-muted">這是本機收藏與提醒條件，幫新手等訊號，而不是每天亂追。</p>
        </div>
        {alerts.length ? <BellRing className="text-red-600" /> : <Bell className="text-accent" />}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded border border-line bg-paper p-3">
          <p className="text-xs text-muted">目前股價</p>
          <p className="mt-1 text-2xl font-semibold">{current}</p>
          <p className={`text-sm font-semibold ${priceTone(stock.price.changePercent)}`}>{stock.price.changePercent > 0 ? "+" : ""}{stock.price.changePercent}%</p>
        </div>
        <label className="rounded border border-line bg-paper p-3 text-sm">
          跌破價格通知
          <input value={below} onChange={(event) => setBelow(event.target.value)} inputMode="decimal" className="mt-2 w-full rounded border border-line px-3 py-2" placeholder="例如 1000" />
        </label>
        <label className="rounded border border-line bg-paper p-3 text-sm">
          突破價格通知
          <input value={above} onChange={(event) => setAbove(event.target.value)} inputMode="decimal" className="mt-2 w-full rounded border border-line px-3 py-2" placeholder="例如 1100" />
        </label>
      </div>
      {alerts.length > 0 && (
        <div className="mt-3 rounded border border-red-100 bg-red-50 p-3 text-sm leading-6 text-red-800">
          {alerts.map((alert) => <p key={alert}>{alert}</p>)}
        </div>
      )}
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {stock.watchZones.map((item) => (
          <label key={item} className="flex items-center gap-2 rounded border border-line bg-paper p-3 text-sm">
            <input checked={checks.has(item)} onChange={() => toggle(item)} type="checkbox" className="h-4 w-4 accent-accent" />
            {item}
          </label>
        ))}
      </div>
      <button onClick={save} className="mt-4 inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-semibold text-white">
        <Save size={16} /> 收藏這檔觀察條件
      </button>
    </section>
  );
}
