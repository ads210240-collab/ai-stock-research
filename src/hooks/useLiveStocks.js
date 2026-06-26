import { useEffect, useMemo, useState } from "react";
import { fetchLiveStocks, mergeLiveStock } from "../services/stockDataClient.js";

export function useLiveStocks(mockStocks) {
  const symbols = useMemo(() => mockStocks.map((stock) => stock.code), [mockStocks]);
  const [snapshots, setSnapshots] = useState({});
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus({ loading: true, error: "" });
      const data = await fetchLiveStocks(symbols);
      if (cancelled) return;
      setSnapshots(data);
      setStatus({
        loading: false,
        error: Object.keys(data).length ? "" : "目前使用前端離線研究資料。未來設定 VITE_API_URL 後，會自動切換即時資料。"
      });
    }

    load();
    const timer = window.setInterval(load, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [symbols]);

  const stocks = useMemo(() => (
    mockStocks.map((stock) => mergeLiveStock(stock, snapshots[stock.code]))
  ), [mockStocks, snapshots]);

  return {
    stocks,
    loading: status.loading,
    error: status.error,
    liveCount: Object.keys(snapshots).length
  };
}
