import { useWindowDimensions, View } from "react-native";

import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DriversCard } from "@/features/dashboard/components/drivers-card";
import { MarketIndexStrip } from "@/features/dashboard/components/market-index-strip";
import { MarketPulseCard } from "@/features/dashboard/components/market-pulse-card";
import { RegimeOutlookCard } from "@/features/dashboard/components/regime-outlook-card";
import { SignalDetailsCard } from "@/features/dashboard/components/signal-details-card";
import { SignalOverviewCard } from "@/features/dashboard/components/signal-overview-card";
import { dashboardMock } from "@/features/dashboard/data/dashboard-mock";
import { getMarketTileColumns } from "@/features/dashboard/utils/dashboard-layout";
import { useTheme } from "@/theme";

export function DashboardGrid() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDesktop = width >= 1180;
  const isTablet = width >= 760;
  const marketTileColumns = getMarketTileColumns(width);

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <DashboardHeader title={dashboardMock.greeting} isDesktop={isDesktop} />
      <MarketIndexStrip
        indices={dashboardMock.indices}
        columns={marketTileColumns}
        viewportWidth={width}
      />

      {isDesktop ? (
        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
          <View style={{ flex: 1.4, gap: theme.spacing.md }}>
            <MarketPulseCard pulse={dashboardMock.marketPulse} />
            <SignalOverviewCard signalSummary={dashboardMock.signalSummary} />
          </View>
          <View style={{ flex: 1.1, gap: theme.spacing.md }}>
            <SignalDetailsCard signalDetails={dashboardMock.signalDetails} />
          </View>
          <View style={{ flex: 0.95, gap: theme.spacing.md }}>
            <DriversCard drivers={dashboardMock.drivers} />
            <RegimeOutlookCard regime={dashboardMock.regime} />
          </View>
        </View>
      ) : isTablet ? (
        <View style={{ gap: theme.spacing.md }}>
          <MarketPulseCard pulse={dashboardMock.marketPulse} />
          <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <View style={{ flex: 1, gap: theme.spacing.md }}>
              <SignalOverviewCard signalSummary={dashboardMock.signalSummary} />
              <DriversCard drivers={dashboardMock.drivers} />
            </View>
            <View style={{ flex: 1, gap: theme.spacing.md }}>
              <SignalDetailsCard signalDetails={dashboardMock.signalDetails} />
              <RegimeOutlookCard regime={dashboardMock.regime} />
            </View>
          </View>
        </View>
      ) : (
        <View style={{ gap: theme.spacing.md }}>
          <MarketPulseCard pulse={dashboardMock.marketPulse} />
          <SignalOverviewCard signalSummary={dashboardMock.signalSummary} />
          <SignalDetailsCard signalDetails={dashboardMock.signalDetails} />
          <DriversCard drivers={dashboardMock.drivers} />
          <RegimeOutlookCard regime={dashboardMock.regime} />
        </View>
      )}
    </View>
  );
}
