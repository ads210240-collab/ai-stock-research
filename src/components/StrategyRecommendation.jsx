import { priceExplanation } from "../utils/score.js";

export default function StrategyRecommendation({ stock }) {
  const s = stock.strategies || defaultStrategies(stock);
  const rows = [
    ["長期持有", [
      ["適合程度", s.longTerm.fit],
      ["原因", s.longTerm.reason],
      ["風險", s.longTerm.risk],
      ["建議方式", s.longTerm.method]
    ]],
    ["短波操作", [
      ["適合程度", s.swing.fit],
      ["是否適合進場", s.swing.enter],
      ["建議觀察位置", s.swing.observe],
      ["停利停損提醒", s.swing.risk]
    ]],
    ["當沖", [
      ["適合程度", s.intraday.fit],
      ["是否適合新手", s.intraday.novice],
      ["成交量與波動", s.intraday.volume],
      ["風險提醒", s.intraday.risk]
    ]],
    ["定期定額", [
      ["是否適合", s.dca.fit],
      ["原因", s.dca.reason]
    ]]
  ];

  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">AI Recommendation</p>
      <h2 className="mt-1 text-xl font-semibold">AI 建議</h2>
      <p className="mt-1 text-sm text-muted">以下僅作研究輔助，不使用必買、必賣或保證性語句。</p>
      <div className="mt-4 rounded border border-blue-100 bg-blue-50 p-3 text-sm leading-6">
        <b>股價狀態串接：</b>{priceExplanation(stock.price)}
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        {rows.map(([title, items]) => (
          <article key={title} className="rounded border border-line bg-paper p-3">
            <h3 className="font-semibold">{title}</h3>
            <div className="mt-3 space-y-2">
              {items.map(([label, value]) => (
                <div key={label} className="rounded border border-line bg-white p-2 text-sm">
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="mt-1 block leading-6">{value}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function defaultStrategies(stock) {
  const stable = stock.beginnerFit >= 70;
  return {
    longTerm: {
      fit: stable ? "中" : "低到中",
      reason: stable ? "來源與基本面假設較容易追蹤" : "波動或來源不足，需先補研究",
      risk: "題材降溫、估值修正與市場波動",
      method: "先建立觀察清單，等月營收與法人觀點確認"
    },
    swing: {
      fit: stock.status === "等待拉回" ? "中" : "低",
      enter: stock.status,
      observe: "等待量縮、支撐附近或題材分數重新上升",
      risk: "不預設一定反彈，跌破假設要停損"
    },
    intraday: {
      fit: "低",
      novice: "不適合新手",
      volume: "成交量與波動需即時監控",
      risk: "新手不建議當沖"
    },
    dca: {
      fit: stable ? "可小額觀察" : "暫不適合",
      reason: stable ? "財務透明度相對高" : "高波動股不適合用定期定額掩蓋風險"
    }
  };
}
