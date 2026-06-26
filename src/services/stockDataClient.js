const API_BASE = import.meta.env.VITE_API_URL || "";

function round(value, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return null;
  return Number(Number(value).toFixed(digits));
}

function percentFrom(history, days) {
  if (!history?.length || history.length <= days) return null;
  const latest = history[history.length - 1]?.close;
  const previous = history[Math.max(0, history.length - 1 - days)]?.close;
  if (!latest || !previous) return null;
  return round(((latest - previous) / previous) * 100, 1);
}

function rangeFrom(history, days, type) {
  const slice = (history || []).slice(-days).map((row) => row.close).filter(Boolean);
  if (!slice.length) return null;
  return type === "max" ? Math.max(...slice) : Math.min(...slice);
}

function deriveTrendLabel(snapshot, history) {
  const twentyDayReturn = percentFrom(history, 20) ?? 0;
  const fiveDayReturn = percentFrom(history, 5) ?? 0;
  const current = snapshot.price;
  const high20d = rangeFrom(history, 20, "max");
  const low20d = rangeFrom(history, 20, "min");
  const last = history?.[history.length - 1];

  if (twentyDayReturn >= 25 && high20d && current >= high20d * 0.94) return "高檔震盪";
  if (fiveDayReturn >= 5 && twentyDayReturn >= 8) return "強勢上攻";
  if (last?.ma20 && current <= last.ma20 * 1.03 && current >= last.ma20 * 0.97) return "回測支撐";
  if (low20d && current <= low20d * 1.06) return "低檔整理";
  if (fiveDayReturn <= -6 && twentyDayReturn <= -8) return "轉弱";
  return "整理觀察";
}

export function normalizeLiveSnapshot(snapshot) {
  if (!snapshot?.price) return null;
  const history = (snapshot.history || []).filter((row) => row?.close);
  const current = round(snapshot.price, 2);
  const high52w = round(snapshot.high52, 2);
  const low52w = round(snapshot.low52, 2);
  const high20d = round(rangeFrom(history, 20, "max"), 2);
  const low20d = round(rangeFrom(history, 20, "min"), 2);

  return {
    current,
    change: round(snapshot.change, 2) ?? 0,
    changePercent: round(snapshot.changePercent, 2) ?? 0,
    volume: snapshot.volume ? Math.round(snapshot.volume / 1000) : 0,
    fiveDayReturn: percentFrom(history, 5) ?? 0,
    twentyDayReturn: percentFrom(history, 20) ?? 0,
    sixtyDayReturn: percentFrom(history, 60) ?? 0,
    high20d: high20d ?? current,
    low20d: low20d ?? current,
    high52w: high52w ?? current,
    low52w: low52w ?? current,
    distanceFrom52wHigh: high52w ? round(((current - high52w) / high52w) * 100, 1) : 0,
    distanceFrom52wLow: low52w ? round(((current - low52w) / low52w) * 100, 1) : 0,
    trendLabel: deriveTrendLabel({ ...snapshot, price: current }, history),
    priceHistory30d: history.slice(-30),
    source: "Yahoo Finance",
    updatedAt: snapshot.updatedAt
  };
}

export function mergeLiveStock(mockStock, snapshot) {
  const livePrice = normalizeLiveSnapshot(snapshot);
  if (!livePrice) return mockStock;
  const pricePositionScore = livePrice.twentyDayReturn > 30
    ? 45
    : livePrice.trendLabel === "回測支撐"
      ? 86
      : livePrice.trendLabel === "高檔震盪"
        ? 62
        : livePrice.trendLabel === "強勢上攻"
          ? 72
          : 68;
  const liveAiSortScore = mockStock.scoreBreakdown
    ? Math.round(
      mockStock.relevance * 0.25 +
      mockStock.scoreBreakdown.sourceConsensus * 0.25 +
      mockStock.scoreBreakdown.fundamentals * 0.2 +
      mockStock.scoreBreakdown.technical * 0.15 +
      pricePositionScore * 0.1 +
      mockStock.scoreBreakdown.beginnerRisk * 0.05
    )
    : mockStock.aiSortScore;
  const beginnerFit = livePrice.twentyDayReturn > 30 ? Math.max(35, mockStock.beginnerFit - 12) : mockStock.beginnerFit;

  const mergedFundamentals = {
    ...mockStock.fundamentals,
    eps: snapshot.eps ? `TTM EPS ${round(snapshot.eps, 2)}` : mockStock.fundamentals?.eps,
    pe: snapshot.pe ? `約 ${round(snapshot.pe, 1)} 倍` : mockStock.fundamentals?.pe,
    marketCap: snapshot.marketCap ?? mockStock.fundamentals?.marketCap,
    dividend: snapshot.dividend ?? mockStock.fundamentals?.dividend
  };

  return {
    ...mockStock,
    beginnerFit,
    aiSortScore: liveAiSortScore,
    coachSummary: `${mockStock.reason}${livePrice.twentyDayReturn > 30 ? " 但近 20 日漲幅偏大，研究時要把價格風險放前面。" : ` 目前走勢為「${livePrice.trendLabel}」，適合持續觀察。`}`,
    price: livePrice,
    fundamentals: mergedFundamentals,
    liveFundamentals: {
      marketCap: snapshot.marketCap,
      eps: snapshot.eps,
      pe: snapshot.pe,
      dividend: snapshot.dividend
    },
    liveUpdatedAt: snapshot.updatedAt,
    dataSource: snapshot.yahooSymbol ? `Yahoo Finance ${snapshot.yahooSymbol}` : "Yahoo Finance"
  };
}

async function fetchFromApi(symbols) {
  if (!API_BASE) return {};
  const response = await fetch(`${API_BASE}/api/stocks?symbols=${symbols.join(",")}`);
  if (!response.ok) throw new Error(`API error ${response.status}`);
  const payload = await response.json();
  return payload.stocks || payload.data || {};
}

export async function fetchLiveStocks(symbols) {
  const uniqueSymbols = [...new Set(symbols)];
  try {
    return await fetchFromApi(uniqueSymbols);
  } catch (error) {
    console.warn("Live API stock fetch failed.", error);
    return {};
  }
}
