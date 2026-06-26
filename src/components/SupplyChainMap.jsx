function stockIdFromText(text) {
  return String(text).match(/\b\d{4}\b/)?.[0];
}

export default function SupplyChainMap({ theme, onStock }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Supply Chain Map</p>
      <h2 className="mt-1 text-xl font-semibold">題材供應鏈地圖</h2>
      <p className="mt-1 text-sm text-muted">這區在看這個題材拆成哪些子環節，以及相關股票扮演什麼角色。</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {theme.supplyChain.map((node) => (
          <div key={node.segment} className="rounded border border-line bg-paper p-3">
            <h3 className="font-semibold">{node.segment}</h3>
            {node.role && <p className="mt-2 text-sm leading-6 text-muted">{node.role}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {node.stocks.map((stock) => (
                stockIdFromText(stock) && onStock
                  ? <button key={stock} onClick={() => onStock(stockIdFromText(stock))} className="rounded border border-line bg-white px-2 py-1 text-left text-xs hover:border-accent hover:text-accent">{stock}</button>
                  : <span key={stock} className="rounded border border-line bg-white px-2 py-1 text-xs">{stock}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
