import { Stack } from "expo-router";

export default function FamilyStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="members" />
      <Stack.Screen name="grocery" />
      <Stack.Screen name="grocerydetail" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="expenses" />
      <Stack.Screen name="addexpense" />
      <Stack.Screen name="summary" />
    </Stack>
  );
}
