import { Stack } from "expo-router";

export default function MoreLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dua" />
      <Stack.Screen name="adddua" />
      <Stack.Screen name="tahajjud" />
      <Stack.Screen name="fasting" />
      <Stack.Screen name="zakat" />
      <Stack.Screen name="spouse" />
      <Stack.Screen name="invitecode" />
      <Stack.Screen name="joininvite" />
      <Stack.Screen name="location" />
      <Stack.Screen name="hajjumrah" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="prayertracker" />
      <Stack.Screen name="qibla" />
    </Stack>
  );
}
