function makeHistory(start, points) {
  return points.map((close, index) => {
    const date = `6/${String(index + 1).padStart(2, "0")}`;
    const fiveStart = Math.max(0, index - 4);
    const twentyStart = Math.max(0, index - 19);
    const ma5 = Math.round(points.slice(fiveStart, index + 1).reduce((sum, value) => sum + value, 0) / (index - fiveStart + 1));
    const ma20 = Math.round(points.slice(twentyStart, index + 1).reduce((sum, value) => sum + value, 0) / (index - twentyStart + 1));
    const ma60 = Math.round((ma20 * 0.65) + (ma5 * 0.2) + (points[0] * 0.15));
    return { date, close: start ? close : close, ma5, ma20, ma60 };
  });
}

function priceData(current, change, fiveDayReturn, twentyDayReturn, sixtyDayReturn, high20d, low20d, high52w, low52w, trendLabel, seed) {
  const points = Array.from({ length: 30 }, (_, index) => {
    const wave = Math.sin((index + seed) / 2.8) * (current * 0.025);
    const slope = (index - 15) * (twentyDayReturn / 100) * current / 35;
    return Math.round(current - slope + wave - (29 - index) * change / 50);
  });
  const history = makeHistory(current, points);
  return {
    current,
    change,
    changePercent: Number(((change / (current - change)) * 100).toFixed(2)),
    volume: Math.round(4500 + Math.abs(change) * 210 + seed * 837),
    fiveDayReturn,
    twentyDayReturn,
    sixtyDayReturn,
    high20d,
    low20d,
    high52w,
    low52w,
    distanceFrom52wHigh: Number((((current - high52w) / high52w) * 100).toFixed(1)),
    distanceFrom52wLow: Number((((current - low52w) / low52w) * 100).toFixed(1)),
    trendLabel,
    priceHistory30d: history
  };
}

function zones(aggressive, balanced, conservative, trend = "題材仍強，但短線需要看價格位置") {
  return {
    aggressive: { range: aggressive, label: "積極觀察區", suitableFor: "願意承受短線震盪的人", risk: "可能還會回測 20 日均線", reason: trend },
    balanced: { range: balanced, label: "合理觀察區", suitableFor: "一般波段投資人", risk: "若跌破支撐，需重新評估", reason: "接近前波支撐與均線附近" },
    conservative: { range: conservative, label: "保守等待區", suitableFor: "新手或低風險投資人", risk: "可能等不到", reason: "安全邊際較高，但也可能錯過強勢行情" }
  };
}

function stockScoreBreakdown(stock, overrides = {}) {
  return {
    sourceConsensus: overrides.sourceConsensus ?? Math.min(95, stock.aiScore + 4),
    themeHeat: overrides.themeHeat ?? Math.min(96, stock.relevance - 2 + Math.round(stock.aiScore / 12)),
    fundamentals: overrides.fundamentals ?? stock.scores.fundamental,
    technical: overrides.technical ?? stock.scores.technical,
    institutional: overrides.institutional ?? stock.scores.institutional,
    beginnerRisk: overrides.beginnerRisk ?? stock.beginnerFit
  };
}

function aiSortScore(stock) {
  const b = stock.scoreBreakdown;
  const pricePosition = stock.price.twentyDayReturn > 30 ? 50 : stock.price.trendLabel === "回測支撐" ? 84 : stock.price.trendLabel === "高檔震盪" ? 66 : stock.price.trendLabel === "強勢上攻" ? 72 : 62;
  return Math.round(stock.relevance * 0.25 + b.sourceConsensus * 0.25 + b.fundamentals * 0.2 + b.technical * 0.15 + pricePosition * 0.1 + b.beginnerRisk * 0.05);
}

function researchPriorityScore(stock, breakdown) {
  const pricePosition = stock.price.twentyDayReturn > 30 ? 52 : stock.price.trendLabel === "回測支撐" ? 86 : stock.price.trendLabel === "低檔整理" ? 76 : stock.price.trendLabel === "高檔震盪" ? 64 : stock.price.trendLabel === "強勢上攻" ? 70 : 55;
  const maturity = Math.round((stock.relevance + breakdown.themeHeat) / 2);
  return Math.round(breakdown.sourceConsensus * 0.3 + breakdown.fundamentals * 0.25 + maturity * 0.2 + pricePosition * 0.15 + breakdown.beginnerRisk * 0.1);
}

function priorityLabel(score) {
  if (score >= 85) return "優先研究";
  if (score >= 75) return "值得研究";
  if (score >= 65) return "可先觀察";
  if (score >= 55) return "補資料後再看";
  return "新手暫緩";
}

function makeResearchMetrics(stock, breakdown) {
  return {
    heat: { score: breakdown.themeHeat, title: "市場熱度", plain: "最近市場討論多不多", why: `${stock.themes[0]} 仍在熱門題材清單，且與 ${stock.name} 關聯度 ${stock.relevance}。` },
    consensus: { score: breakdown.sourceConsensus, title: "市場共識", plain: "可信來源是否一致", why: `${stock.reason} 來源與題材敘事一致度中上。` },
    maturity: { score: Math.round((stock.relevance + breakdown.themeHeat) / 2), title: "題材成熟度", plain: "剛開始、成長中或成熟", why: `${stock.role} 角色清楚，已能對應到供應鏈位置。` },
    fundamentals: { score: breakdown.fundamentals, title: "基本面支持", plain: "是否有營收、EPS、訂單支持", why: stock.fundamentals?.revenue || "目前仍需追蹤營收與財報。" },
    volatility: { score: breakdown.beginnerRisk, title: "波動風險", plain: "新手是否容易受傷", why: stock.price.twentyDayReturn > 30 ? "近 20 日漲幅偏大，星等被壓低。" : `目前走勢為「${stock.price.trendLabel}」，仍需分批觀察。` }
  };
}

function makeResearchZones(stock) {
  const current = stock.price.current;
  const activeHigh = Math.round(current * 0.995);
  const activeLow = Math.round(current * 0.955);
  const fairHigh = Math.round(current * 1.035);
  const hot = Math.round(current * 1.035);
  return [
    { tone: "green", label: "積極研究區", range: `${activeLow}～${activeHigh}`, suitableFor: "開始建立研究清單，不是買進建議。", reason: ["接近 20MA 或近期整理區", "接近大量區", "估值尚未完全失控", "較容易設定觀察條件"] },
    { tone: "yellow", label: "合理觀察區", range: `${activeHigh}～${fairHigh}`, suitableFor: "仍可分批觀察與補資料。", reason: ["題材沒有變差", "但價格已不算便宜", "適合等更多來源確認"] },
    { tone: "red", label: "偏熱區", range: `${hot} 以上`, suitableFor: "只適合追蹤，不適合新手急著布局。", reason: ["風險報酬下降", "若消息不如預期容易震盪", "需要更高安全邊際"] }
  ];
}

function makeFairValue(stock) {
  const target = Math.round(stock.price.current * (stock.aiScore >= 82 ? 1.14 : stock.aiScore >= 72 ? 1.08 : 1.02));
  const low = Math.round(target * 0.9);
  const high = Math.round(target * 1.06);
  const position = stock.price.current < low ? "低估" : stock.price.current > high ? "偏高" : "合理";
  return {
    analystTarget: target,
    range: `${low}～${high}`,
    position,
    reason: position === "偏高"
      ? "題材仍好，但目前價格已反映較多期待，需要更高基本面證據。"
      : position === "低估"
        ? "價格低於合理估值區，若基本面沒有轉弱，研究價值會提高。"
        : "目前大致落在合理估值區，重點是觀察營收與題材共識是否延續。"
  };
}

function makeSafetyMargin(stock, fairValue) {
  const score = fairValue.position === "低估" ? 86 : fairValue.position === "合理" ? 74 : 58;
  const near = stock.entryZones?.balanced?.range?.split("～")[0] || Math.round(stock.price.current * 0.94);
  return {
    score,
    note: `如果跌到 ${near} 附近，安全邊際會提高。`,
    reasons: ["PE 下降", "更接近支撐", "估值較合理", "較容易分批觀察"]
  };
}

function makeScenarios() {
  return [
    { title: "如果跌 5%", value: "↑↑", reason: "更接近合理估值與觀察區，研究價值提高，但要確認基本面沒有變差。" },
    { title: "如果漲 10%", value: "↓↓", reason: "市場可能提前反映題材，風險報酬下降，新手更適合等拉回。" },
    { title: "如果跌破重要支撐", value: "重新確認", reason: "不要只因為便宜就研究，需檢查營收、法人與題材共識是否改變。" }
  ];
}

function makeLearning(stock) {
  const firstTheme = stock.themeIds[0];
  const map = {
    "mlcc-passive": ["MLCC 是什麼？", "AI Server 為什麼需要 MLCC？", "法說會要看什麼？", "EPS 怎麼看？"],
    abf: ["ABF 載板是什麼？", "CoWoS 如何影響載板需求？", "先進封裝供應鏈怎麼看？"],
    "power-supply": ["AI Server 耗電在哪？", "Power 供應鏈怎麼看？", "資料中心能源效率為什麼重要？"],
    "pcb-ccl": ["CCL 和 PCB 差在哪？", "高速訊號為什麼提高板材價值？", "AI Server 板材升級看什麼？"],
    thermal: ["散熱為什麼是 AI Server 剛需？", "液冷和氣冷差在哪？", "熱門股追高風險怎麼看？"],
    asic: ["ASIC 是什麼？", "NRE 和量產差在哪？", "高估值股票怎麼看風險？"]
  };
  return map[firstTheme] || [`${stock.themes[0]} 是什麼？`, "題材如何連到營收？", "價格位置怎麼看？"];
}

function makeWatchZones(stock) {
  const watchPrice = Math.round(stock.price.current * 0.94);
  return [
    `跌到 ${watchPrice} 附近通知`,
    "研究優先度提高通知",
    "法人連買通知",
    "股癌再次提到通知",
    "Fed 降息通知",
    "費半突破通知",
    "題材共識改變通知"
  ];
}

function enrich(stock, scoreOverrides = {}) {
  const scoreBreakdown = stockScoreBreakdown(stock, scoreOverrides);
  const adjustedBeginnerFit = stock.price.twentyDayReturn > 30 ? Math.max(35, stock.beginnerFit - 12) : stock.beginnerFit;
  const enriched = {
    ...stock,
    beginnerFit: adjustedBeginnerFit,
    scoreBreakdown,
    maxRisk: stock.maxRisk || "題材轉弱或短線漲多時，股價可能快速回測均線。",
    suitableFor: stock.suitableFor || "想先從題材與基本面交叉驗證的新手投資人。",
    scoreReason: stock.scoreReason || `題材關聯度 ${stock.relevance}，來源與基本面支持度中上，但仍需搭配價格位置判斷。`
  };
  const researchPriority = researchPriorityScore(enriched, scoreBreakdown);
  const fairValue = makeFairValue(enriched);
  return {
    ...enriched,
    aiSortScore: aiSortScore(enriched),
    researchPriority,
    researchPriorityLabel: priorityLabel(researchPriority),
    researchPriorityReason: researchPriority >= 85 ? "今天如果只能研究五檔股票，它會排在前五。" : "值得放進觀察清單，但要先看價格與風險。",
    researchMetrics: makeResearchMetrics(enriched, scoreBreakdown),
    coachSummary: `${stock.reason}${stock.price.twentyDayReturn > 30 ? " 但短線漲幅偏大。" : " 目前適合用研究清單追蹤。"}`,
    todayReason: `因為 ${stock.themes[0]} 題材、法人觀點、來源共識與近期價格位置同時值得追蹤。`,
    learningTopics: makeLearning(stock),
    researchZones: makeResearchZones(enriched),
    fairValue,
    safetyMargin: makeSafetyMargin(enriched, fairValue),
    scenarios: makeScenarios(enriched),
    watchZones: makeWatchZones(enriched)
  };
}

const baseStocks = [
  {
    id: "2327",
    name: "國巨",
    code: "2327",
    themes: ["MLCC / 被動元件", "AI Server"],
    themeIds: ["mlcc-passive", "ai-server"],
    relevance: 92,
    aiScore: 86,
    beginnerFit: 84,
    status: "可研究",
    decision: "可優先研究",
    role: "龍頭",
    reason: "高階 MLCC 與電阻需求回溫，來源共識高且基本面較容易追蹤。",
    maxRisk: "短線漲幅已大，族群輪動時容易高檔震盪。",
    suitableFor: "想研究 AI 第二波，但不想碰太小型股票的新手。",
    fundamentals: { revenue: "年增 12.8%，高階品項占比提升", eps: "近四季 EPS 34.2 元", pe: "約 18 倍", grossMargin: "35.6%", roe: "16.4%", demand: "AI Server、車用與工控需求同步復甦" },
    scores: { fundamental: 85, technical: 76, institutional: 82, volatility: "中", beginner: 78 },
    price: priceData(1065, -60, -8.2, 18.5, 36.4, 1160, 910, 1160, 420, "高檔震盪", 1),
    entryZones: zones("1050～1080", "1000～1050", "950～1000", "題材仍強，但短線修正中"),
    technical: { overheated: "短線接近高檔區，追價需保守", support: "回測 20 日均線可觀察承接", volume: "量能溫和放大", range: "高檔震盪", chase: "不建議連續長紅後追價" },
    institutional: { buying: "外資近五日小幅買超", target: "部分券商維持偏多目標價", view: "偏多", flow: "資金流入被動元件與 AI 零組件" },
    conclusion: "適合作為 MLCC 題材的第一檔研究標的，但進場節奏要分批。",
    strategies: {
      longTerm: { fit: "中高", reason: "龍頭地位與高階產品組合較穩", risk: "景氣循環與匯率影響毛利", method: "分批建立研究部位，追蹤月營收與法說會" },
      swing: { fit: "中", enter: "等待拉回", observe: "月線附近與量縮止跌", risk: "若跌破整理區需降低假設" },
      intraday: { fit: "低", novice: "不適合新手", volume: "成交量足夠但波動不小", risk: "新手不建議當沖" },
      dca: { fit: "可考慮", reason: "產業龍頭且財務透明度較高" }
    },
    timeline: [
      { date: "06/20", event: "高階 MLCC 交期討論增加", change: "+3", reason: "題材關聯度提高" },
      { date: "06/21", event: "法人報告提到 AI Server 用量", change: "+4", reason: "A 級來源納入評分" },
      { date: "06/22", event: "股價短線放量", change: "+1", reason: "技術分數改善但風險上升" },
      { date: "06/23", event: "市場轉向高共識零組件", change: "+2", reason: "資金輪動有利" },
      { date: "06/24", event: "社群討論熱度升高", change: "0", reason: "C 級重點整理不直接拉高分數" },
      { date: "06/25", event: "同族群整理", change: "-1", reason: "短線過熱降溫" },
      { date: "06/26", event: "維持可研究狀態", change: "+1", reason: "基本面假設未改變" }
    ]
  },
  {
    id: "2492",
    name: "華新科",
    code: "2492",
    themes: ["MLCC / 被動元件"],
    themeIds: ["mlcc-passive"],
    relevance: 86,
    aiScore: 78,
    beginnerFit: 76,
    status: "等待拉回",
    decision: "等待拉回",
    role: "補漲",
    reason: "被動元件復甦受惠明確，但股價容易受族群輪動影響。",
    maxRisk: "若被動元件族群降溫，補漲股修正速度可能比龍頭快。",
    suitableFor: "能接受波段震盪、想研究被動元件第二線標的的人。",
    fundamentals: { revenue: "月營收回升", eps: "獲利改善中", pe: "約 22 倍", grossMargin: "24.8%", roe: "9.8%", demand: "消費電子落底與 AI 周邊需求回補" },
    scores: { fundamental: 74, technical: 68, institutional: 71, volatility: "中", beginner: 76 },
    price: priceData(132, -3.5, -4.1, 12.4, 24.6, 142, 114, 156, 81, "回測支撐", 2),
    entryZones: zones("128～134", "120～128", "112～120"),
    technical: { overheated: "短線略熱", support: "回測季線較健康", volume: "題材日放量", range: "區間偏上", chase: "等拉回較適合" },
    institutional: { buying: "投信偏觀望", target: "目標價調整有限", view: "中立偏多", flow: "族群資金輪動" },
    conclusion: "適合研究被動元件復甦，但不是最穩的新手第一選擇。"
  },
  { id: "6173", name: "信昌電", code: "6173", themes: ["MLCC / 被動元件"], themeIds: ["mlcc-passive"], relevance: 74, aiScore: 69, beginnerFit: 58, status: "波動過大", decision: "波動過大", role: "利基型", reason: "題材關聯度不低，但籌碼與波動較不適合新手。", maxRisk: "小型股流動性與籌碼波動較大。", suitableFor: "熟悉族群輪動、能控制部位的人。", scores: { fundamental: 62, technical: 65, institutional: 52, volatility: "高", beginner: 58 }, price: priceData(62, 1.8, 7.4, 28.2, 18.1, 66, 48, 74, 35, "強勢上攻", 3), entryZones: zones("59～62", "54～59", "49～54") },
  { id: "3236", name: "千如", code: "3236", themes: ["MLCC / 被動元件"], themeIds: ["mlcc-passive"], relevance: 61, aiScore: 57, beginnerFit: 42, status: "暫時觀望", decision: "暫時避開", role: "利基型", reason: "小型股波動大，來源共識不足。", maxRisk: "資訊透明度不足，題材退潮時容易急跌。", suitableFor: "不適合新手，僅適合熟悉小型股的人觀察。", scores: { fundamental: 54, technical: 48, institutional: 39, volatility: "高", beginner: 42 }, price: priceData(30.5, -1.2, -6.8, 9.1, 4.2, 35, 27, 46, 21, "轉弱", 4), entryZones: zones("29～31", "26～29", "23～26") },
  { id: "6127", name: "九豪", code: "6127", themes: ["MLCC / 被動元件"], themeIds: ["mlcc-passive"], relevance: 55, aiScore: 51, beginnerFit: 38, status: "暫時觀望", decision: "暫時避開", role: "高波動股", reason: "受題材帶動但基本面驗證不足。", maxRisk: "題材不明確且流動性風險高。", suitableFor: "暫不適合新手。", scores: { fundamental: 47, technical: 51, institutional: 32, volatility: "高", beginner: 38 }, price: priceData(22.4, -0.4, -2.1, 4.8, -7.2, 25, 20, 39, 16, "低檔整理", 5), entryZones: zones("21～22.5", "19～21", "17～19") },
  { id: "2344", name: "華邦電", code: "2344", themes: ["記憶體"], themeIds: ["memory"], relevance: 82, aiScore: 73, beginnerFit: 70, status: "可研究", decision: "可觀察", role: "循環股", reason: "記憶體報價復甦可追蹤，但需理解景氣循環。", maxRisk: "記憶體報價若反覆，股價容易跟著修正。", suitableFor: "想學循環股與報價追蹤的新手。", scores: { fundamental: 70, technical: 69, institutional: 66, volatility: "中", beginner: 70 }, price: priceData(28.3, 0.65, 4.6, 10.2, 16.3, 30.2, 24.5, 34.8, 19.2, "強勢上攻", 6), entryZones: zones("27.5～28.5", "26～27.5", "24～26") },
  { id: "8261", name: "富鼎", code: "8261", themes: ["MOSFET / 功率半導體", "AI Server"], themeIds: ["mosfet-power", "ai-server"], relevance: 80, aiScore: 72, beginnerFit: 62, status: "等待拉回", decision: "等待拉回", role: "利基型", reason: "AI 電源題材受惠，但功率元件復甦仍需確認。", maxRisk: "功率元件報價未確認前，題材支撐可能不足。", suitableFor: "可接受中高波動、願意追蹤庫存與報價的人。", scores: { fundamental: 68, technical: 70, institutional: 58, volatility: "中高", beginner: 62 }, price: priceData(96, -2.1, -1.8, 16.7, 25.4, 104, 82, 118, 58, "回測支撐", 7), entryZones: zones("92～97", "85～92", "78～85") },
  { id: "5299", name: "杰力", code: "5299", themes: ["MOSFET / 功率半導體"], themeIds: ["mosfet-power"], relevance: 77, aiScore: 70, beginnerFit: 59, status: "波動過大", decision: "波動過大", role: "高波動股", reason: "題材明確但中小型股波動較高。", maxRisk: "短線漲跌容易被籌碼放大。", suitableFor: "進階投資人小部位研究。", scores: { fundamental: 64, technical: 72, institutional: 55, volatility: "高", beginner: 59 }, price: priceData(153, 6.5, 11.2, 34.8, 42.5, 156, 110, 168, 82, "強勢上攻", 8), entryZones: zones("145～155", "132～145", "120～132") },
  { id: "3317", name: "尼克森", code: "3317", themes: ["MOSFET / 功率半導體"], themeIds: ["mosfet-power"], relevance: 70, aiScore: 63, beginnerFit: 52, status: "暫時觀望", decision: "暫時避開", role: "補漲", reason: "需要更多基本面與法人來源支持。", maxRisk: "來源共識不足，補漲題材可能退潮。", suitableFor: "熟悉功率半導體族群的人。", scores: { fundamental: 56, technical: 61, institutional: 44, volatility: "高", beginner: 52 }, price: priceData(48.2, -0.8, -3.2, 6.4, 2.1, 54, 43, 72, 31, "低檔整理", 9), entryZones: zones("46～49", "42～46", "38～42") },
  { id: "6435", name: "大中", code: "6435", themes: ["MOSFET / 功率半導體"], themeIds: ["mosfet-power"], relevance: 68, aiScore: 61, beginnerFit: 50, status: "暫時觀望", decision: "暫時避開", role: "高波動股", reason: "族群連動明顯，但新手不宜先碰高波動標的。", maxRisk: "短線波動大且基本面驗證不足。", suitableFor: "暫不適合新手。", scores: { fundamental: 58, technical: 53, institutional: 42, volatility: "高", beginner: 50 }, price: priceData(88, -3.2, -9.1, -2.4, 8.9, 101, 82, 136, 61, "轉弱", 10), entryZones: zones("84～89", "78～84", "72～78") },
  { id: "3661", name: "世芯", code: "3661", themes: ["ASIC", "AI Server"], themeIds: ["asic", "ai-server", "us-ai-chain", "rate-cut"], relevance: 94, aiScore: 84, beginnerFit: 48, status: "波動過大", decision: "波動過大", role: "龍頭", reason: "ASIC 龍頭研究價值高，但股價與估值波動不適合新手重押。", maxRisk: "估值高、客戶消息敏感，單日波動可能很大。", suitableFor: "有經驗且能承受高波動的人。", scores: { fundamental: 86, technical: 63, institutional: 82, volatility: "高", beginner: 48 }, price: priceData(3420, -120, -7.6, 31.5, 44.2, 3780, 2580, 4200, 1620, "高檔震盪", 11), entryZones: zones("3300～3450", "3050～3300", "2800～3050") },
  { id: "3443", name: "創意", code: "3443", themes: ["ASIC", "AI Server"], themeIds: ["asic", "ai-server", "rate-cut"], relevance: 88, aiScore: 79, beginnerFit: 55, status: "等待拉回", decision: "等待拉回", role: "補漲", reason: "ASIC 題材純度高，但需追蹤客戶案量與評價。", maxRisk: "客戶案量或量產時程若不如預期，評價會修正。", suitableFor: "願意研究 ASIC 但不想只看龍頭的人。", scores: { fundamental: 78, technical: 66, institutional: 76, volatility: "高", beginner: 55 }, price: priceData(1685, -45, -3.8, 22.6, 33.1, 1840, 1380, 2050, 910, "回測支撐", 12), entryZones: zones("1620～1700", "1500～1620", "1380～1500") },
  { id: "2383", name: "台光電", code: "2383", themes: ["PCB / CCL", "AI Server"], themeIds: ["pcb-ccl", "ai-server", "us-ai-chain"], relevance: 92, aiScore: 88, beginnerFit: 80, status: "可研究", decision: "可優先研究", role: "龍頭", reason: "AI Server 高階 CCL 供應鏈代表性高，來源共識強。", maxRisk: "若美股 AI 或費半轉弱，熱門高階板材股容易跟跌。", suitableFor: "想研究 AI 供應鏈且偏好高共識龍頭的人。", scores: { fundamental: 88, technical: 78, institutional: 84, volatility: "中", beginner: 80 }, price: priceData(690, 18, 6.2, 19.6, 48.3, 710, 570, 748, 298, "強勢上攻", 13), entryZones: zones("670～700", "620～670", "570～620") },
  { id: "6274", name: "台燿", code: "6274", themes: ["PCB / CCL", "AI Server"], themeIds: ["pcb-ccl", "ai-server"], relevance: 86, aiScore: 82, beginnerFit: 74, status: "等待拉回", decision: "等待拉回", role: "補漲", reason: "高階板材需求受惠，但短線位階需留意。", maxRisk: "族群漲多後若量縮失守支撐，容易拉回。", suitableFor: "能等待價格位置、想研究高階板材第二線的人。", scores: { fundamental: 80, technical: 73, institutional: 77, volatility: "中", beginner: 74 }, price: priceData(312, -9, -4.8, 21.5, 39.6, 338, 252, 360, 151, "高檔震盪", 14), entryZones: zones("300～315", "275～300", "250～275") },
  { id: "3017", name: "奇鋐", code: "3017", themes: ["散熱", "AI Server"], themeIds: ["thermal", "ai-server", "us-ai-chain", "rate-cut"], relevance: 90, aiScore: 85, beginnerFit: 68, status: "等待拉回", decision: "等待拉回", role: "龍頭", reason: "散熱升級受惠明確，但熱門股追價風險較高。", maxRisk: "近 20 日漲幅偏大，若 AI 題材降溫會先修正。", suitableFor: "能接受熱門股震盪、願意等拉回的人。", scores: { fundamental: 84, technical: 70, institutional: 82, volatility: "中高", beginner: 68 }, price: priceData(895, 22, 9.3, 33.4, 58.6, 918, 660, 945, 388, "強勢上攻", 15), entryZones: zones("860～900", "790～860", "720～790") },
  { id: "3324", name: "雙鴻", code: "3324", themes: ["散熱", "AI Server"], themeIds: ["thermal", "ai-server"], relevance: 84, aiScore: 79, beginnerFit: 64, status: "等待拉回", decision: "等待拉回", role: "補漲", reason: "散熱需求支撐，但波動與估值需保守看待。", maxRisk: "散熱族群若由強轉弱，補漲股容易震盪。", suitableFor: "熟悉散熱族群、能分批觀察的人。", scores: { fundamental: 76, technical: 69, institutional: 74, volatility: "中高", beginner: 64 }, price: priceData(790, -18, -2.2, 17.8, 41.5, 850, 650, 890, 330, "回測支撐", 16), entryZones: zones("760～800", "700～760", "640～700") },
  { id: "3037", name: "欣興", code: "3037", themes: ["ABF 載板", "AI Server"], themeIds: ["abf", "ai-server"], relevance: 82, aiScore: 76, beginnerFit: 70, status: "可研究", decision: "可觀察", role: "龍頭", reason: "ABF 與高階 PCB 具 AI/HPC 受惠想像，但供需需驗證。", maxRisk: "載板景氣若復甦不如預期，股價會回到循環評價。", suitableFor: "想研究先進封裝材料、可接受循環波動的人。", scores: { fundamental: 74, technical: 71, institutional: 69, volatility: "中", beginner: 70 }, price: priceData(184, 4.5, 5.8, 13.6, 20.4, 192, 158, 224, 122, "強勢上攻", 17), entryZones: zones("178～186", "165～178", "150～165") },
  { id: "3189", name: "景碩", code: "3189", themes: ["ABF 載板"], themeIds: ["abf"], relevance: 76, aiScore: 71, beginnerFit: 66, status: "可觀察", decision: "可觀察", role: "補漲", reason: "載板復甦受惠，但需要更多營收證據。", maxRisk: "題材有機會但基本面復甦斜率不明。", suitableFor: "想研究 ABF 循環復甦的人。", scores: { fundamental: 68, technical: 69, institutional: 61, volatility: "中", beginner: 66 }, price: priceData(112, -1.5, 1.8, 9.8, 12.4, 120, 96, 146, 78, "回測支撐", 18), entryZones: zones("108～114", "100～108", "92～100") },
  { id: "8046", name: "南電", code: "8046", themes: ["ABF 載板"], themeIds: ["abf"], relevance: 73, aiScore: 68, beginnerFit: 63, status: "可觀察", decision: "可觀察", role: "循環股", reason: "ABF 題材受惠，但仍需追蹤產能利用率與報價。", maxRisk: "循環復甦若延後，股價可能整理較久。", suitableFor: "願意等基本面確認的人。", scores: { fundamental: 66, technical: 63, institutional: 59, volatility: "中", beginner: 63 }, price: priceData(182, -5, -4.2, 6.5, 15.1, 198, 165, 258, 130, "低檔整理", 19), entryZones: zones("176～184", "164～176", "150～164") },
  { id: "2368", name: "金像電", code: "2368", themes: ["PCB / CCL", "AI Server"], themeIds: ["pcb-ccl", "ai-server"], relevance: 82, aiScore: 77, beginnerFit: 68, status: "等待拉回", decision: "等待拉回", role: "補漲", reason: "AI PCB 題材關聯度高，但波動較龍頭大。", maxRisk: "熱門 PCB 族群若修正，補漲股承壓。", suitableFor: "有波段經驗、想研究 PCB 第二線的人。", scores: { fundamental: 74, technical: 72, institutional: 68, volatility: "中高", beginner: 68 }, price: priceData(252, 7.5, 8.9, 29.8, 52.1, 262, 194, 278, 118, "強勢上攻", 20), entryZones: zones("242～255", "220～242", "200～220") },
  { id: "3044", name: "健鼎", code: "3044", themes: ["PCB / CCL"], themeIds: ["pcb-ccl"], relevance: 72, aiScore: 69, beginnerFit: 69, status: "可觀察", decision: "可觀察", role: "穩健型", reason: "PCB 基本盤穩定，但 AI 題材純度不如高階 CCL。", maxRisk: "若 AI 題材偏好高純度標的，資金可能不集中。", suitableFor: "偏好穩健 PCB 研究的人。", scores: { fundamental: 70, technical: 64, institutional: 61, volatility: "中", beginner: 69 }, price: priceData(226, 1, 2.2, 7.1, 16.4, 232, 202, 245, 156, "低檔整理", 21), entryZones: zones("220～228", "208～220", "196～208") },
  { id: "2421", name: "建準", code: "2421", themes: ["散熱"], themeIds: ["thermal"], relevance: 70, aiScore: 67, beginnerFit: 60, status: "可觀察", decision: "可觀察", role: "利基型", reason: "風扇與散熱題材有關，但 AI 純度需確認。", maxRisk: "若產品規格升級不明顯，題材支撐有限。", suitableFor: "想比較散熱族群不同角色的人。", scores: { fundamental: 63, technical: 66, institutional: 55, volatility: "中高", beginner: 60 }, price: priceData(126, 2.2, 6.1, 14.2, 20.8, 132, 108, 168, 82, "強勢上攻", 22), entryZones: zones("121～128", "112～121", "104～112") },
  { id: "3483", name: "力致", code: "3483", themes: ["散熱"], themeIds: ["thermal"], relevance: 68, aiScore: 64, beginnerFit: 55, status: "波動過大", decision: "波動過大", role: "利基型", reason: "散熱題材帶動但波動較高。", maxRisk: "熱門題材降溫時小型股修正較快。", suitableFor: "進階投資人觀察。", scores: { fundamental: 60, technical: 68, institutional: 52, volatility: "高", beginner: 55 }, price: priceData(176, -8, -8.5, 24.4, 30.2, 198, 142, 236, 96, "高檔震盪", 23), entryZones: zones("168～178", "152～168", "138～152") },
  { id: "2308", name: "台達電", code: "2308", themes: ["電源供應器", "AI Server", "匯率受惠股"], themeIds: ["power-supply", "ai-server", "fx-benefit"], relevance: 84, aiScore: 82, beginnerFit: 82, status: "可研究", decision: "可優先研究", role: "龍頭", reason: "電源與能源管理龍頭，AI 機櫃耗電提升受惠明確。", maxRisk: "大型權值股漲幅通常較穩，但短線仍受外資與匯率影響。", suitableFor: "偏好大型龍頭、想穩健研究 AI 基礎設施的人。", scores: { fundamental: 86, technical: 75, institutional: 82, volatility: "中", beginner: 82 }, price: priceData(512, 6, 3.2, 12.1, 27.8, 525, 455, 568, 302, "強勢上攻", 24), entryZones: zones("500～515", "470～500", "440～470") },
  { id: "2301", name: "光寶科", code: "2301", themes: ["電源供應器", "AI Server"], themeIds: ["power-supply", "ai-server"], relevance: 74, aiScore: 72, beginnerFit: 73, status: "可觀察", decision: "可觀察", role: "穩健型", reason: "電源與雲端需求受惠，但 AI 純度需細看產品結構。", maxRisk: "若市場只追高純度 AI，資金集中度可能較弱。", suitableFor: "想研究較穩健 AI 電源供應鏈的人。", scores: { fundamental: 74, technical: 67, institutional: 68, volatility: "中", beginner: 73 }, price: priceData(118, -1.5, -1.4, 6.7, 11.8, 126, 108, 148, 82, "低檔整理", 25), entryZones: zones("115～120", "108～115", "100～108") },
  { id: "6412", name: "群電", code: "6412", themes: ["電源供應器"], themeIds: ["power-supply"], relevance: 70, aiScore: 68, beginnerFit: 66, status: "可觀察", decision: "可觀察", role: "利基型", reason: "電源供應題材相關，但需確認 AI Server 實際貢獻。", maxRisk: "若營收沒有跟上題材，評價會回落。", suitableFor: "可接受中等波動、願意追營收的人。", scores: { fundamental: 66, technical: 64, institutional: 58, volatility: "中", beginner: 66 }, price: priceData(148, 2.5, 3.9, 8.8, 9.4, 154, 132, 188, 102, "回測支撐", 26), entryZones: zones("144～150", "136～144", "128～136") },
  { id: "3665", name: "貿聯-KY", code: "3665", themes: ["高速傳輸", "連接器", "AI Server"], themeIds: ["high-speed", "connector", "ai-server"], relevance: 82, aiScore: 78, beginnerFit: 67, status: "等待拉回", decision: "等待拉回", role: "利基型", reason: "高速傳輸與線束受 AI Server 帶動，但短線位階需留意。", maxRisk: "題材與匯率、美股 AI 情緒連動，波動不低。", suitableFor: "想研究 AI 高速傳輸與連接器的人。", scores: { fundamental: 76, technical: 72, institutional: 70, volatility: "中高", beginner: 67 }, price: priceData(492, 16, 7.8, 26.2, 44.8, 505, 390, 545, 220, "強勢上攻", 27), entryZones: zones("475～500", "430～475", "390～430") },
  { id: "3023", name: "信邦", code: "3023", themes: ["連接器"], themeIds: ["connector"], relevance: 70, aiScore: 69, beginnerFit: 71, status: "可觀察", decision: "可觀察", role: "穩健型", reason: "連接器與線束基本盤穩定，AI 純度需再確認。", maxRisk: "如果 AI 連接器貢獻有限，題材彈性較低。", suitableFor: "偏好穩健零組件的人。", scores: { fundamental: 72, technical: 62, institutional: 63, volatility: "中", beginner: 71 }, price: priceData(315, -4, -1.8, 4.5, 10.2, 330, 292, 368, 226, "低檔整理", 28), entryZones: zones("305～318", "288～305", "270～288") },
  { id: "3217", name: "優群", code: "3217", themes: ["連接器"], themeIds: ["connector"], relevance: 66, aiScore: 62, beginnerFit: 54, status: "暫時觀望", decision: "暫時避開", role: "利基型", reason: "連接器題材有想像，但來源與基本面支撐不足。", maxRisk: "小型題材股波動高。", suitableFor: "不適合新手優先研究。", scores: { fundamental: 58, technical: 60, institutional: 45, volatility: "高", beginner: 54 }, price: priceData(188, -6, -5.5, 11.8, 18.4, 210, 166, 260, 122, "轉弱", 29), entryZones: zones("180～190", "165～180", "150～165") },
  { id: "5269", name: "祥碩", code: "5269", themes: ["高速傳輸"], themeIds: ["high-speed", "ai-server"], relevance: 72, aiScore: 70, beginnerFit: 56, status: "波動過大", decision: "波動過大", role: "高波動股", reason: "高速介面題材有關，但股價與估值波動較大。", maxRisk: "高價股波動大，且題材純度需確認。", suitableFor: "進階投資人研究。", scores: { fundamental: 70, technical: 64, institutional: 66, volatility: "高", beginner: 56 }, price: priceData(1780, -70, -6.1, 15.4, 22.5, 1960, 1510, 2460, 1020, "高檔震盪", 30), entryZones: zones("1700～1800", "1550～1700", "1400～1550") },
  { id: "6104", name: "創惟", code: "6104", themes: ["高速傳輸"], themeIds: ["high-speed"], relevance: 64, aiScore: 58, beginnerFit: 42, status: "暫時觀望", decision: "暫時避開", role: "高波動股", reason: "高速傳輸想像存在，但資料與共識不足。", maxRisk: "題材不明確且波動較高。", suitableFor: "暫不適合新手。", scores: { fundamental: 52, technical: 58, institutional: 40, volatility: "高", beginner: 42 }, price: priceData(132, 5.5, 12.2, 38.6, 18.9, 138, 90, 172, 72, "強勢上攻", 31), entryZones: zones("126～134", "112～126", "98～112") }
];

export const stocks = baseStocks.map((stock) => enrich(stock));
