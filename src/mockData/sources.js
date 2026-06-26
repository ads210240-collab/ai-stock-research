export const sourceTiers = {
  S: ["財報", "法說會", "MOPS", "TWSE"],
  A: ["Bloomberg", "Reuters", "Morningstar", "Morgan Stanley", "Goldman Sachs", "JP Morgan", "元大研究", "凱基研究", "永豐研究"],
  B: ["股癌 Podcast", "MacroMicro", "Mr.Market", "M觀點", "經理人專欄"],
  C: ["PTT 重點整理", "Dcard 重點整理", "Threads 重點整理"]
};

export const sourceRules = [
  "C 級只收錄重點整理",
  "不收錄個人心得、喊盤、明牌、留言、情緒文",
  "納入 AI 評分前需檢查是否有原始來源或可交叉驗證"
];

export const sources = [
  { id: 1, themeId: "mlcc-passive", stockIds: ["2327", "2492"], name: "法說會", tier: "S", credibility: 94, date: "2026/06/25", summary: "管理層提到高階 MLCC 與車用需求穩定，庫存水位較去年健康。", original: true, subjective: false, included: true, relevance: 92 },
  { id: 2, themeId: "mlcc-passive", stockIds: ["2327"], name: "MOPS", tier: "S", credibility: 96, date: "2026/06/24", summary: "公告營收與重大訊息，作為基本面驗證的原始資料。", original: true, subjective: false, included: true, relevance: 86 },
  { id: 3, themeId: "mlcc-passive", stockIds: ["2327", "2492"], name: "元大研究", tier: "A", credibility: 86, date: "2026/06/23", summary: "被動元件庫存循環改善，高階產品價格壓力降低。", original: false, subjective: true, included: true, relevance: 88 },
  { id: 4, themeId: "mlcc-passive", stockIds: ["6173", "3236"], name: "MacroMicro", tier: "B", credibility: 78, date: "2026/06/22", summary: "電子零組件景氣指標由谷底回升，但復甦斜率仍溫和。", original: false, subjective: false, included: true, relevance: 74 },
  { id: 5, themeId: "mlcc-passive", stockIds: ["2327", "2492", "6173"], name: "股癌 Podcast", tier: "B", credibility: 72, date: "2026/06/21", summary: "節目整理被動元件復甦邏輯，提醒不要把循環股當成永遠成長股。", original: false, subjective: true, included: true, relevance: 70 },
  { id: 6, themeId: "mlcc-passive", stockIds: ["6127"], name: "PTT 重點整理", tier: "C", credibility: 46, date: "2026/06/20", summary: "只保留族群討論與公開資料連結，不納入喊盤或留言情緒。", original: false, subjective: true, included: false, relevance: 45 },
  { id: 7, themeId: "ai-server", stockIds: ["3661", "2383", "3017"], name: "Bloomberg", tier: "A", credibility: 88, date: "2026/06/25", summary: "雲端資本支出維持高檔，AI Server 供應鏈能見度延長。", original: false, subjective: false, included: true, relevance: 91 },
  { id: 8, themeId: "ai-server", stockIds: ["2383", "6274"], name: "Goldman Sachs", tier: "A", credibility: 85, date: "2026/06/23", summary: "高階 PCB/CCL 規格升級帶動單機價值提升。", original: false, subjective: true, included: true, relevance: 88 },
  { id: 9, themeId: "asic", stockIds: ["3661", "3443"], name: "Morgan Stanley", tier: "A", credibility: 84, date: "2026/06/24", summary: "ASIC 案量成長，但估值對單一客戶消息敏感。", original: false, subjective: true, included: true, relevance: 86 },
  { id: 10, themeId: "mosfet-power", stockIds: ["8261", "5299"], name: "凱基研究", tier: "A", credibility: 80, date: "2026/06/22", summary: "功率元件需求改善，仍需確認報價復甦力道。", original: false, subjective: true, included: true, relevance: 79 },
  { id: 11, themeId: "thermal", stockIds: ["3017", "3324"], name: "Reuters", tier: "A", credibility: 87, date: "2026/06/25", summary: "AI 機櫃功耗提高，液冷與高階散熱需求增加。", original: false, subjective: false, included: true, relevance: 90 },
  { id: 12, themeId: "pcb-ccl", stockIds: ["2383", "6274"], name: "永豐研究", tier: "A", credibility: 82, date: "2026/06/24", summary: "高階 CCL 供需偏緊，市場聚焦客戶滲透與良率。", original: false, subjective: true, included: true, relevance: 89 },
  { id: 13, themeId: "memory", stockIds: ["2344"], name: "Morningstar", tier: "A", credibility: 83, date: "2026/06/21", summary: "記憶體循環復甦，但供給紀律仍是關鍵變數。", original: false, subjective: true, included: true, relevance: 78 },
  { id: 14, themeId: "robotics", stockIds: [], name: "Threads 重點整理", tier: "C", credibility: 42, date: "2026/06/20", summary: "只整理公開發表與供應鏈名單，未納入個人喊盤。", original: false, subjective: true, included: false, relevance: 40 },
  { id: 15, themeId: "abf", stockIds: ["3037", "3189", "8046"], name: "JP Morgan", tier: "A", credibility: 82, date: "2026/06/25", summary: "AI/HPC 晶片與先進封裝需求讓高階 ABF 載板重新受到關注。", original: false, subjective: true, included: true, relevance: 84 },
  { id: 16, themeId: "power-supply", stockIds: ["2308", "2301", "6412"], name: "元大研究", tier: "A", credibility: 81, date: "2026/06/24", summary: "AI 機櫃功耗上升，電源供應與能源效率升級成為中期主題。", original: false, subjective: true, included: true, relevance: 80 },
  { id: 17, themeId: "high-speed", stockIds: ["3665", "5269", "6104"], name: "Bloomberg", tier: "A", credibility: 84, date: "2026/06/23", summary: "AI 資料中心高速傳輸與連接需求提升，相關零組件進入研究視野。", original: false, subjective: false, included: true, relevance: 76 },
  { id: 18, themeId: "connector", stockIds: ["3665", "3023", "3217"], name: "凱基研究", tier: "A", credibility: 76, date: "2026/06/22", summary: "高速與高功率連接規格提升，但個股需區分 AI 產品占比。", original: false, subjective: true, included: true, relevance: 73 },
  { id: 19, themeId: "fx-benefit", stockIds: ["2308", "2327", "2383"], name: "MacroMicro", tier: "B", credibility: 74, date: "2026/06/25", summary: "美元與台幣匯率波動影響出口股短期評價與匯兌損益。", original: false, subjective: false, included: true, relevance: 70 },
  { id: 20, themeId: "rate-cut", stockIds: ["3661", "3443", "3017"], name: "Reuters", tier: "A", credibility: 86, date: "2026/06/25", summary: "市場持續評估美國利率路徑，成長股評價對降息預期敏感。", original: false, subjective: false, included: true, relevance: 72 },
  { id: 21, themeId: "defensive-dividend", stockIds: [], name: "Morningstar", tier: "A", credibility: 80, date: "2026/06/21", summary: "市場波動升高時，高股息與防禦型資產可作為風險分散工具。", original: false, subjective: true, included: true, relevance: 65 }
];

export const podcastInsights = [
  { stockId: "2327", program: "股癌 Podcast", episode: "EP625", date: "2026/06/21", theme: "MLCC / 被動元件", summary: "討論被動元件庫存循環與 AI 用量增加。", translation: "需求有變好，但不要只因為題材熱就追高。", coachTake: "把它當作題材理解，不當作進場訊號。回去核對法說、月營收與高階品項占比。", doNotUseAs: "不要把節目提到的族群，直接理解成每檔都會漲。", followUps: ["國巨高階 MLCC 占比是否提升？", "交期拉長是全面需求還是局部品項？", "股價是否已提前反映？"], type: "網友整理", credibility: 72, subjective: true, included: true },
  { stockId: "2327", program: "股癌 Podcast", episode: "EP628", date: "2026/06/24", theme: "AI 第二波零組件", summary: "市場開始從 AI 主晶片往下看被動元件、板材、散熱等第二層供應鏈。", translation: "不是只有最熱門的 ASIC 才叫 AI，很多基礎零組件也會被重新研究。", coachTake: "適合新手學供應鏈拆解：先理解零件角色，再看公司是否真的受惠。", doNotUseAs: "不要把第二波解讀成補漲保證。", followUps: ["哪些零件有實際用量提升？", "哪些公司有法說或營收證據？", "哪些只是社群延伸題材？"], type: "重點整理", credibility: 70, subjective: true, included: true },
  { stockId: "2327", program: "財經節目整理", episode: "產業趨勢週報", date: "2026/06/23", theme: "被動元件", summary: "券商認為高階 MLCC 訂單能見度優於消費型品項。", translation: "比較值得看的是高階產品，不是所有 MLCC 都一樣強。", coachTake: "用這段去對照國巨與華新科產品組合差異。", doNotUseAs: "不要只看族群名稱，忽略公司產品結構。", followUps: ["高階品項毛利率是否較好？", "消費電子復甦是否同步？"], type: "逐字稿", credibility: 76, subjective: true, included: true },
  { stockId: "2383", program: "股癌 Podcast", episode: "EP626", date: "2026/06/22", theme: "PCB / CCL", summary: "AI Server 速度提升，市場重新討論高階板材與訊號完整性。", translation: "伺服器變快後，板材不能只看便宜，規格和良率變重要。", coachTake: "研究台光電時，重點放在高階 CCL 供需、客戶滲透率與毛利率。", doNotUseAs: "不要把所有 PCB 股都視為同等受惠。", followUps: ["高階 CCL 供需是否偏緊？", "台光電客戶滲透率是否提升？", "估值是否已反映 AI 溢價？"], type: "重點整理", credibility: 74, subjective: true, included: true },
  { stockId: "2383", program: "M觀點", episode: "AI Server 板材升級", date: "2026/06/22", theme: "PCB / CCL", summary: "高階 CCL 受惠 AI Server 規格升級。", translation: "伺服器變快、變熱、訊號更難處理，板材價值跟著提高。", coachTake: "搭配法人報告一起看，避免只靠節目觀點。", doNotUseAs: "不要把技術升級直接等於短線追價。", followUps: ["20 日漲幅是否偏大？", "法人是否連續調高預估？"], type: "官方", credibility: 78, subjective: true, included: true },
  { stockId: "2308", program: "股癌 Podcast", episode: "EP629", date: "2026/06/25", theme: "AI Power", summary: "AI Server 耗電提高，電源與能源效率題材變成基礎建設的一部分。", translation: "台達電不是最刺激的題材股，但它能幫新手理解 AI 基建怎麼落到用電。", coachTake: "適合作為穩健型 AI 供應鏈研究，搭配 CapEx 與資料中心耗電趨勢。", doNotUseAs: "不要因為穩健就忽略評價與外資籌碼。", followUps: ["AI 電源占比是否提升？", "資料中心電源規格是否升級？", "股價是否在合理觀察區？"], type: "重點整理", credibility: 73, subjective: true, included: true },
  { stockId: "3017", program: "股癌 Podcast", episode: "EP630", date: "2026/06/25", theme: "散熱", summary: "AI 機櫃功耗增加，散熱變成市場願意反覆討論的剛性需求。", translation: "晶片越強越熱，散熱不是裝飾，是伺服器能不能穩定跑的關鍵。", coachTake: "研究奇鋐時要同時看規格升級和股價是否已經偏熱。", doNotUseAs: "不要把剛性需求解讀成沒有回檔風險。", followUps: ["液冷滲透率是否提高？", "近 20 日漲幅是否過大？", "法人是否仍上修？"], type: "重點整理", credibility: 72, subjective: true, included: true },
  { stockId: "3037", program: "股癌 Podcast", episode: "EP627", date: "2026/06/23", theme: "ABF / CoWoS", summary: "先進封裝與高階載板被重新放入 AI 供應鏈地圖。", translation: "AI 晶片不是只靠設計，封裝和載板也會影響能不能量產。", coachTake: "研究欣興時，把它當作 AI 封裝材料的學習入口。", doNotUseAs: "不要忽略 ABF 本身仍有景氣循環。", followUps: ["ABF 報價是否回穩？", "CoWoS 擴產是否帶動載板需求？", "欣興目前估值在哪？"], type: "重點整理", credibility: 71, subjective: true, included: true }
];

export const cancerDailyBriefs = [
  {
    title: "AI 第二波不要只看名字",
    theme: "AI Server",
    summary: "市場從主晶片延伸到 MLCC、PCB/CCL、散熱、電源與 ABF，但每個環節的受惠強度不同。",
    coachTranslation: "今天要學的是供應鏈拆解：先問這家公司賣什麼，再問 AI Server 真的會不會多用。",
    relatedThemes: ["MLCC / 被動元件", "PCB / CCL", "散熱", "電源供應器"],
    relatedStocks: ["國巨", "台光電", "奇鋐", "台達電"],
    caution: "股癌觀點適合做題材理解，不直接納入買賣訊號。"
  },
  {
    title: "熱門股不是不能研究，是要等價格舒服",
    theme: "散熱 / ASIC",
    summary: "題材正確不代表今天就適合追，漲多後研究價值可能反而下降。",
    coachTranslation: "把追高衝動翻譯成研究任務：找支撐、看 20MA、看法人是否還在買。",
    relatedThemes: ["散熱", "ASIC"],
    relatedStocks: ["奇鋐", "雙鴻", "世芯", "創意"],
    caution: "節目語氣再樂觀，也要回到價格位置與風險報酬。"
  },
  {
    title: "循環股要看復甦證據",
    theme: "MLCC / ABF / 記憶體",
    summary: "庫存去化、報價回升、Lead Time 拉長都可能是復甦線索，但要交叉驗證。",
    coachTranslation: "今天可以學：循環股不是永遠成長股，研究重點是景氣位置與復甦斜率。",
    relatedThemes: ["MLCC / 被動元件", "ABF 載板", "記憶體"],
    relatedStocks: ["國巨", "欣興", "華邦電"],
    caution: "只看題材很容易太早或太晚，月營收和法說要一起看。"
  }
];
