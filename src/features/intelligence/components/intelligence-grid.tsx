import { useWindowDimensions, View } from "react-native";

import { EventTagsCard } from "@/features/intelligence/components/event-tags-card";
import { IntelligenceHeader } from "@/features/intelligence/components/intelligence-header";
import { MarketInsightsCard } from "@/features/intelligence/components/market-insights-card";
import { NewsListCard } from "@/features/intelligence/components/news-list-card";
import { SentimentPulseCard } from "@/features/intelligence/components/sentiment-pulse-card";
import { intelligenceMock } from "@/features/intelligence/data/intelligence-mock";
import { useTheme } from "@/theme";

export function IntelligenceGrid() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDesktop = width >= 1080;
  const isTablet = width >= 760;

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <IntelligenceHeader
        title={intelligenceMock.title}
        subtitle={intelligenceMock.subtitle}
        isDesktop={isDesktop}
      />

      {isDesktop ? (
        <>
          <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <View style={{ flex: 0.95 }}>
              <SentimentPulseCard items={intelligenceMock.sentimentPulse} />
            </View>
            <View style={{ flex: 1.05 }}>
              <EventTagsCard items={intelligenceMock.eventTags} />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <View style={{ flex: 1.15 }}>
              <MarketInsightsCard items={intelligenceMock.marketInsights} />
            </View>
            <View style={{ flex: 0.85 }}>
              <NewsListCard items={intelligenceMock.news} />
            </View>
          </View>
        </>
      ) : isTablet ? (
        <>
          <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <View style={{ flex: 1 }}>
              <SentimentPulseCard items={intelligenceMock.sentimentPulse} />
            </View>
            <View style={{ flex: 1 }}>
              <EventTagsCard items={intelligenceMock.eventTags} />
            </View>
          </View>

          <MarketInsightsCard items={intelligenceMock.marketInsights} />
          <NewsListCard items={intelligenceMock.news} />
        </>
      ) : (
        <>
          <SentimentPulseCard items={intelligenceMock.sentimentPulse} />
          <EventTagsCard items={intelligenceMock.eventTags} />
          <MarketInsightsCard items={intelligenceMock.marketInsights} />
          <NewsListCard items={intelligenceMock.news} />
        </>
      )}
    </View>
  );
}
