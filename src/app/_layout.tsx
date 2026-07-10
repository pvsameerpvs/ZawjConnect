import "../../global.css";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { FamilyProvider } from "../features/family/stores/FamilyContext";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <FamilyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="more" />
      </Stack>
    </FamilyProvider>
  );
}
