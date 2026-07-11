import "../../global.css";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { FamilyProvider } from "../features/family/stores/FamilyContext";
import { View, StatusBar } from "react-native";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <FamilyProvider>
      <View className="flex-1 bg-surface">
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="more" />
        </Stack>
      </View>
    </FamilyProvider>
  );
}
