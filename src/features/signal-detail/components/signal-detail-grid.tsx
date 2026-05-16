import { Text, useWindowDimensions, View } from "react-native";

import { SignalDetailsCard } from "@/features/dashboard/components/signal-details-card";
import { SignalOverviewCard } from "@/features/dashboard/components/signal-overview-card";
import { DriversCard } from "@/features/dashboard/components/drivers-card";
import { RegimeOutlookCard } from "@/features/dashboard/components/regime-outlook-card";
import {
  signalDetailMeta,
  signalDetailMock,
} from "@/features/signal-detail/data/signal-detail-mock";
import {
  toDrivers,
  toRegime,
  toSignalDetails,
  toSignalSummary,
} from "@/features/signal-detail/utils/signal-detail-transform";
import { useTheme } from "@/theme";
import { SignalDetailHeader } from "@/features/signal-detail/components/signal-detail-header";
import { RiskFlagsCard } from "@/features/signal-detail/components/risk-flags-card";
import { IndicatorContributionsCard } from "@/features/signal-detail/components/indicator-contributions-card";
import { Card } from "@/components/ui/card";

export function SignalDetailGrid({
  tickerOverride,
}: {
  tickerOverride?: string;
}) {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDesktop = width >= 1180;
  const isTablet = width >= 760;

  const signal = {
    ...signalDetailMock,
    ticker: tickerOverride?.toUpperCase() ?? signalDetailMock.ticker,
  };

  const summary = toSignalSummary(signal, signalDetailMeta);
  const details = toSignalDetails(signal);
  const drivers = toDrivers(signal);
  const regime = toRegime(signal);

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <SignalDetailHeader
        ticker={signal.ticker}
        company={signalDetailMeta.company}
        updatedAt={signalDetailMeta.updatedAt}
      />

      <Card>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.h3,
            fontWeight: "700",
          }}
        >
          Forward Guidance
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.body,
            marginTop: theme.spacing.sm,
          }}
        >
          {signal.explanation.forward_guidance}
        </Text>
      </Card>

      {isDesktop ? (
        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
          <View style={{ flex: 1.15, gap: theme.spacing.md }}>
            <SignalOverviewCard signalSummary={summary} />
            <IndicatorContributionsCard signal={signal} />
          </View>
          <View style={{ flex: 0.95, gap: theme.spacing.md }}>
            <SignalDetailsCard signalDetails={details} />
            <RiskFlagsCard flags={signal.risk_flags} />
          </View>
          <View style={{ flex: 0.9, gap: theme.spacing.md }}>
            <DriversCard drivers={drivers} />
            <RegimeOutlookCard regime={regime} />
          </View>
        </View>
      ) : isTablet ? (
        <View style={{ gap: theme.spacing.md }}>
          <SignalOverviewCard signalSummary={summary} />
          <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <View style={{ flex: 1, gap: theme.spacing.md }}>
              <SignalDetailsCard signalDetails={details} />
              <RiskFlagsCard flags={signal.risk_flags} />
            </View>
            <View style={{ flex: 1, gap: theme.spacing.md }}>
              <DriversCard drivers={drivers} />
              <RegimeOutlookCard regime={regime} />
            </View>
          </View>
          <IndicatorContributionsCard signal={signal} />
        </View>
      ) : (
        <View style={{ gap: theme.spacing.md }}>
          <SignalOverviewCard signalSummary={summary} />
          <SignalDetailsCard signalDetails={details} />
          <DriversCard drivers={drivers} />
          <RiskFlagsCard flags={signal.risk_flags} />
          <RegimeOutlookCard regime={regime} />
          <IndicatorContributionsCard signal={signal} />
        </View>
      )}
    </View>
  );
}
