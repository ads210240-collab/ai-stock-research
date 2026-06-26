import MarketSummary from "./MarketSummary.jsx";
import ThemeCard from "./ThemeCard.jsx";
import ThemeRanking from "./ThemeRanking.jsx";
import SuggestedStocks from "./SuggestedStocks.jsx";
import TodayFocus from "./TodayFocus.jsx";
import MacroImpactPanel from "./MacroImpactPanel.jsx";
import DailyMission from "./DailyMission.jsx";
import CancerDailyPanel from "./CancerDailyPanel.jsx";
import { cancerDailyBriefs } from "../mockData/sources.js";

export default function ThemeDashboard({ marketSummary, macroFactors, todayFocus, themes, stocks, onTheme, onStock }) {
  return (
    <div className="space-y-5">
      <DailyMission themes={themes} stocks={stocks} onTheme={onTheme} onStock={onStock} />
      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <MarketSummary summary={marketSummary} />
        <div className="hidden lg:block">
          <ThemeRanking themes={themes} />
        </div>
      </section>
      <TodayFocus focus={todayFocus} themes={themes} onTheme={onTheme} />
      <CancerDailyPanel briefs={cancerDailyBriefs} />
      <MacroImpactPanel factors={macroFactors} />
      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">今天哪些題材值得研究？</h1>
            <p className="mt-1 text-sm text-muted">這區在看市場正在討論什麼、為什麼重要，以及新手今天該怎麼看。</p>
          </div>
          <span className="hidden rounded bg-terminal px-3 py-1 text-xs font-medium text-white sm:inline">研究輔助，不是買賣建議</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} onClick={() => onTheme(theme.id)} />
          ))}
        </div>
      </section>
      <SuggestedStocks stocks={stocks} onStock={onStock} />
    </div>
  );
}
