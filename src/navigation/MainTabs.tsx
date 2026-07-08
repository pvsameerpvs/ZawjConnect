import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { MainTabParamList } from './types';
import MoreStack from './MoreStack';
import HomeScreen from '../screens/home/HomeScreen';
import PrayerScreen from '../screens/prayer/PrayerScreen';
import PrayerTrackerScreen from '../screens/prayer/PrayerTrackerScreen';
import QiblaScreen from '../screens/prayer/QiblaScreen';
import QuranScreen from '../screens/quran/QuranScreen';
import QuranReaderScreen from '../screens/quran/QuranReaderScreen';
import QuranBookmarksScreen from '../screens/quran/QuranBookmarksScreen';
import DhikrScreen from '../screens/dhikr/DhikrScreen';

const HomeStack = createNativeStackNavigator();
const PrayerStack = createNativeStackNavigator();
const QuranStack = createNativeStackNavigator();
const DhikrStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<MainTabParamList>();

const stackOptions = { headerShown: false, animation: 'slide_from_right' as const };

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={stackOptions}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

const PrayerStackScreen = () => (
  <PrayerStack.Navigator screenOptions={stackOptions}>
    <PrayerStack.Screen name="Prayer" component={PrayerScreen} />
    <PrayerStack.Screen name="PrayerTracker" component={PrayerTrackerScreen} />
    <PrayerStack.Screen name="Qibla" component={QiblaScreen} />
  </PrayerStack.Navigator>
);

const QuranStackScreen = () => (
  <QuranStack.Navigator screenOptions={stackOptions}>
    <QuranStack.Screen name="Quran" component={QuranScreen} />
    <QuranStack.Screen name="QuranReader" component={QuranReaderScreen} />
    <QuranStack.Screen name="QuranBookmarks" component={QuranBookmarksScreen} />
  </QuranStack.Navigator>
);

const DhikrStackScreen = () => (
  <DhikrStack.Navigator screenOptions={stackOptions}>
    <DhikrStack.Screen name="Dhikr" component={DhikrScreen} />
  </DhikrStack.Navigator>
);

const MainTabs: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.borderLight,
          height: 50 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 1,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PrayerTab"
        component={PrayerStackScreen}
        options={{
          tabBarLabel: 'Prayer',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'moon' : 'moon-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="QuranTab"
        component={QuranStackScreen}
        options={{
          tabBarLabel: 'Quran',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DhikrTab"
        component={DhikrStackScreen}
        options={{
          tabBarLabel: 'Dhikr',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreStack}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
