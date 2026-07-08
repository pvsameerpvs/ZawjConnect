import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  DemoProfile: { name?: string };
};

export type HomeStackParamList = {
  Home: undefined;
};

export type PrayerStackParamList = {
  Prayer: undefined;
  PrayerTracker: undefined;
  Qibla: undefined;
};

export type QuranStackParamList = {
  Quran: undefined;
  QuranReader: { surahId?: number };
  QuranBookmarks: undefined;
};

export type DhikrStackParamList = {
  Dhikr: undefined;
};

export type MoreStackParamList = {
  More: undefined;
  Dua: undefined;
  AddDua: { dua?: undefined };
  Tahajjud: undefined;
  Fasting: undefined;
  Zakat: undefined;
  Spouse: undefined;
  InviteCode: undefined;
  JoinInvite: undefined;
  Location: undefined;
  HajjUmrah: undefined;
  Settings: undefined;
  Privacy: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  PrayerTab: undefined;
  QuranTab: undefined;
  DhikrTab: undefined;
  MoreTab: NavigatorScreenParams<MoreStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};
