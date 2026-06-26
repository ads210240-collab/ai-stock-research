import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MiniPriceChart({ data }) {
  return (
    <div className="h-48 w-full rounded border border-line bg-white p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={5} />
          <YAxis tick={{ fontSize: 10 }} domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip formatter={(value, name) => [value, name === "close" ? "收盤" : name === "ma5" ? "5 日均線" : name === "ma20" ? "20 日均線" : "60 日均線"]} />
          <Line type="monotone" dataKey="close" stroke="#0b6bcb" strokeWidth={2.2} dot={false} />
          <Line type="monotone" dataKey="ma5" stroke="#b7791f" strokeWidth={1.6} dot={false} />
          <Line type="monotone" dataKey="ma20" stroke="#64748b" strokeWidth={1.6} dot={false} />
          <Line type="monotone" dataKey="ma60" stroke="#94a3b8" strokeWidth={1.2} strokeDasharray="4 4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
