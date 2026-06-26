import { podcastInsights } from "../mockData/sources.js";

export default function PodcastInsights({ stock }) {
  const rows = podcastInsights.filter((item) => item.stockId === stock.id);
  const display = rows.length ? rows : [{
    program: "股癌 / Podcast 觀點",
    episode: "待補來源",
    date: "最近七天",
    theme: stock.themes?.[0],
    summary: "目前沒有足夠可驗證節目資料，AI 不會用未確認社群心得提高研究優先度。",
    translation: "沒有可靠來源就先不要硬解讀。",
    coachTake: "先把這檔股票放入觀察清單，等待節目、法說或法人報告出現可交叉驗證的重點。",
    doNotUseAs: "不要把社群轉述當成正式研究來源。",
    followUps: ["是否有原始節目或逐字稿？", "是否能對照財報或法說？", "是否只是網友情緒？"],
    type: "網友整理",
    credibility: 40,
    subjective: true,
    included: false
  }];

  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Podcast Insights</p>
      <h2 className="mt-1 text-xl font-semibold">股癌觀點與 AI 教練整理</h2>
      <p className="mt-1 text-sm leading-6 text-muted">這區把股癌或財經節目的觀點整理成「可以學什麼、要查什麼、不能怎麼用」。主觀內容會標示，不會直接當成買賣建議。</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {display.map((item) => (
          <article key={`${item.program}-${item.episode}`} className="rounded border border-line bg-paper p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{item.program}</h3>
                <p className="text-xs text-muted">{item.episode} · {item.date} · {item.theme || stock.themes?.[0]}</p>
              </div>
              <span className="rounded bg-white px-2 py-1 text-xs">{item.type}</span>
            </div>
            <p className="mt-3 text-sm leading-6">{item.summary}</p>
            <p className="mt-2 rounded border border-blue-100 bg-blue-50 p-2 text-sm leading-6"><b>新手翻譯：</b>{item.translation}</p>
            <p className="mt-2 rounded border border-emerald-100 bg-emerald-50 p-2 text-sm leading-6 text-emerald-900"><b>AI 教練整理：</b>{item.coachTake}</p>
            <p className="mt-2 rounded border border-amber-200 bg-amber-50 p-2 text-sm leading-6 text-amber-900"><b>不能怎麼用：</b>{item.doNotUseAs}</p>
            <div className="mt-3 rounded border border-line bg-white p-2">
              <p className="text-xs font-semibold text-muted">接下來要追蹤的問題</p>
              <div className="mt-2 space-y-1 text-sm leading-6">
                {item.followUps?.map((question) => <p key={question}>• {question}</p>)}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <Flag label="可信度" value={item.credibility} />
              <Flag label="主觀判斷" value={item.subjective ? "有" : "無"} />
              <Flag label="納入評分" value={item.included ? "是" : "否"} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Flag({ label, value }) {
  return <div className="rounded border border-line bg-white px-2 py-2"><span className="block text-muted">{label}</span><b>{value}</b></div>;
}
