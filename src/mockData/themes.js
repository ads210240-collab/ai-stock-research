const aiServerTree = [
  { segment: "GPU", role: "AI 運算核心，決定伺服器算力需求。", leaders: ["台積電 2330"], beneficiaries: ["緯穎 6669"], catchUp: ["技嘉 2376"], highRisk: ["高價追題材股"] },
  { segment: "ASIC", role: "雲端客戶客製化 AI 晶片，長線需求明確但估值敏感。", leaders: ["世芯 3661"], beneficiaries: ["創意 3443"], catchUp: ["智原 3035"], highRisk: ["單一客戶依賴高"] },
  { segment: "CoWoS", role: "先進封裝讓高階 AI 晶片能整合更多運算與記憶體。", leaders: ["台積電 2330"], beneficiaries: ["辛耘 3583"], catchUp: ["弘塑 3131"], highRisk: ["設備題材追高"] },
  { segment: "ABF", role: "高階晶片封裝承載材料，AI/HPC 晶片越大越重要。", leaders: ["欣興 3037"], beneficiaries: ["景碩 3189"], catchUp: ["南電 8046"], highRisk: ["循環復甦未確認"] },
  { segment: "PCB", role: "AI Server 板層提升，PCB 單機價值增加。", leaders: ["金像電 2368"], beneficiaries: ["健鼎 3044"], catchUp: ["台燿 6274"], highRisk: ["漲多補漲股"] },
  { segment: "CCL", role: "高速訊號需要更高階板材，供需與良率是重點。", leaders: ["台光電 2383"], beneficiaries: ["台燿 6274"], catchUp: ["聯茂 6213"], highRisk: ["高估值追價"] },
  { segment: "散熱", role: "AI 晶片功耗提高，散熱模組與液冷規格升級。", leaders: ["奇鋐 3017"], beneficiaries: ["雙鴻 3324"], catchUp: ["建準 2421"], highRisk: ["力致 3483"] },
  { segment: "Power", role: "伺服器耗電提升，電源供應與轉換效率成為關鍵。", leaders: ["台達電 2308"], beneficiaries: ["光寶科 2301"], catchUp: ["群電 6412"], highRisk: ["低純度電源股"] },
  { segment: "MOSFET", role: "電源轉換與穩壓零件，受伺服器電力架構升級帶動。", leaders: ["富鼎 8261"], beneficiaries: ["杰力 5299"], catchUp: ["尼克森 3317"], highRisk: ["大中 6435"] },
  { segment: "MLCC", role: "穩定電壓與訊號品質，高階伺服器用量增加。", leaders: ["國巨 2327"], beneficiaries: ["華新科 2492"], catchUp: ["信昌電 6173"], highRisk: ["千如 3236"] },
  { segment: "高速傳輸", role: "晶片、板卡與伺服器之間高速資料流動的介面。", leaders: ["貿聯-KY 3665"], beneficiaries: ["祥碩 5269"], catchUp: ["創惟 6104"], highRisk: ["低驗證概念股"] },
  { segment: "Connector", role: "伺服器內外部訊號與電源連接，規格升級提高門檻。", leaders: ["貿聯-KY 3665"], beneficiaries: ["信邦 3023"], catchUp: ["優群 3217"], highRisk: ["AI 純度不足"] },
  { segment: "Memory", role: "AI 訓練與推論需要大量記憶體與儲存頻寬。", leaders: ["華邦電 2344"], beneficiaries: ["南亞科 2408"], catchUp: ["旺宏 2337"], highRisk: ["報價循環轉弱"] }
];

const macroBase = [
  { factor: "Fed", now: "降息預期升溫", impact: "通常有利 AI、半導體、高估值科技股。", themes: ["AI Server", "ASIC", "降息受惠題材"], stocks: ["世芯", "創意", "奇鋐"], plain: "錢變便宜時，市場比較願意給成長股高評價。" },
  { factor: "美元", now: "偏強整理", impact: "出口股短期可能受惠，但匯率反轉會影響毛利。", themes: ["匯率受惠股", "PCB / CCL"], stocks: ["台達電", "國巨", "台光電"], plain: "台幣貶值有利出口，但不能只靠匯率研究股票。" },
  { factor: "費半", now: "高檔震盪", impact: "半導體、ASIC、PCB、散熱情緒跟著波動。", themes: ["ASIC", "PCB / CCL", "散熱"], stocks: ["世芯", "台光電", "奇鋐"], plain: "費半是台股科技股的外部風向球。" },
  { factor: "Nasdaq", now: "科技股偏強", impact: "AI 供應鏈短線情緒偏多。", themes: ["美股 AI 供應鏈", "AI Server"], stocks: ["台光電", "貿聯-KY"], plain: "美股科技股強，台股 AI 族群比較容易被重新關注。" },
  { factor: "S&P500", now: "風險偏好穩定", impact: "整體股市情緒偏穩，有利題材延續。", themes: ["降息受惠題材", "高股息 / 防禦型"], stocks: ["台達電", "高股息 ETF"], plain: "大盤穩，題材研究比較不容易被恐慌打斷。" },
  { factor: "VIX", now: "低檔", impact: "市場恐慌低，但也要留意突然升高。", themes: ["AI Server", "高股息 / 防禦型"], stocks: ["台達電", "國巨"], plain: "VIX 低代表市場不恐慌，但不是保證安全。" },
  { factor: "NVIDIA", now: "AI 需求強", impact: "AI Server、散熱、PCB、電源供應鏈受激勵。", themes: ["AI Server", "散熱"], stocks: ["奇鋐", "雙鴻", "台光電"], plain: "NVIDIA 是 AI Server 供應鏈的情緒核心。" },
  { factor: "AMD", now: "AI 晶片競爭升溫", impact: "有利 ASIC、CoWoS、ABF 等高階供應鏈討論。", themes: ["ASIC", "ABF 載板"], stocks: ["世芯", "欣興"], plain: "競爭者越多，AI 供應鏈研究面越廣。" },
  { factor: "Broadcom", now: "ASIC 敘事強", impact: "客製化晶片題材升溫。", themes: ["ASIC", "美股 AI 供應鏈"], stocks: ["世芯", "創意"], plain: "Broadcom 強，市場會重新看 ASIC 供應鏈。" },
  { factor: "Microsoft", now: "AI CapEx 高", impact: "雲端 AI Server 需求支撐供應鏈。", themes: ["AI Server", "電源供應器"], stocks: ["台達電", "台光電"], plain: "大型雲端公司願意花錢，是 AI 供應鏈的重要支撐。" },
  { factor: "Amazon", now: "雲端投資續強", impact: "資料中心、電源、散熱受惠。", themes: ["電源供應器", "散熱"], stocks: ["台達電", "奇鋐"], plain: "雲端建置越多，基礎設施零組件越重要。" },
  { factor: "Google", now: "自研晶片延續", impact: "ASIC 與先進封裝題材受關注。", themes: ["ASIC", "ABF 載板"], stocks: ["世芯", "欣興"], plain: "自研晶片越多，台股設計服務與封裝材料越有研究價值。" },
  { factor: "Meta", now: "AI 基建投入", impact: "AI Server 與散熱電源題材延續。", themes: ["AI Server", "散熱"], stocks: ["奇鋐", "雙鴻"], plain: "社群平台也在買 AI 算力，需求不只來自晶片公司。" },
  { factor: "CapEx", now: "持續擴張", impact: "若下修，AI 供應鏈風險升高。", themes: ["AI Server", "PCB / CCL"], stocks: ["台光電", "台燿"], plain: "CapEx 是 AI 供應鏈最重要的總開關之一。" },
  { factor: "關稅", now: "政策不確定", impact: "供應鏈轉移與成本上升。", themes: ["匯率受惠股", "連接器"], stocks: ["貿聯-KY", "信邦"], plain: "關稅影響成本與產地布局，不一定只看營收。" },
  { factor: "匯率", now: "台幣偏弱", impact: "出口股短期可能受惠。", themes: ["匯率受惠股"], stocks: ["國巨", "台達電"], plain: "匯率是加分項，不是單獨買進理由。" },
  { factor: "油價", now: "中性", impact: "影響通膨與 Fed 預期。", themes: ["降息受惠題材", "防禦型"], stocks: ["高股息 ETF"], plain: "油價會間接影響利率預期與市場風險偏好。" },
  { factor: "地緣政治", now: "需留意", impact: "短線避險、供應鏈轉移與科技股估值波動。", themes: ["AI Server", "高股息 / 防禦型"], stocks: ["台積電供應鏈", "防禦型資產"], plain: "地緣風險升高時，要先保護研究假設。" }
];

const baseThemes = [
  {
    id: "ai-server",
    name: "AI Server",
    heat: 94,
    consensus: 88,
    risk: "中高",
    trend: "升溫",
    plain: "AI 訓練與推論伺服器需求拉動零組件升級。",
    sourceCount: 34,
    stockCount: 30,
    beginnerFit: 78,
    emerging: false,
    whyNow: "大型雲端客戶持續提高 AI 資本支出，市場開始追蹤供應鏈能見度、交期與零組件規格升級。",
    description: "AI Server 題材不是單一股票，而是一整條高階運算供應鏈，包含晶片、載板、板材、散熱、電源、被動元件與高速傳輸。",
    supplyChain: aiServerTree,
    trendForecast: {
      short: { label: "升溫", reason: "美國大型科技股 CapEx 與 AI 晶片需求仍是市場主線。" },
      mid: { label: "偏多", reason: "高階零組件訂單能見度佳，但熱門股估值需觀察。" },
      long: { label: "結構成長", reason: "AI 訓練、推論與資料中心升級仍是 6 到 12 個月主軸。" }
    },
    macro: { sensitivity: "高", factors: ["美股科技股", "費半指數", "大型科技股 CapEx", "美元 / 台幣匯率"], explanation: "AI Server 與美股科技股、半導體景氣和雲端資本支出高度連動，外部變數會快速影響台股供應鏈情緒。" },
    decision: "可優先研究",
    beginnerNote: "適合從供應鏈地圖開始，先看高共識的 PCB/CCL、MLCC、散熱，再研究高波動 ASIC。",
    risks: { overheated: "部分龍頭估值已反映樂觀預期", hype: "不是純短線，但消息面會放大波動", fundamentals: "雲端資本支出與訂單能見度提供支撐", consensus: "S/A 級來源一致度高", impactedStocks: ["世芯 3661", "創意 3443", "台光電 2383", "奇鋐 3017"] }
  },
  {
    id: "mlcc-passive",
    name: "MLCC / 被動元件",
    heat: 86,
    consensus: 81,
    risk: "中",
    trend: "升溫",
    plain: "AI 與車用需求推動高階被動元件用量增加。",
    sourceCount: 22,
    stockCount: 6,
    beginnerFit: 84,
    emerging: false,
    whyNow: "市場注意到高階 MLCC 交期拉長、庫存去化接近尾聲，以及 AI Server 單機用量增加。",
    description: "被動元件提供電子設備穩定供電與訊號品質，MLCC 是 AI Server、車用與工控不可缺少的基礎零件。",
    supplyChain: [
      { segment: "高階 MLCC", role: "AI Server 與車用電子提升單機用量。", stocks: ["國巨 2327", "華新科 2492", "禾伸堂 3026"] },
      { segment: "晶片電阻", role: "供電與訊號穩定基礎零件，循環復甦時受惠。", stocks: ["國巨 2327", "信昌電 6173"] },
      { segment: "電感", role: "電源管理與濾波需求提升。", stocks: ["千如 3236"] },
      { segment: "利基型材料", role: "小型股彈性大但資料透明度較低。", stocks: ["九豪 6127", "信昌電 6173"] }
    ],
    trendForecast: {
      short: { label: "升溫", reason: "高階用量與庫存循環改善讓市場重新討論。" },
      mid: { label: "偏多", reason: "復甦方向明確，但報價與月營收仍需驗證。" },
      long: { label: "週期復甦", reason: "被動元件是循環產業，長線仍需看供需與庫存。" }
    },
    macro: { sensitivity: "中", factors: ["美元 / 台幣匯率", "美股科技股", "大型科技股 CapEx"], explanation: "出口與 AI 需求會受匯率和海外科技股情緒影響，但不如 ASIC 對美股科技股敏感。" },
    decision: "可優先研究",
    beginnerNote: "適合新手先研究龍頭與月營收，不要直接跳到小型高波動股。",
    risks: { overheated: "熱度升溫但尚未全面過熱", hype: "部分小型股容易跟題材短線波動", fundamentals: "庫存循環改善與高階需求支撐較明確", consensus: "多數來源同意復甦方向，但速度仍需觀察", impactedStocks: ["國巨 2327", "華新科 2492", "信昌電 6173", "千如 3236"] }
  },
  {
    id: "mosfet-power",
    name: "MOSFET / 功率半導體",
    heat: 78,
    consensus: 69,
    risk: "中高",
    trend: "持平",
    plain: "電源轉換與 AI 伺服器電力需求帶動功率元件關注。",
    sourceCount: 16,
    stockCount: 4,
    beginnerFit: 62,
    emerging: false,
    whyNow: "AI Server 電源架構升級，讓功率半導體重新被研究，但報價與庫存變化仍分歧。",
    description: "MOSFET 影響電源效率，題材通常與 AI Server、車用電子、工控需求連動。",
    supplyChain: [
      { segment: "低壓 MOSFET", role: "伺服器與電源轉換使用，波動較大。", stocks: ["杰力 5299", "尼克森 3317"] },
      { segment: "功率 IC", role: "電力控制與轉換效率改善。", stocks: ["富鼎 8261", "大中 6435"] }
    ],
    trendForecast: {
      short: { label: "持平", reason: "題材仍在，但報價復甦還沒形成高度共識。" },
      mid: { label: "震盪", reason: "AI 電源需求有支撐，庫存與價格仍需要更多資料。" },
      long: { label: "週期復甦", reason: "功率半導體受景氣循環與新應用雙重影響。" }
    },
    macro: { sensitivity: "中高", factors: ["費半指數", "美股科技股", "關稅 / 地緣政治"], explanation: "半導體情緒會影響族群評價，中小型股又容易受短線資金與地緣風險放大波動。" },
    decision: "可觀察",
    beginnerNote: "適合進階投資人研究，新手應先看龍頭或等待資料更清楚。",
    risks: { overheated: "中小型股容易快速反應題材", hype: "短線炒作風險偏高", fundamentals: "需求端有支撐，但價格復甦仍需驗證", consensus: "A/B 級來源看法不完全一致", impactedStocks: ["富鼎 8261", "杰力 5299", "尼克森 3317", "大中 6435"] }
  },
  {
    id: "asic",
    name: "ASIC",
    heat: 91,
    consensus: 84,
    risk: "高",
    trend: "升溫",
    plain: "客製化 AI 晶片成為雲端業者降低成本的重要方向。",
    sourceCount: 25,
    stockCount: 3,
    beginnerFit: 55,
    emerging: false,
    whyNow: "市場期待 CSP 自研晶片案量成長，設計服務與 IP 供應鏈被重新評價。",
    description: "ASIC 題材重視客戶案量、NRE 收入與量產時程，波動大但研究價值高。",
    supplyChain: [
      { segment: "設計服務", role: "協助雲端客戶設計客製化 AI 晶片。", stocks: ["世芯 3661", "創意 3443", "智原 3035"] },
      { segment: "晶圓代工", role: "先進製程與封裝是 ASIC 量產基礎。", stocks: ["台積電 2330"] }
    ],
    trendForecast: {
      short: { label: "升溫", reason: "美股 AI 晶片消息與 CSP 自研晶片話題升高。" },
      mid: { label: "偏多", reason: "案量與量產時程提供想像，但單一客戶風險仍大。" },
      long: { label: "結構成長", reason: "AI 推論成本下降需求會推動客製化晶片長期成長。" }
    },
    macro: { sensitivity: "高", factors: ["美股科技股", "費半指數", "大型科技股 CapEx", "升息 / 降息"], explanation: "ASIC 屬高估值高成長題材，對美股 AI 晶片、利率與科技股情緒很敏感。" },
    decision: "等待拉回",
    beginnerNote: "研究價值高，但不適合新手重壓，先用小部位或觀察清單追蹤。",
    risks: { overheated: "估值敏感度高", hype: "客戶傳聞容易造成短線波動", fundamentals: "長期需求明確，但單一客戶風險高", consensus: "法人來源偏多，社群討論偏熱", impactedStocks: ["世芯 3661", "創意 3443"] }
  },
  {
    id: "abf",
    name: "ABF 載板",
    heat: 82,
    consensus: 76,
    risk: "中",
    trend: "升溫",
    plain: "高階 AI/HPC 晶片需要 ABF 載板承載，需求跟先進封裝連動。",
    sourceCount: 14,
    stockCount: 3,
    beginnerFit: 70,
    emerging: false,
    whyNow: "AI 晶片尺寸變大、先進封裝需求增加，市場重新關注高階載板供需。",
    description: "ABF 載板位於晶片封裝與主板之間，是高階處理器不可缺少的材料。",
    supplyChain: [{ segment: "高階載板", role: "AI/HPC 晶片封裝承載材料。", stocks: ["欣興 3037", "景碩 3189", "南電 8046"] }],
    trendForecast: { short: { label: "升溫", reason: "AI 晶片與先進封裝需求帶動市場關注。" }, mid: { label: "偏多", reason: "高階載板供需仍偏緊，但股價需觀察是否已提前反映。" }, long: { label: "結構成長", reason: "AI、HPC、高階封裝長期需求仍在。" } },
    macro: { sensitivity: "中高", factors: ["費半指數", "大型科技股 CapEx", "美元 / 台幣匯率"], explanation: "ABF 與半導體景氣、AI 晶片需求和出口匯率連動。" },
    decision: "可觀察",
    beginnerNote: "適合看懂 AI 封裝後再研究，先觀察龍頭基本面與供需變化。",
    risks: { overheated: "題材升溫中，需留意股價提前反映", hype: "不是純炒作，但報價新聞會影響短線", fundamentals: "AI/HPC 封裝需求支撐", consensus: "A 級來源逐步增加", impactedStocks: ["欣興 3037", "景碩 3189", "南電 8046"] }
  },
  {
    id: "pcb-ccl",
    name: "PCB / CCL",
    heat: 88,
    consensus: 86,
    risk: "中",
    trend: "升溫",
    plain: "AI Server 高速傳輸讓高階板材與 PCB 價值提升。",
    sourceCount: 23,
    stockCount: 4,
    beginnerFit: 80,
    emerging: false,
    whyNow: "市場追蹤高階 CCL 供需與 AI Server PCB 層數升級。",
    description: "PCB/CCL 題材重視材料規格、良率與主要客戶滲透率。",
    supplyChain: [{ segment: "高階 CCL / PCB", role: "AI Server 高速傳輸與層數升級。", stocks: ["台光電 2383", "台燿 6274", "金像電 2368", "健鼎 3044"] }],
    trendForecast: { short: { label: "升溫", reason: "AI Server 板材升級仍是市場焦點。" }, mid: { label: "偏多", reason: "高階 CCL 供需與客戶滲透率仍被法人追蹤。" }, long: { label: "結構成長", reason: "高速傳輸與高階伺服器長期提高板材門檻。" } },
    macro: { sensitivity: "中高", factors: ["美股科技股", "費半指數", "大型科技股 CapEx", "美元 / 台幣匯率"], explanation: "PCB/CCL 與 AI Server 出貨、半導體情緒和出口匯率連動。" },
    decision: "可優先研究",
    beginnerNote: "適合新手研究，因為供應鏈位置清楚且來源共識高。",
    risks: { overheated: "龍頭評價已部分反映", hype: "仍有基本面支撐", fundamentals: "AI Server 規格升級明確", consensus: "多數來源一致", impactedStocks: ["台光電 2383", "台燿 6274", "金像電 2368"] }
  },
  {
    id: "thermal",
    name: "散熱",
    heat: 89,
    consensus: 83,
    risk: "中高",
    trend: "升溫",
    plain: "AI 晶片功耗提高，散熱規格升級成為剛性需求。",
    sourceCount: 20,
    stockCount: 4,
    beginnerFit: 72,
    emerging: false,
    whyNow: "液冷、均熱片與高階風扇需求被拉高，市場追蹤新平台滲透率。",
    description: "散熱題材與 AI Server 功耗密切相關，重點是規格升級與毛利率改善。",
    supplyChain: [{ segment: "散熱模組", role: "功耗提高帶動氣冷、液冷與高階模組需求。", stocks: ["奇鋐 3017", "雙鴻 3324", "建準 2421", "力致 3483"] }],
    trendForecast: { short: { label: "升溫", reason: "AI 機櫃功耗提高讓散熱規格持續被討論。" }, mid: { label: "偏多", reason: "新平台滲透率與液冷採用率仍是主要催化。" }, long: { label: "結構成長", reason: "AI 資料中心功耗上升是長期方向。" } },
    macro: { sensitivity: "中高", factors: ["美股科技股", "大型科技股 CapEx", "美元 / 台幣匯率"], explanation: "散熱需求跟 AI Server 出貨高度連動，也受出口匯率影響。" },
    decision: "等待拉回",
    beginnerNote: "題材明確，但熱門股漲多時要等價格位置更舒服。",
    risks: { overheated: "熱門股位階偏高", hype: "規格傳聞會影響短線", fundamentals: "需求有支撐", consensus: "A 級來源一致度高", impactedStocks: ["奇鋐 3017", "雙鴻 3324"] }
  },
  {
    id: "power-supply",
    name: "電源供應器",
    heat: 79,
    consensus: 74,
    risk: "中",
    trend: "持平",
    plain: "AI Server 耗電提升，電源供應與轉換效率變重要。",
    sourceCount: 13,
    stockCount: 3,
    beginnerFit: 76,
    emerging: false,
    whyNow: "高功耗 AI 機櫃推升電源規格，市場追蹤 PSU 與電源管理需求。",
    description: "電源題材通常比小型 IC 股穩定，適合用來研究 AI 基礎設施升級。",
    supplyChain: [{ segment: "PSU / 電源管理", role: "供應伺服器穩定電力並提升效率。", stocks: ["台達電 2308", "光寶科 2301", "群電 6412"] }],
    trendForecast: { short: { label: "持平", reason: "題材穩定但短線爆發力不如 ASIC。" }, mid: { label: "偏多", reason: "AI 機櫃耗電提升帶動規格升級。" }, long: { label: "結構成長", reason: "資料中心能源效率是長期投資主題。" } },
    macro: { sensitivity: "中", factors: ["大型科技股 CapEx", "美元 / 台幣匯率", "關稅 / 地緣政治"], explanation: "電源與雲端建置、出口和供應鏈成本連動。" },
    decision: "可觀察",
    beginnerNote: "比高波動小型股更容易理解，可作為穩健型 AI 供應鏈研究。",
    risks: { overheated: "尚未全面過熱", hype: "較少純炒作", fundamentals: "電源規格升級提供支撐", consensus: "來源共識中上", impactedStocks: ["台達電 2308", "光寶科 2301", "群電 6412"] }
  },
  {
    id: "memory",
    name: "記憶體",
    heat: 74,
    consensus: 72,
    risk: "中",
    trend: "持平",
    plain: "價格循環復甦與 AI 高頻寬記憶體需求成為關注焦點。",
    sourceCount: 16,
    stockCount: 3,
    beginnerFit: 73,
    emerging: false,
    whyNow: "DRAM/NAND 報價回穩，市場同時觀察 HBM 對整體供需的拉動。",
    description: "記憶體是景氣循環產業，研究重點是報價、庫存與資本支出。",
    supplyChain: [{ segment: "DRAM / Flash", role: "AI 與一般電子需求都會影響報價循環。", stocks: ["華邦電 2344", "南亞科 2408", "旺宏 2337"] }],
    trendForecast: { short: { label: "持平", reason: "報價復甦已有期待，但短線催化有限。" }, mid: { label: "震盪", reason: "供給紀律與庫存去化仍需觀察。" }, long: { label: "週期復甦", reason: "記憶體本質是循環產業，需看價格與庫存。" } },
    macro: { sensitivity: "中高", factors: ["費半指數", "美元 / 台幣匯率", "美股科技股"], explanation: "記憶體受半導體景氣、出口與美元報價影響。" },
    decision: "可觀察",
    beginnerNote: "適合學循環股，但要避免只看題材不看報價。",
    risks: { overheated: "尚未全面過熱", hype: "報價新聞容易引發短線反應", fundamentals: "循環復甦有支持，但速度需追蹤", consensus: "來源看法中性偏多", impactedStocks: ["華邦電 2344", "南亞科 2408", "旺宏 2337"] }
  },
  {
    id: "high-speed",
    name: "高速傳輸",
    heat: 76,
    consensus: 68,
    risk: "中高",
    trend: "升溫",
    plain: "AI Server 需要高速資料流動，連接與控制晶片受關注。",
    sourceCount: 12,
    stockCount: 3,
    beginnerFit: 61,
    emerging: true,
    whyNow: "AI 機櫃傳輸速度升級，市場開始討論高速介面、USB/PCIe 與線束。",
    description: "高速傳輸題材彈性大，但個股差異高，需要確認實際產品與客戶。",
    supplyChain: [{ segment: "高速介面 / 線束", role: "資料在晶片、板卡、機櫃間高速移動。", stocks: ["貿聯-KY 3665", "創惟 6104", "祥碩 5269"] }],
    trendForecast: { short: { label: "升溫", reason: "AI 機櫃高速傳輸規格升級帶動關注。" }, mid: { label: "震盪", reason: "實際營收貢獻需逐步驗證。" }, long: { label: "結構成長", reason: "AI 資料流量長期增加，高速傳輸需求提高。" } },
    macro: { sensitivity: "中高", factors: ["美股科技股", "大型科技股 CapEx", "關稅 / 地緣政治"], explanation: "與 AI 機櫃建置和供應鏈轉移相關，短線容易受消息影響。" },
    decision: "可觀察",
    beginnerNote: "適合進階研究，新手先確認每家公司到底賣什麼。",
    risks: { overheated: "新興題材容易快速升溫", hype: "消息面比例偏高", fundamentals: "需看營收驗證", consensus: "來源共識尚未完全形成", impactedStocks: ["貿聯-KY 3665", "創惟 6104", "祥碩 5269"] }
  },
  {
    id: "connector",
    name: "連接器",
    heat: 73,
    consensus: 67,
    risk: "中",
    trend: "持平",
    plain: "AI 伺服器內外部訊號與電源連接規格提升。",
    sourceCount: 11,
    stockCount: 3,
    beginnerFit: 65,
    emerging: true,
    whyNow: "高速傳輸與電源需求升級，讓高階連接器被放進 AI Server 供應鏈討論。",
    description: "連接器題材需看產品規格與客戶結構，不是所有連接器公司都等於 AI 受惠。",
    supplyChain: [{ segment: "高階連接器", role: "連接伺服器訊號、電源與線束。", stocks: ["貿聯-KY 3665", "信邦 3023", "優群 3217"] }],
    trendForecast: { short: { label: "持平", reason: "題材被注意，但主流共識仍在 AI Server 核心零組件。" }, mid: { label: "震盪", reason: "需要更多營收或客戶證據。" }, long: { label: "結構成長", reason: "高速與高功率連接需求長期提高。" } },
    macro: { sensitivity: "中", factors: ["大型科技股 CapEx", "美元 / 台幣匯率", "關稅 / 地緣政治"], explanation: "連接器受 AI 建置與出口環境影響，但個股差異大。" },
    decision: "可觀察",
    beginnerNote: "先看產品是否真的進入 AI Server，而不是只看族群名稱。",
    risks: { overheated: "整體不算過熱", hype: "概念股辨識難度高", fundamentals: "需確認產品與客戶", consensus: "共識中等", impactedStocks: ["貿聯-KY 3665", "信邦 3023", "優群 3217"] }
  },
  {
    id: "robotics",
    name: "機器人",
    heat: 67,
    consensus: 52,
    risk: "高",
    trend: "降溫",
    plain: "長期想像大，但短期基本面與訂單仍不明確。",
    sourceCount: 12,
    stockCount: 4,
    beginnerFit: 41,
    emerging: true,
    whyNow: "人形機器人消息多，但台股供應鏈實際營收貢獻仍待驗證。",
    description: "機器人題材容易被消息推動，新手需要特別分辨概念與實際訂單。",
    supplyChain: [
      { segment: "馬達 / 減速機", role: "機器人關節與移動控制。", stocks: ["上銀 2049", "直得 1597"] },
      { segment: "控制 / 感測", role: "機器人感測與控制系統。", stocks: ["所羅門 2359", "佳能 2374"] }
    ],
    trendForecast: { short: { label: "降溫", reason: "短線消息熱度降低，資金轉回有營收驗證的 AI 零組件。" }, mid: { label: "震盪", reason: "實際訂單與營收貢獻仍不明確。" }, long: { label: "不確定", reason: "長期想像大，但目前商業化節奏仍需驗證。" } },
    macro: { sensitivity: "中", factors: ["美股科技股", "升息 / 降息", "關稅 / 地緣政治"], explanation: "機器人屬長期想像題材，對資金風險偏好敏感。" },
    decision: "暫時避開",
    beginnerNote: "新手先不要把概念當基本面，等待更可靠來源。",
    risks: { overheated: "題材股過熱風險高", hype: "短線炒作比例高", fundamentals: "基本面尚未普遍落地", consensus: "S/A 級來源有限", impactedStocks: ["上銀 2049", "所羅門 2359", "佳能 2374"] }
  },
  {
    id: "auto-electronics",
    name: "車用電子",
    heat: 67,
    consensus: 70,
    risk: "中",
    trend: "持平",
    plain: "車用電子包含功率元件、被動元件、連接器與感測器，重點是長約與認證。",
    sourceCount: 11,
    stockCount: 8,
    beginnerFit: 72,
    emerging: false,
    whyNow: "EV 與智能車需求雖然沒有 AI Server 熱，但車用認證、長約與安全規格讓部分零組件具備長期研究價值。",
    description: "車用電子不是短線最熱門題材，但適合新手學習供應鏈認證、產品週期與長約邏輯。",
    supplyChain: [
      { segment: "被動元件", role: "車用 MLCC 與電阻需要高可靠度。", stocks: ["國巨 2327", "華新科 2492"] },
      { segment: "功率半導體", role: "EV 與車用電源轉換需求。", stocks: ["富鼎 8261", "杰力 5299"] },
      { segment: "連接器", role: "車用訊號與電源連接規格提高。", stocks: ["貿聯-KY 3665", "信邦 3023"] }
    ],
    trendForecast: { short: { label: "持平", reason: "市場主線仍在 AI，車用題材短線較低調。" }, mid: { label: "震盪", reason: "EV 需求與庫存變化仍需觀察。" }, long: { label: "結構成長", reason: "車用電子含量長期提升，但節奏較慢。" } },
    macro: { sensitivity: "中", factors: ["美元 / 台幣匯率", "關稅 / 地緣政治", "油價"], explanation: "車用電子受出口、車廠需求與供應鏈移轉影響，短線不一定跟 AI 同步。" },
    decision: "可觀察",
    beginnerNote: "適合新手練習看長約、認證與產品週期，不適合用追熱門題材的方式看。",
    risks: { overheated: "目前不算過熱", hype: "低中", fundamentals: "需看車用訂單、長約與認證進度", consensus: "來源穩定但熱度普通", impactedStocks: ["國巨 2327", "華新科 2492", "貿聯-KY 3665"] }
  },
  {
    id: "fx-benefit",
    name: "匯率受惠股",
    heat: 64,
    consensus: 61,
    risk: "中",
    trend: "持平",
    plain: "台幣貶值時，部分出口股短期可能受惠。",
    sourceCount: 8,
    stockCount: 5,
    beginnerFit: 58,
    emerging: false,
    whyNow: "美元強弱與台幣匯率波動影響出口股毛利與匯兌損益。",
    description: "匯率受惠不是單獨基本面，需搭配公司出口比重與避險策略。",
    supplyChain: [{ segment: "出口導向", role: "營收以美元計價或出口比重高。", stocks: ["台達電 2308", "國巨 2327", "台光電 2383"] }],
    trendForecast: { short: { label: "持平", reason: "美元仍偏強但波動大。" }, mid: { label: "震盪", reason: "匯率與利率政策會反覆影響預期。" }, long: { label: "不確定", reason: "匯率不是可長期單押的題材。" } },
    macro: { sensitivity: "高", factors: ["美元 / 台幣匯率", "升息 / 降息"], explanation: "這個題材本身就由匯率驅動，需每日追蹤美元與台幣方向。" },
    decision: "可觀察",
    beginnerNote: "可作輔助因子，不建議只因匯率買股票。",
    risks: { overheated: "不明顯", hype: "容易被單日匯率放大解讀", fundamentals: "需搭配公司基本面", consensus: "來源中等", impactedStocks: ["台達電 2308", "國巨 2327", "台光電 2383"] }
  },
  {
    id: "us-ai-chain",
    name: "美股 AI 供應鏈",
    heat: 84,
    consensus: 82,
    risk: "中高",
    trend: "升溫",
    plain: "NVIDIA、Broadcom、Marvell 等美股 AI 走勢會牽動台股供應鏈。",
    sourceCount: 20,
    stockCount: 8,
    beginnerFit: 68,
    emerging: false,
    whyNow: "美股 AI 龍頭財報與展望仍是台股科技股情緒的重要領先指標。",
    description: "這是跨市場題材，用來理解台股 AI 供應鏈受美股科技股帶動的程度。",
    supplyChain: [{ segment: "台股連動供應鏈", role: "受美股 AI 龍頭財報與展望牽動。", stocks: ["世芯 3661", "台光電 2383", "奇鋐 3017", "貿聯-KY 3665"] }],
    trendForecast: { short: { label: "升溫", reason: "美股 AI 龍頭仍維持高關注。" }, mid: { label: "偏多", reason: "若 CapEx 不下修，供應鏈情緒仍有支撐。" }, long: { label: "結構成長", reason: "AI 基礎設施長期投入仍在。" } },
    macro: { sensitivity: "高", factors: ["美股科技股", "費半指數", "大型科技股 CapEx", "升息 / 降息"], explanation: "這個題材高度依賴美股科技股情緒與財報展望。" },
    decision: "可觀察",
    beginnerNote: "適合用來理解外部風向，但個股仍要回到台股基本面。",
    risks: { overheated: "若美股漲多，台股容易追高", hype: "美股消息會放大短線情緒", fundamentals: "需看台股公司實際接單", consensus: "國際來源多", impactedStocks: ["世芯 3661", "台光電 2383", "奇鋐 3017"] }
  },
  {
    id: "rate-cut",
    name: "降息受惠題材",
    heat: 70,
    consensus: 66,
    risk: "中",
    trend: "持平",
    plain: "降息通常有利成長股評價，但要看經濟是否同步轉弱。",
    sourceCount: 10,
    stockCount: 6,
    beginnerFit: 63,
    emerging: false,
    whyNow: "市場持續評估美國利率路徑，科技成長股評價受利率預期影響。",
    description: "降息是宏觀因子，不是單一產業題材，需搭配基本面與資金流。",
    supplyChain: [{ segment: "高成長 / 高估值", role: "折現率下降時評價壓力可能減輕。", stocks: ["世芯 3661", "創意 3443", "奇鋐 3017"] }],
    trendForecast: { short: { label: "持平", reason: "利率預期反覆，市場尚未完全定價。" }, mid: { label: "震盪", reason: "若降息來自經濟轉弱，股市未必全面受惠。" }, long: { label: "不確定", reason: "需看政策、通膨與企業獲利。" } },
    macro: { sensitivity: "高", factors: ["升息 / 降息", "美元 / 台幣匯率", "美股科技股"], explanation: "這個題材直接受利率與資金風險偏好影響。" },
    decision: "可觀察",
    beginnerNote: "可作市場背景，不要把降息直接等同股價上漲。",
    risks: { overheated: "高估值股容易提前反映", hype: "政策預期常反覆", fundamentals: "需搭配公司獲利", consensus: "宏觀共識會快速變動", impactedStocks: ["世芯 3661", "創意 3443", "奇鋐 3017"] }
  },
  {
    id: "defensive-dividend",
    name: "高股息 / 防禦型",
    heat: 58,
    consensus: 65,
    risk: "低中",
    trend: "持平",
    plain: "市場波動大時，資金可能轉向現金流穩定與高股息標的。",
    sourceCount: 9,
    stockCount: 6,
    beginnerFit: 74,
    emerging: false,
    whyNow: "若科技股波動升高，部分資金會尋找防禦型或高股息資產。",
    description: "防禦型題材不是追高成長，而是幫助新手理解資產配置與波動控制。",
    supplyChain: [{ segment: "防禦資產", role: "波動較低、配息或現金流相對穩定。", stocks: ["電信股", "金融股", "高股息 ETF"] }],
    trendForecast: { short: { label: "持平", reason: "科技股仍是主線，防禦型只是避險備案。" }, mid: { label: "震盪", reason: "資金會在成長與防禦之間輪動。" }, long: { label: "不確定", reason: "取決於利率、景氣與股利政策。" } },
    macro: { sensitivity: "中", factors: ["升息 / 降息", "美元 / 台幣匯率", "地緣政治"], explanation: "防禦型受利率與市場風險偏好影響，通常在風險升高時被重新關注。" },
    decision: "可觀察",
    beginnerNote: "適合新手當作風險對照組，理解不是所有資金都只追 AI。",
    risks: { overheated: "通常不以短線過熱為主", hype: "低", fundamentals: "看現金流與配息穩定度", consensus: "來源穩定但熱度低", impactedStocks: ["高股息 ETF", "電信股", "金融股"] }
  }
];

function trendScore(trend) {
  if (trend === "升溫") return 85;
  if (trend === "持平") return 72;
  return 56;
}

function riskScore(risk, beginnerFit) {
  const riskPenalty = risk === "高" ? 24 : risk === "中高" ? 14 : risk === "低中" ? -4 : 8;
  return Math.max(35, Math.min(92, beginnerFit - riskPenalty + 10));
}

function themeKeywords(theme) {
  const map = {
    "ai-server": ["NVIDIA", "大型科技股 CapEx", "PCB / CCL", "散熱", "Power", "MLCC"],
    asic: ["美股 AI 晶片", "雲端自研晶片", "NRE", "量產時程", "先進製程"],
    "pcb-ccl": ["AI Server", "高速訊號", "高階板材", "良率", "雲端客戶"],
    abf: ["AI 晶片", "先進封裝", "CoWoS", "高階載板", "HPC"],
    "mlcc-passive": ["AI Server", "高階 MLCC", "庫存循環", "車用電子", "交期"],
    "power-supply": ["AI 機櫃", "耗電提升", "電源效率", "資料中心", "台達電"],
    thermal: ["AI 晶片功耗", "液冷", "散熱模組", "新平台", "資料中心"],
    memory: ["DRAM 報價", "HBM", "庫存去化", "NAND", "伺服器需求"],
    "mosfet-power": ["電源轉換", "AI Server 電力架構", "庫存", "報價", "功率元件"],
    robotics: ["自動化", "機器人題材", "AI 應用", "實際訂單", "高波動"],
    "high-speed": ["高速傳輸", "Connector", "線束", "資料流量", "AI Server"],
    connector: ["連接器", "高速傳輸", "資料中心", "車用", "規格升級"],
    "auto-electronics": ["車用電子", "EV", "功率元件", "感測器", "長約"],
    "fx-benefit": ["美元", "台幣匯率", "出口", "毛利", "匯兌"],
    "us-ai-chain": ["NVIDIA", "Broadcom", "Microsoft", "Amazon", "Meta"],
    "rate-cut": ["Fed", "降息", "成長股", "評價", "美元"],
    "defensive-dividend": ["高股息", "防禦型", "現金流", "波動控制", "利率"]
  };
  return map[theme.id] || [theme.name, "法人報告", "市場共識", "價格位置", "基本面"];
}

function makeMarketSummaryLong(theme) {
  const keys = themeKeywords(theme);
  return `目前 ${theme.name} 的市場討論，核心不是單一個股會不會漲，而是資金正在確認「題材能不能連到基本面」。最近市場關注 ${keys.slice(0, 3).join("、")}，原因是 ${theme.whyNow} 從新手角度看，這個題材值得研究的地方在於供應鏈角色清楚，能把新聞、法人報告、財報與價格位置串成同一條邏輯。受惠公司通常不是全部一起受惠，而是會依照龍頭、受惠股、補漲股與高風險股分層輪動。今天研究這個題材，重點不是追最快上漲的股票，而是先看來源是否一致、營收或訂單是否能支持，以及目前價格是否已經反映太多期待。`;
}

function makeResearchReasons(theme) {
  const keys = themeKeywords(theme);
  return [
    { label: "新聞", text: `${keys[0]} 相關消息讓市場重新檢查 ${theme.name} 供應鏈。` },
    { label: "法人", text: `法人通常會從能見度、估值與族群輪動角度追蹤，現在共識分數為 ${theme.consensus}。` },
    { label: "財報", text: theme.risks.fundamentals },
    { label: "Podcast", text: "財經節目與股癌類內容適合拿來聽市場語氣，但只作重點整理，不當成明牌。" },
    { label: "市場討論", text: `${theme.sourceCount} 個來源正在追蹤，熱度屬於 ${theme.heat >= 85 ? "高" : theme.heat >= 70 ? "中上" : "普通"}。` },
    { label: "國際事件", text: theme.macro?.explanation || "需搭配國際利率、美元、費半與美股科技股情緒一起看。" }
  ];
}

function makeMarketStory(theme) {
  const storyMap = {
    "ai-server": ["AI Server", "NVIDIA", "大型科技股 CapEx", "PCB / CCL", "散熱", "Power", "MLCC"],
    asic: ["雲端自研晶片", "ASIC", "設計服務", "NRE", "量產", "估值重評"],
    "pcb-ccl": ["AI Server", "高速訊號", "高階 CCL", "PCB 層數提升", "良率", "台股板材供應鏈"],
    abf: ["AI 晶片", "CoWoS", "ABF 載板", "HPC", "封裝供需", "載板股"],
    "mlcc-passive": ["AI Server", "穩壓需求", "高階 MLCC", "交期", "庫存復甦", "被動元件龍頭"],
    "power-supply": ["AI Server", "耗電提升", "Power", "電源效率", "資料中心", "大型龍頭"],
    thermal: ["AI 晶片", "功耗提高", "散熱", "液冷", "毛利率", "散熱模組股"],
    memory: ["AI 訓練", "HBM", "DRAM 報價", "庫存去化", "景氣循環", "記憶體股"],
    "mosfet-power": ["AI Server", "電源架構", "MOSFET", "功率 IC", "庫存報價", "中小型功率股"],
    robotics: ["AI 應用", "機器人", "自動化", "實際訂單", "營收驗證", "高波動股"],
    connector: ["AI Server", "高速傳輸", "連接器", "線束", "規格升級", "利基型供應鏈"],
    "high-speed": ["AI Server", "資料流量", "高速介面", "線束", "連接器", "高速傳輸股"],
    "auto-electronics": ["EV", "車用電子", "功率元件", "長約", "車廠需求", "車用供應鏈"]
  };
  return storyMap[theme.id] || [theme.name, "新聞", "法人", "基本面", "價格位置", "研究清單"];
}

function makeInvalidationReasons(theme) {
  const keys = themeKeywords(theme);
  return [
    `如果 ${keys[0]} 需求或資本支出下修，題材熱度可能快速降溫。`,
    "如果 Fed 不降息或利率重新上行，高估值題材會承壓。",
    "如果財報、月營收或訂單沒有跟上，市場會重新檢查基本面支持。",
    "如果股價短線已大幅上漲，即使題材沒變差，也可能進入震盪。"
  ];
}

function makeLearningItems(theme) {
  const map = {
    "ai-server": ["AI Server 為什麼不是單一股票？", "CapEx 如何影響供應鏈？", "為什麼散熱、Power、MLCC 都會被帶動？"],
    asic: ["ASIC 是什麼？", "NRE 跟量產差在哪？", "為什麼 ASIC 題材波動很大？"],
    "pcb-ccl": ["PCB 和 CCL 差在哪？", "高速訊號為什麼需要高階板材？", "怎麼看板材股是否過熱？"],
    abf: ["ABF 載板是什麼？", "CoWoS 如何影響 ABF？", "載板股為什麼有循環性？"],
    "mlcc-passive": ["MLCC 是什麼？", "AI Server 為什麼需要更多被動元件？", "庫存循環怎麼看？"],
    "power-supply": ["Power 為什麼重要？", "AI Server 耗電在哪？", "大型電源股和小型題材股差在哪？"],
    thermal: ["散熱為什麼是 AI Server 剛需？", "液冷和氣冷差在哪？", "熱門股追高風險怎麼看？"],
    memory: ["DRAM 報價怎麼影響股價？", "HBM 是什麼？", "循環股研究要看什麼？"],
    "mosfet-power": ["MOSFET 是什麼？", "功率半導體如何連到 AI Server？", "報價與庫存為什麼重要？"],
    robotics: ["機器人題材為什麼容易波動？", "題材和營收怎麼分辨？", "新手為什麼要小心概念股？"]
  };
  return map[theme.id] || [`${theme.name} 是什麼？`, "這個題材如何連到營收？", "新手該如何看風險？"];
}

function enrichTheme(theme) {
  const scoreBreakdown = {
    sourceConsensus: theme.consensus,
    themeHeat: theme.heat,
    fundamentals: Math.round((theme.consensus + theme.beginnerFit) / 2),
    technical: trendScore(theme.trend),
    institutional: Math.round((theme.consensus + theme.sourceCount * 2) / 2),
    beginnerRisk: riskScore(theme.risk, theme.beginnerFit)
  };
  return {
    ...theme,
    scoreBreakdown,
    researchMetrics: {
      heat: { score: theme.heat, title: "市場熱度", plain: "最近市場討論多不多", why: `${theme.sourceCount} 個來源正在追蹤，趨勢為「${theme.trend}」。` },
      consensus: { score: theme.consensus, title: "市場共識", plain: "可信來源是否一致", why: `來源一致度為 ${theme.consensus}，${theme.risks.consensus}。` },
      maturity: { score: trendScore(theme.trend), title: "題材成熟度", plain: "剛開始、成長中或成熟", why: theme.trendForecast.mid.reason },
      fundamentals: { score: scoreBreakdown.fundamentals, title: "基本面支持", plain: "是否有營收、EPS、訂單支持", why: theme.risks.fundamentals },
      volatility: { score: scoreBreakdown.beginnerRisk, title: "波動風險", plain: "新手是否容易受傷", why: theme.risks.overheated }
    },
    marketSummaryLong: makeMarketSummaryLong(theme),
    researchReasons: makeResearchReasons(theme),
    marketStory: makeMarketStory(theme),
    invalidationReasons: makeInvalidationReasons(theme),
    learningItems: makeLearningItems(theme),
    aiConclusion: `今天 ${theme.name} 的研究重點是：${theme.decision}，先看來源共識與價格位置，不要把題材熱度直接翻譯成追高。`,
    scoreReason: `熱度 ${theme.heat}、共識 ${theme.consensus}，搭配 ${theme.sourceCount} 個來源與風險等級「${theme.risk}」後，判斷為 ${theme.decision}。`
  };
}

export const themes = baseThemes.map(enrichTheme);

export const macroFactors = macroBase;

export const todayFocus = {
  beginner: [
    { themeId: "mlcc-passive", why: "來源共識高、龍頭清楚，適合學習題材如何連到基本面。", risk: "短線族群輪動會震盪。", stocks: ["國巨 2327", "華新科 2492"], beginner: "適合" },
    { themeId: "pcb-ccl", why: "AI Server 規格升級邏輯清楚，供應鏈角色容易理解。", risk: "部分龍頭股價已反映樂觀預期。", stocks: ["台光電 2383", "台燿 6274"], beginner: "適合" },
    { themeId: "ai-server", why: "市場主線，但要從供應鏈拆開看，不要只追最熱股票。", risk: "ASIC 與熱門散熱股波動較大。", stocks: ["台光電 2383", "國巨 2327", "奇鋐 3017"], beginner: "部分適合" }
  ],
  advanced: [
    { themeId: "mosfet-power", why: "AI 電源升級有機會，但報價與庫存需驗證。", risk: "中小型股波動大。", stocks: ["富鼎 8261", "杰力 5299"], beginner: "進階較適合" },
    { themeId: "asic", why: "客製化 AI 晶片長線需求明確。", risk: "估值高、客戶消息敏感。", stocks: ["世芯 3661", "創意 3443"], beginner: "不適合重壓" },
    { themeId: "abf", why: "先進封裝與 AI 晶片需求帶動載板關注。", risk: "需確認供需與報價。", stocks: ["欣興 3037", "景碩 3189"], beginner: "可小部位研究" }
  ],
  cautious: [
    { themeId: "robotics", why: "長期想像大，但短期營收證據不足。", risk: "消息炒作與高波動。", stocks: ["上銀 2049", "所羅門 2359"], beginner: "暫時小心" },
    { themeId: "mosfet-power", why: "部分個股容易被資金快速拉抬。", risk: "題材轉弱時回檔快。", stocks: ["尼克森 3317", "大中 6435"], beginner: "新手小心" },
    { themeId: "high-speed", why: "新興題材值得追蹤。", risk: "實際營收貢獻還不夠清楚。", stocks: ["創惟 6104", "祥碩 5269"], beginner: "先觀察" }
  ]
};

export const marketSummary = {
  sentiment: "偏多",
  leadingThemes: ["AI Server", "PCB / CCL", "MLCC / 被動元件", "散熱"],
  sevenDayChange: "資金從純概念股轉向有營收驗證的 AI 零組件，法人報告更重視供應鏈能見度與價格位置。",
  aiSummary: "今天優先看高共識且價格沒有過度偏離的 AI 零組件；高波動題材先放觀察清單。",
  volatilityAlert: "ASIC、機器人與部分中小型功率半導體波動偏大；若近 20 日漲幅過大，即使題材強也不適合新手重壓。"
};

export const marketScenarios = [
  { title: "Fed 降息", flow: ["Fed 降息", "資金風險偏好提高", "AI", "PCB", "MLCC", "Power", "散熱"], impact: "成長股與高估值科技股通常較受惠，但若降息來自景氣轉弱，仍要看企業獲利。" },
  { title: "中東戰爭", flow: ["地緣風險升高", "油價", "通膨", "Fed 預期", "電子股波動", "黃金 / 軍工"], impact: "市場可能先避險，電子股短線承壓，防禦與原物料題材被重新關注。" },
  { title: "美元升值", flow: ["美元升值", "台幣偏弱", "出口股", "記憶體", "AI 供應鏈", "匯兌影響"], impact: "出口股短期可能受惠，但匯率只是加分項，仍要回到毛利與訂單。" },
  { title: "美股 AI 大漲", flow: ["NVIDIA / Broadcom", "費半", "台股 AI", "ASIC", "PCB / CCL", "散熱"], impact: "台股 AI 供應鏈容易受激勵，但若台股個股已偏熱，新手仍要等價格位置。" }
];
