import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";

type ScreenProps = PropsWithChildren<{
  contentContainerStyle?: ViewStyle;
}>;

export function Screen({ children, contentContainerStyle }: ScreenProps) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768;
  const horizontalPadding = isDesktop ? theme.spacing.xxl : isTablet ? theme.spacing.xl : theme.spacing.md;
  const verticalPadding = isDesktop ? theme.spacing.xl : theme.spacing.lg;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: 96,
            paddingHorizontal: horizontalPadding,
            paddingTop: verticalPadding,
          },
        ]}
      >
        <View
          style={[
            {
              alignSelf: "center",
              gap: isDesktop ? theme.spacing.xl : theme.spacing.lg,
              maxWidth: 1120,
              width: "100%",
            },
            contentContainerStyle,
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {},
});
