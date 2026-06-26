export default function SupplyChainTree({ tree }) {
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">AI Supply Chain Tree</p>
      <h2 className="mt-1 text-xl font-semibold">AI Server 供應鏈角色圖</h2>
      <p className="mt-1 text-sm text-muted">這區在看每檔股票位於 AI Server 哪個環節，以及它扮演什麼角色。</p>
      <div className="mt-4 space-y-3">
        <div className="rounded border border-line bg-terminal px-3 py-2 text-sm font-semibold text-white">AI Server</div>
        <div className="grid gap-3 lg:grid-cols-2">
          {tree.map((node) => (
            <div key={node.segment} className="rounded border border-line bg-paper p-3">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-3 w-3 shrink-0 rounded bg-accent" />
                <div>
                  <h3 className="font-semibold">{node.segment}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{node.role}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <Group title="龍頭" items={node.leaders} />
                    <Group title="受惠股" items={node.beneficiaries} />
                    <Group title="補漲股" items={node.catchUp} />
                    <Group title="高風險股" items={node.highRisk} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Group({ title, items = [] }) {
  return (
    <div className="rounded border border-line bg-white p-2">
      <p className="text-xs font-semibold text-muted">{title}</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {items.map((item) => <span key={item} className="rounded bg-paper px-2 py-1 text-xs">{item}</span>)}
      </div>
    </div>
  );
}
