export default function EntryPlanner({ stock }) {
  const action = stock.status;
  return (
    <section className="rounded border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase text-muted">Entry Planner</p>
      <h2 className="mt-1 text-xl font-semibold">進場策略</h2>
      <div className="mt-3 rounded border border-blue-100 bg-blue-50 p-3 text-sm leading-6">
        AI 狀態：<b>{action}</b>。這裡用「可以開始建立部位 / 等待拉回 / 暫時觀望 / 波動過大，不適合新手」描述研究節奏，不直接寫買或賣。
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Plan title="30,000 元分三筆示範" amount={30000} status={action} />
        <Plan title="100,000 元分三筆示範" amount={100000} status={action} />
      </div>
      <div className="mt-3 rounded border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
        最大風險提醒：若題材轉弱、來源共識下降或股價跌破原本觀察位置，需重新評估假設，不要因為已投入第一筆就自動加碼。
      </div>
    </section>
  );
}

function Plan({ title, amount, status }) {
  const first = Math.round(amount * 0.33 / 100) * 100;
  const second = Math.round(amount * 0.33 / 100) * 100;
  const third = amount - first - second;
  const trigger = status === "可研究" ? "確認題材與來源仍成立" : status === "等待拉回" ? "拉回到支撐並量縮" : "暫不執行，只建立觀察";
  return (
    <div className="rounded border border-line bg-paper p-3">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3 grid gap-2 text-sm">
        <Step label="第一筆" amount={first} trigger={trigger} />
        <Step label="第二筆" amount={second} trigger="AI 分數維持或上升，且未出現過熱訊號" />
        <Step label="第三筆" amount={third} trigger="財報、營收或法人資料繼續支持研究假設" />
      </div>
    </div>
  );
}

function Step({ label, amount, trigger }) {
  return (
    <div className="rounded border border-line bg-white p-2">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium">{label}</span>
        <span>{amount.toLocaleString()} 元</span>
      </div>
      <p className="mt-1 text-xs leading-5 text-muted">{trigger}</p>
    </div>
  );
}
