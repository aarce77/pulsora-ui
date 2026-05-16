import { memo, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { useTheme } from "@/theme";

type SparklineProps = {
  points: number[];
  width?: number;
  height?: number;
  direction?: "up" | "down" | "neutral";
  minWidth?: number;
};

function buildPath(points: number[], width: number, height: number) {
  if (points.length === 0) {
    return "";
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = points.length > 1 ? width / (points.length - 1) : width;

  return points
    .map((point, index) => {
      const x = index * step;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildArea(path: string, width: number, height: number) {
  if (!path) {
    return "";
  }

  return `${path} L ${width} ${height} L 0 ${height} Z`;
}

function SparklineBase({
  points,
  width,
  height = 44,
  direction = "up",
  minWidth = 132,
}: SparklineProps) {
  const { theme } = useTheme();
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(width ?? null);

  const stroke =
    direction === "down"
      ? theme.colors.danger
      : direction === "neutral"
        ? theme.colors.primary
        : theme.colors.success;

  const resolvedWidth = width ?? measuredWidth ?? minWidth;
  const values = points.length ? points : [0];
  const path = buildPath(values, resolvedWidth, height);
  const area = buildArea(path, resolvedWidth, height);
  const gradientId = `spark-${stroke.replace("#", "")}-${Math.round(resolvedWidth)}-${height}`;

  function handleLayout(event: LayoutChangeEvent) {
    if (width) {
      return;
    }

    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    if (nextWidth > 0 && nextWidth !== measuredWidth) {
      setMeasuredWidth(nextWidth);
    }
  }

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onLayout={handleLayout}
      style={width ? undefined : { width: "100%" }}
    >
      <Svg width={resolvedWidth} height={height} viewBox={`0 0 ${resolvedWidth} ${height}`} fill="none">
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={stroke} stopOpacity={0.24} />
            <Stop offset="100%" stopColor={stroke} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Path d={area} fill={`url(#${gradientId})`} />
        <Path d={path} stroke={stroke} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

export const Sparkline = memo(SparklineBase);
