import React, { useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import {
  mockUser,
  mockHijriDate,
  mockGregorianDate,
  mockPrayerTimes,
  mockPrayerProgress,
  mockQuranProgress,
  mockDhikrCounts,
  mockSpouseProgress,
} from '../../constants/mockData';
import ScreenWrapper from '../../components/ScreenWrapper';
import IslamicCard from '../../components/IslamicCard';
import SectionHeader from '../../components/SectionHeader';
import ProgressBar from '../../components/ProgressBar';
import ProgressRing from '../../components/ProgressRing';

const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const PRAYER_MINUTES: Record<string, number> = {
  Fajr: 4 * 60 + 18,
  Dhuhr: 12 * 60 + 24,
  Asr: 15 * 60 + 47,
  Maghrib: 19 * 60 + 12,
  Isha: 20 * 60 + 35,
};

const getNextPrayer = (): { name: string; time: string } => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (const prayer of PRAYER_ORDER) {
    if (currentMinutes < PRAYER_MINUTES[prayer]) {
      return { name: prayer, time: mockPrayerTimes[prayer] };
    }
  }
  return { name: 'Fajr', time: mockPrayerTimes.Fajr };
};

const quickActions = [
  { title: 'Prayer', icon: 'moon-outline' as const, route: 'PrayerTab', color: colors.primary },
  { title: 'Quran', icon: 'book-outline' as const, route: 'QuranTab', color: colors.ink },
  { title: 'Dhikr', icon: 'repeat-outline' as const, route: 'DhikrTab', color: colors.accent },
  { title: 'Dua', icon: 'hand-left-outline' as const, route: 'Dua', color: colors.success },
  { title: 'Spouse', icon: 'heart-outline' as const, route: 'Spouse', color: colors.error },
  { title: 'Zakat', icon: 'wallet-outline' as const, route: 'Zakat', color: colors.accentDark },
  { title: 'Tahajjud', icon: 'moon' as const, route: 'Tahajjud', color: colors.inkLight },
  { title: 'Fasting', icon: 'restaurant-outline' as const, route: 'Fasting', color: colors.primaryLight },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const nextPrayer = useMemo(() => getNextPrayer(), []);

  const handleNavigate = (route: string) => {
    if (route === 'PrayerTab' || route === 'QuranTab' || route === 'DhikrTab') {
      navigation.navigate(route);
    } else {
      navigation.navigate('MoreTab', { screen: route });
    }
  };

  const completedPrayers = Object.values(mockPrayerProgress).filter(Boolean).length;
  const totalPrayers = Object.keys(mockPrayerProgress).length;
  const salahProgress = completedPrayers / totalPrayers;

  const totalDhikr = Object.values(mockDhikrCounts).reduce((sum, count) => sum + count, 0);
  const totalDhikrGoal = 33 + 33 + 34 + 100 + 100;
  const dhikrProgress = totalDhikr / totalDhikrGoal;
  const quranProgress = mockQuranProgress.completedToday / mockQuranProgress.dailyGoal;

  return (
    <View className="flex-1 bg-surface">
      <LinearGradient
        colors={[colors.ink, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-b-3xl"
        style={{ paddingTop: insets.top + 16, paddingBottom: 8 }}
      >
        <View className="px-5 flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-white/60 text-xs font-medium">Assalamu Alaikum</Text>
            <Text className="text-white text-lg font-bold mt-0.5">{mockUser.name}</Text>
            <Text className="text-accent-light text-xs mt-0.5">{mockHijriDate}</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20">
            <Icon name="person-outline" size={20} color={colors.accentLight} />
          </View>
        </View>

        {/* Next Prayer Mini Card */}
        <TouchableOpacity
          onPress={() => handleNavigate('PrayerTab')}
          activeOpacity={0.8}
          className="mx-5 mb-4 bg-white/10 rounded-2xl px-4 py-3 flex-row items-center border border-white/10"
        >
          <View className="w-10 h-10 rounded-xl bg-accent/20 items-center justify-center mr-3">
            <Icon name="moon-outline" size={20} color={colors.accentLight} />
          </View>
          <View className="flex-1">
            <Text className="text-white/60 text-xs">Next Prayer</Text>
            <Text className="text-white text-base font-semibold">{nextPrayer.name} · {nextPrayer.time}</Text>
          </View>
          <View className="bg-white/10 rounded-xl px-3 py-1.5">
            <Text className="text-accent-light text-xs font-semibold">
              {completedPrayers}/{totalPrayers}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-3 pb-4" style={{ gap: 14 }}>
          {/* Progress Overview Row */}
          <View className="flex-row gap-2.5">
            <TouchableOpacity
              onPress={() => handleNavigate('PrayerTab')}
              activeOpacity={0.7}
              className="flex-1 bg-white rounded-2xl p-4"
              style={{ shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
            >
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-xl bg-primary/10 items-center justify-center mr-2">
                  <Icon name="moon-outline" size={16} color={colors.primary} />
                </View>
                <Text className="text-sm font-semibold text-ink">Salah</Text>
              </View>
              <ProgressRing progress={salahProgress} size={52} strokeWidth={4} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigate('QuranTab')}
              activeOpacity={0.7}
              className="flex-1 bg-white rounded-2xl p-4"
              style={{ shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
            >
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-xl bg-ink/10 items-center justify-center mr-2">
                  <Icon name="book-outline" size={16} color={colors.primary} />
                </View>
                <Text className="text-sm font-semibold text-ink">Quran</Text>
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-2xl font-bold text-ink">{mockQuranProgress.completedToday}</Text>
                <Text className="text-xs text-muted">of {mockQuranProgress.dailyGoal} ayahs</Text>
                <View className="h-1.5 bg-surface rounded-full mt-2 overflow-hidden">
                  <View className="h-full bg-primary rounded-full" style={{ width: `${Math.min(quranProgress * 100, 100)}%` }} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigate('DhikrTab')}
              activeOpacity={0.7}
              className="flex-1 bg-white rounded-2xl p-4"
              style={{ shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
            >
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-xl bg-accent/10 items-center justify-center mr-2">
                  <Icon name="repeat-outline" size={16} color={colors.accent} />
                </View>
                <Text className="text-sm font-semibold text-ink">Dhikr</Text>
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-2xl font-bold text-ink">{totalDhikr}</Text>
                <Text className="text-xs text-muted">of {totalDhikrGoal}</Text>
                <View className="h-1.5 bg-surface rounded-full mt-2 overflow-hidden">
                  <View className="h-full bg-accent rounded-full" style={{ width: `${Math.min(dhikrProgress * 100, 100)}%` }} />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Date Card */}
          <View className="flex-row bg-white rounded-2xl px-4 py-3 items-center"
            style={{ shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
          >
            <View className="w-8 h-8 rounded-xl bg-accent/10 items-center justify-center mr-3">
              <Icon name="calendar-outline" size={16} color={colors.accent} />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-muted">{mockGregorianDate}</Text>
              <Text className="text-sm font-semibold text-ink">{mockHijriDate}</Text>
            </View>
            <View className="bg-surface rounded-xl px-2.5 py-1">
              <Text className="text-xs font-medium text-muted">Today</Text>
            </View>
          </View>

          {/* Spouse Progress */}
          <IslamicCard onPress={() => handleNavigate('Spouse')}>
            <View className="flex-row items-center mb-3">
              <View className="w-8 h-8 rounded-xl bg-rose-100 items-center justify-center mr-3">
                <Icon name="heart-outline" size={16} color={colors.error} />
              </View>
              <Text className="text-base font-semibold text-ink flex-1">{mockUser.spouse}'s Progress</Text>
              <Icon name="chevron-forward" size={16} color={colors.muted} />
            </View>
            <View className="flex-row gap-1.5">
              <View className="flex-1 bg-surface rounded-xl py-2.5 items-center">
                <Icon name="moon-outline" size={16} color={colors.primary} />
                <Text className="text-sm font-bold text-ink mt-0.5">
                  {mockSpouseProgress.salah.completed}/{mockSpouseProgress.salah.total}
                </Text>
                <Text className="text-[10px] text-muted">Salah</Text>
              </View>
              <View className="flex-1 bg-surface rounded-xl py-2.5 items-center">
                <Icon name="book-outline" size={16} color={colors.primary} />
                <Text className="text-sm font-bold text-ink mt-0.5">
                  {mockSpouseProgress.quran.ayahsToday}
                </Text>
                <Text className="text-[10px] text-muted">Ayahs</Text>
              </View>
              <View className="flex-1 bg-surface rounded-xl py-2.5 items-center">
                <Icon name="repeat-outline" size={16} color={colors.accent} />
                <Text className="text-sm font-bold text-ink mt-0.5">
                  {mockSpouseProgress.dhikr.percentage}%
                </Text>
                <Text className="text-[10px] text-muted">Dhikr</Text>
              </View>
            </View>
          </IslamicCard>

          {/* Quick Actions Horizontal Scroll */}
          <View>
            <SectionHeader title="Quick Actions" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              <View className="flex-row gap-2">
                {quickActions.map((action) => (
                  <TouchableOpacity
                    key={action.route}
                    onPress={() => handleNavigate(action.route)}
                    activeOpacity={0.7}
                    className="bg-white rounded-2xl px-4 py-3 items-center border border-borderLight"
                    style={{ width: 80, shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 4, elevation: 1 }}
                  >
                    <View className="w-10 h-10 rounded-xl items-center justify-center mb-1.5"
                      style={{ backgroundColor: action.color + '12' }}
                    >
                      <Icon name={action.icon} size={20} color={action.color} />
                    </View>
                    <Text className="text-xs font-medium text-ink text-center">{action.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default HomeScreen;
