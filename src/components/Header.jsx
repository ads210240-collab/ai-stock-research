import { Home, Search, Sparkles } from "lucide-react";

export default function Header({ query, setQuery, results, onHome, onStock }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-3 py-2 sm:gap-3 sm:px-6 sm:py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button onClick={onHome} className="flex items-center gap-3 text-left">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-terminal text-white sm:h-10 sm:w-10">
            <Sparkles size={18} />
          </span>
          <span>
            <span className="block text-base font-semibold tracking-normal leading-tight">AI 股票研究教練</span>
            <span className="block text-xs text-muted">每天陪你研究，不叫你買</span>
          </span>
        </button>
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋股票"
            className="h-10 w-full rounded border border-line bg-paper pl-10 pr-3 text-sm outline-none focus:border-accent focus:bg-white sm:h-11"
          />
          {results.length > 0 && (
            <div className="absolute right-0 top-12 z-40 max-h-72 w-full overflow-auto rounded border border-line bg-white shadow-soft">
              {results.map((stock) => (
                <button
                  key={stock.id}
                  onClick={() => onStock(stock.id)}
                  className="flex w-full items-center justify-between gap-3 border-b border-line px-3 py-3 text-left last:border-b-0 hover:bg-paper"
                >
                  <span>
                    <span className="block font-semibold">{stock.name} {stock.code}</span>
                    <span className="block text-xs text-muted">{stock.themes.join(" / ")}</span>
                  </span>
                  <span className="text-xs text-accent">{stock.status}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={onHome} className="hidden h-10 items-center gap-2 rounded border border-line px-3 text-sm font-medium hover:bg-paper lg:flex">
          <Home size={16} /> 題材中心
        </button>
      </div>
    </header>
  );
}
