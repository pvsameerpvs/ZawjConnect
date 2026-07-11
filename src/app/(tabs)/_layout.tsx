import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Platform } from 'react-native';
import { Tabs, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import Icon from "../../components/Icon";

const TABS = [
  { name: "index", title: "Home", icon: "home", href: "/(tabs)" },
  { name: "prayer", title: "Prayer", icon: "moon", href: "/(tabs)/prayer" },
  { name: "family", title: "Family", icon: "users", href: "/(tabs)/family" },
  { name: "more", title: "More", icon: "grid", href: "/(tabs)/more" },
] as const;

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  const scale = useRef(new Animated.Value(focused ? 1 : 0.85)).current;
  const opacity = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: focused ? 1 : 0.85, useNativeDriver: true, friction: 8, tension: 100 }),
      Animated.timing(opacity, { toValue: focused ? 1 : 0, duration: 150, useNativeDriver: true }),
    ]).start();
  }, [focused]);

  return (
    <View className="items-center justify-center">
      <View className="w-10 h-10 rounded-2xl items-center justify-center overflow-hidden">
        <Icon name={icon} size={22} color={focused ? colors.primary : colors.muted} />
      </View>
      <Animated.View
        className="absolute bottom-0 w-5 h-[3px] rounded-full bg-primary"
        style={{ opacity, transform: [{ scaleX: scale }] }}
      />
    </View>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const activeIndex = state.routes.findIndex((route: any) => {
    const tab = TABS.find(t => t.name === route.name);
    if (!tab) return false;
    const routePath = route.name === "index" ? "/(tabs)" : `/(tabs)/${route.name}`;
    return pathname.startsWith(routePath) || pathname === routePath;
  });
  const currentIndex = activeIndex >= 0 ? activeIndex : 0;

  return (
    <View
      className="absolute bottom-0 left-0 right-0"
      style={{ paddingBottom: insets.bottom + 8, paddingTop: 0 }}
    >
      <View
        className="mx-4 flex-row items-center justify-around rounded-[28px] bg-white px-3 py-1"
        style={{
          height: 66,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
          borderWidth: Platform.OS === 'ios' ? 0 : 0.5,
          borderColor: 'rgba(0,0,0,0.04)',
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const tab = TABS.find(t => t.name === route.name);
          if (!tab) return null;

          const isFocused = index === currentIndex;
          const label = descriptors[route.key]?.options?.title || tab.title;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              className="items-center justify-center"
              style={{ flex: 1, height: 56 }}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            >
              <TabIcon icon={tab.icon} focused={isFocused} />
              <Text
                className="text-[10px] font-bold tracking-wide mt-1"
                style={{ color: isFocused ? colors.primary : colors.muted }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="prayer" options={{ title: "Prayer" }} />
      <Tabs.Screen name="family" options={{ title: "Family" }} />
      <Tabs.Screen name="more" options={{ title: "More" }} />
    </Tabs>
  );
}
