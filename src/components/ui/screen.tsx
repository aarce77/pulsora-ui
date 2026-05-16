import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";

type ScreenProps = PropsWithChildren<{
  contentContainerStyle?: ViewStyle;
}>;

export function Screen({ children, contentContainerStyle }: ScreenProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { padding: theme.spacing.lg, gap: theme.spacing.lg },
          contentContainerStyle,
        ]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingBottom: 96,
  },
});
