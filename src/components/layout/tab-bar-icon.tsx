import { LucideIcon } from "lucide-react-native";

type TabBarIconProps = {
  color: string;
  focused: boolean;
  icon: LucideIcon;
};

export function TabBarIcon({ color, focused, icon: Icon }: TabBarIconProps) {
  return <Icon color={color} size={focused ? 22 : 20} strokeWidth={focused ? 2.4 : 2} />;
}
