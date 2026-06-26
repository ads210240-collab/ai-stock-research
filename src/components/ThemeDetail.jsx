import { ArrowLeft } from "lucide-react";
import SourceConsensus from "./SourceConsensus.jsx";
import SupplyChainMap from "./SupplyChainMap.jsx";
import SupplyChainTree from "./SupplyChainTree.jsx";
import RelatedStockTable from "./RelatedStockTable.jsx";
import ThemeRiskPanel from "./ThemeRiskPanel.jsx";
import ScoreBreakdown from "./ScoreBreakdown.jsx";
import DecisionLabel from "./DecisionLabel.jsx";
import ThemeTrendForecast from "./ThemeTrendForecast.jsx";
import MacroImpactPanel from "./MacroImpactPanel.jsx";
import ResearchMetrics from "./ResearchMetrics.jsx";
import { starString } from "../utils/score.js";

export default function ThemeDetail({ theme, stocks, sources, macroFactors, onBack, onStock }) {
  const relatedStocks = stocks.filter((stock) => stock.themeIds.includes(theme.id)).sort((a, b) => b.aiSortScore - a.aiSortScore);
  const relatedSources = sources.filter((source) => source.themeId === theme.id);

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft size={17} /> 回題材中心
      </button>
      <section className="rounded border border-line bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase text-muted">Theme Detail</p>
        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold">{theme.name}</h1>
            <p className="mt-3 text-base leading-7 text-muted">{theme.description}</p>
            <div className="mt-3">
              <DecisionLabel label={theme.decision} showExplain />
            </div>
            <div className="mt-4 rounded border border-blue-100 bg-blue-50 p-3">
              <p className="text-xs font-semibold text-accent">為什麼最近市場在討論它</p>
              <p className="mt-1 text-sm leading-6">{theme.whyNow}</p>
            </div>
          </div>
          <div className="grid min-w-full grid-cols-2 gap-2 sm:min-w-80">
            <Metric label="市場熱度" value={starString(theme.researchMetrics.heat.score)} />
            <Metric label="市場共識" value={starString(theme.researchMetrics.consensus.score)} />
            <Metric label="風險" value={theme.risk} />
            <Metric label="趨勢" value={theme.trend} />
          </div>
        </div>
      </section>
      <ResearchMetrics metrics={theme.researchMetrics} />
      <ScoreBreakdown breakdown={theme.scoreBreakdown} type="theme" />
      <ThemeTrendForecast theme={theme} />
      <MacroImpactPanel factors={macroFactors} theme={theme} />
      <SourceConsensus sources={relatedSources} />
      {theme.id === "ai-server" ? <SupplyChainTree tree={theme.supplyChain} /> : <SupplyChainMap theme={theme} />}
      <RelatedStockTable stocks={relatedStocks} onStock={onStock} />
      <ThemeRiskPanel theme={theme} />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded border border-line bg-paper p-3">
      <span className="block text-xs text-muted">{label}</span>
      <span className="mt-1 block text-xl font-semibold">{value}</span>
    </div>
  );
}
