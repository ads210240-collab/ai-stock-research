export function getScoreGuide(score) {
  if (score >= 90) {
    return {
      level: "極高",
      tone: "blue",
      explanation: "代表市場共識強、來源多、題材熱度高，但也可能短線過熱。"
    };
  }
  if (score >= 80) {
    return {
      level: "偏高",
      tone: "emerald",
      explanation: "代表值得研究，已有多個可信來源支持，但仍需注意估值與波動。"
    };
  }
  if (score >= 70) {
    return {
      level: "中上",
      tone: "amber",
      explanation: "代表有題材或基本面支撐，但共識還沒完全形成，適合觀察或小部位研究。"
    };
  }
  if (score >= 60) {
    return {
      level: "普通",
      tone: "slate",
      explanation: "代表有討論度，但資料不足、共識不強，暫時不適合重點研究。"
    };
  }
  if (score >= 50) {
    return {
      level: "偏弱",
      tone: "rose",
      explanation: "代表題材不明確或風險偏高。"
    };
  }
  return {
    level: "不建議新手研究",
    tone: "rose",
    explanation: "代表資訊不足、波動過大或缺乏基本面支持。"
  };
}

export function starsFromScore(score) {
  const value = Number(score) || 0;
  if (value >= 85) return 5;
  if (value >= 75) return 4;
  if (value >= 65) return 3;
  if (value >= 55) return 2;
  return 1;
}

export function starString(score) {
  const stars = starsFromScore(score);
  return "★★★★★".slice(0, stars) + "☆☆☆☆☆".slice(0, 5 - stars);
}

export function priorityLabel(score) {
  if (score >= 85) return "優先研究";
  if (score >= 75) return "值得研究";
  if (score >= 65) return "可先觀察";
  if (score >= 55) return "補資料後再看";
  return "新手暫緩";
}

export function priorityOneLiner(score) {
  if (score >= 85) return "今天如果只能研究五檔股票，它會排在前五。";
  if (score >= 75) return "值得放進今天的研究清單，但價格位置要一起看。";
  if (score >= 65) return "可以先觀察題材與來源是否繼續升溫。";
  if (score >= 55) return "目前資料還不夠完整，不適合作為今天主線。";
  return "新手今天先跳過，等來源和基本面更清楚。";
}

export function metricNarrative(metric, score, context = "") {
  const stars = starString(score);
  const level = priorityLabel(score);
  const base = {
    heat: "最近市場討論熱度與資金注意力。",
    consensus: "可信來源是否一致，而不是社群聲量大不大。",
    maturity: "題材是剛開始、成長中，還是已經成熟反映。",
    fundamentals: "是否有營收、EPS、訂單或法人報告支持。",
    volatility: "風險越低越適合新手，星等越高代表越不容易受傷。"
  }[metric] || "研究指標";
  return { stars, level, text: context || base };
}

export function decisionTone(label) {
  if (label === "可優先研究") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (label === "可觀察") return "bg-blue-50 text-blue-700 border-blue-200";
  if (label === "等待拉回") return "bg-amber-50 text-amber-800 border-amber-200";
  if (label === "波動過大") return "bg-orange-50 text-orange-800 border-orange-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

export function decisionExplain(label) {
  const map = {
    可優先研究: "分數高、共識高、風險可控，適合排在研究清單前面。",
    可觀察: "題材有機會，但還需要更多資料確認。",
    等待拉回: "基本面不差，但短線可能偏熱，價格位置要更保守。",
    波動過大: "不適合新手重壓，需降低部位或先觀察。",
    暫時避開: "資訊不足、風險過高或題材不明確。"
  };
  return map[label] || map["可觀察"];
}

export function priceTone(value) {
  if (value > 0) return "text-rose-700";
  if (value < 0) return "text-emerald-700";
  return "text-muted";
}

export function priceExplanation(price) {
  if (!price) return "尚無價格資料，先以題材與來源共識評估。";
  if (price.twentyDayReturn > 30) {
    return "基本面與題材分數高，但近 20 日漲幅偏大，建議等待拉回或只用小部位觀察。";
  }
  if (price.trendLabel === "回測支撐") {
    return "題材與基本面仍偏多，目前進入可觀察區，但仍建議分批，不要一次押滿。";
  }
  if (price.trendLabel === "高檔震盪") {
    return "目前股價接近近期高檔，代表短線偏強，但追價風險較高。";
  }
  if (price.trendLabel === "強勢上攻") {
    return "市場正在重新注意這檔股票，走勢強但也要留意短線過熱。";
  }
  if (price.trendLabel === "轉弱") {
    return "近期走勢轉弱，題材分數再高也應先等止跌訊號。";
  }
  return "目前偏低檔整理，需等待量價轉強或來源共識提高。";
}

export const scoreFormula = [
  ["來源共識", "30%", "可信來源越多、等級越高，分數越高。"],
  ["題材熱度", "20%", "市場討論與資金關注越高，分數越高。"],
  ["基本面支持", "20%", "營收、毛利、需求與產業位置越清楚，分數越高。"],
  ["技術面位置", "15%", "不是只看漲跌，而是看是否過熱、是否接近支撐。"],
  ["法人資金", "10%", "法人買超、券商觀點與題材資金流入。"],
  ["新手風險", "5%", "波動越低、資訊越透明，新手分數越高。"]
];

export const researchPriorityFormula = [
  ["來源共識", "30%", "可信來源是否一致，且是否可追到原始資料。"],
  ["基本面支持", "25%", "營收、EPS、訂單、毛利率或法人報告是否支持。"],
  ["題材成熟度", "20%", "題材是否正在成長，而不是只剩短線炒作。"],
  ["股價位置", "15%", "目前是回測支撐、合理整理，還是短線偏熱。"],
  ["風險調整", "10%", "波動、資訊透明度與新手承受度。"]
];

export const stockSortFormula = [
  ["題材關聯度", "25%"],
  ["來源共識", "25%"],
  ["基本面", "20%"],
  ["技術面", "15%"],
  ["近期股價位置", "10%"],
  ["新手風險", "5%"]
];
