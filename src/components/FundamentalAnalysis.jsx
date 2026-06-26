const hints = {
  revenue: "營收是公司賣東西收到的錢，先看趨勢再看單月。",
  eps: "EPS 是每股盈餘，代表公司賺錢能力。",
  pe: "PE 是本益比，越高通常代表市場期待越高。",
  grossMargin: "毛利率可看產品組合與競爭力。",
  roe: "ROE 是股東權益報酬率，用來看資本使用效率。",
  demand: "產業需求決定公司成長是否有外部支撐。"
};

export default function FundamentalAnalysis({ stock }) {
  const data = stock.fundamentals || fallbackFundamentals(stock);
  const labels = { revenue: "營收", eps: "EPS", pe: "PE", grossMargin: "毛利率", roe: "ROE", demand: "產業需求" };
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Fundamental</p>
      <h2 className="mt-1 text-xl font-semibold">基本面分析</h2>
      <div className="mt-4 space-y-3">
        {Object.entries(labels).map(([key, label]) => (
          <div key={key} className="rounded border border-line bg-paper p-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-semibold">{label}</h3>
              <span className="text-xs text-muted">{hints[key]}</span>
            </div>
            <p className="mt-2 text-sm leading-6">{data[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function fallbackFundamentals(stock) {
  return {
    revenue: "需要追蹤月營收是否連續改善",
    eps: "獲利資料待完整更新",
    pe: "評價需與同族群比較",
    grossMargin: "觀察高階產品占比是否提升",
    roe: "用來確認長期資本效率",
    demand: `${stock.themes[0]} 題材需求是主要研究假設`
  };
}
