import { ArrowLeft } from "lucide-react";
import StockSummary from "./StockSummary.jsx";
import WhyThisStock from "./WhyThisStock.jsx";
import PriceTrendPanel from "./PriceTrendPanel.jsx";
import ScoreBreakdown from "./ScoreBreakdown.jsx";
import ResearchMetrics from "./ResearchMetrics.jsx";
import FundamentalAnalysis from "./FundamentalAnalysis.jsx";
import TechnicalAnalysis from "./TechnicalAnalysis.jsx";
import InstitutionalView from "./InstitutionalView.jsx";
import PodcastInsights from "./PodcastInsights.jsx";
import StrategyRecommendation from "./StrategyRecommendation.jsx";
import ResearchZone from "./ResearchZone.jsx";
import ScenarioAnalysis from "./ScenarioAnalysis.jsx";
import FairValuePanel from "./FairValuePanel.jsx";
import SafetyMarginPanel from "./SafetyMarginPanel.jsx";
import EntryZone from "./EntryZone.jsx";
import EntryPlanner from "./EntryPlanner.jsx";
import SevenDayTimeline from "./SevenDayTimeline.jsx";
import BeginnerGlossary from "./BeginnerGlossary.jsx";
import LearningMode from "./LearningMode.jsx";
import WatchZone from "./WatchZone.jsx";

export default function StockDetail({ stock, themes, sources, glossary, onBack, onTheme }) {
  const relatedThemes = themes.filter((theme) => stock.themeIds.includes(theme.id));
  const relatedSources = sources.filter((source) => source.stockIds?.includes(stock.id));

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft size={17} /> 回題材中心
      </button>
      <StockSummary stock={stock} />
      <PriceTrendPanel stock={stock} />
      <ResearchZone stock={stock} />
      <ScenarioAnalysis stock={stock} />
      <div className="grid gap-5 lg:grid-cols-2">
        <FairValuePanel stock={stock} />
        <SafetyMarginPanel stock={stock} />
      </div>
      <LearningMode stock={stock} />
      <WhyThisStock stock={stock} themes={relatedThemes} sources={relatedSources} onTheme={onTheme} />
      <ResearchMetrics metrics={stock.researchMetrics} />
      <ScoreBreakdown breakdown={stock.scoreBreakdown} type="stock" />
      <div className="grid gap-5 lg:grid-cols-2">
        <FundamentalAnalysis stock={stock} />
        <TechnicalAnalysis stock={stock} />
      </div>
      <InstitutionalView stock={stock} />
      <PodcastInsights stock={stock} />
      <StrategyRecommendation stock={stock} />
      <EntryZone stock={stock} />
      <EntryPlanner stock={stock} />
      <WatchZone key={stock.id} stock={stock} />
      <SevenDayTimeline stock={stock} />
      <BeginnerGlossary glossary={glossary} />
    </div>
  );
}
