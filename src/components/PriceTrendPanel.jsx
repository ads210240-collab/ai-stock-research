import MiniPriceChart from "./MiniPriceChart.jsx";
import { priceExplanation, priceTone } from "../utils/score.js";

export default function PriceTrendPanel({ stock }) {
  const price = stock.price;
  const updatedAt = stock.liveUpdatedAt ? new Date(stock.liveUpdatedAt).toLocaleString("zh-TW", { hour12: false }) : "離線範例資料";
  const metrics = [
    ["成交量", `${Number(price.volume || 0).toLocaleString()} ${price.source ? "千股" : "張"}`],
    ["近 5 日", `${price.fiveDayReturn}%`],
    ["近 20 日", `${price.twentyDayReturn}%`],
    ["近 60 日", `${price.sixtyDayReturn}%`],
    ["20 日高低", `${price.low20d}～${price.high20d}`],
    ["52 週高低", `${price.low52w}～${price.high52w}`],
    ["距 52 週高", `${price.distanceFrom52wHigh}%`],
    ["距 52 週低", `+${price.distanceFrom52wLow}%`]
  ];
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Price Trend</p>
      <h2 className="mt-1 text-xl font-semibold">股價與近期走勢</h2>
      <p className="mt-1 text-sm text-muted">這區在看現在是強勢、拉回、轉弱，還是只適合觀察價格位置。資料來源：{stock.dataSource || "Mock Data"}，更新：{updatedAt}</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="rounded border border-line bg-paper p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted">目前股價</p>
                <p className="text-3xl font-semibold">{price.current}</p>
              </div>
              <div className={`text-right font-semibold ${priceTone(price.change)}`}>
                <p>{price.change > 0 ? "+" : ""}{price.change}</p>
                <p>{price.changePercent > 0 ? "+" : ""}{price.changePercent}%</p>
              </div>
            </div>
            <p className="mt-3 rounded border border-line bg-white px-2 py-2 text-sm font-semibold">{price.trendLabel}</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {metrics.map(([label, value]) => (
              <div key={label} className="rounded border border-line bg-paper p-2">
                <span className="block text-xs text-muted">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <MiniPriceChart data={price.priceHistory30d} />
          <div className="mt-3 rounded border border-blue-100 bg-blue-50 p-3 text-sm leading-6">{priceExplanation(price)}</div>
        </div>
      </div>
    </section>
  );
}
