import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { useTheme } from "@/theme";

type ConfidenceRingProps = {
  score: number;
  size?: number;
};

export function ConfidenceRing({ score, size = 128 }: ConfidenceRingProps) {
  const { theme } = useTheme();
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.borderSubtle}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.success}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-120 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View
        style={{
          position: "absolute",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.colors.textPrimary, fontSize: 38, fontWeight: "700" }}>{score}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>/ 100</Text>
      </View>
    </View>
  );
}
