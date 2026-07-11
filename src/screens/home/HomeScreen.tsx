import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../../components/Icon';
import { colors } from '../../constants/colors';
import {
  mockUser, mockHijriDate, mockPrayerTimes, mockPrayerProgress, mockSpouseProgress,
} from '../../constants/mockData';

const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const PRAYER_MINUTES: Record<string, number> = {
  Fajr: 4 * 60 + 18, Dhuhr: 12 * 60 + 24, Asr: 15 * 60 + 47,
  Maghrib: 19 * 60 + 12, Isha: 20 * 60 + 35,
};

const getNextPrayer = (): { name: string; time: string } => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (const prayer of PRAYER_ORDER) {
    if (currentMinutes < PRAYER_MINUTES[prayer]) return { name: prayer, time: mockPrayerTimes[prayer] };
  }
  return { name: 'Fajr', time: mockPrayerTimes.Fajr };
};

const quickActions = [
  { title: 'Prayer', icon: 'moon', route: 'prayer', color: '#0F9D8A' },
  { title: 'Family', icon: 'users', route: 'family', color: '#14B8A6' },
  { title: 'Dua', icon: 'hand', route: 'Dua', color: '#22C55E' },
  { title: 'Spouse', icon: 'heart', route: 'Spouse', color: '#EF4444' },
  { title: 'Zakat', icon: 'calculator', route: 'Zakat', color: '#D9773E' },
  { title: 'Tahajjud', icon: 'moon', route: 'Tahajjud', color: '#6B7280' },
  { title: 'Fasting', icon: 'restaurant', route: 'Fasting', color: '#14B8A6' },
];

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const nextPrayer = useMemo(() => getNextPrayer(), []);

  const navigate = (route: string) => {
    const tabs = ['prayer', 'family'];
    if (tabs.includes(route)) router.navigate('/(tabs)/' + route);
    else router.push('/more/' + route.toLowerCase());
  };

  const completed = Object.values(mockPrayerProgress).filter(Boolean).length;
  const total = Object.keys(mockPrayerProgress).length;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingTop: insets.top + 16, paddingBottom: 20, paddingHorizontal: 24 }}>
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-white/50 text-[12px] font-medium tracking-wide">Assalamu Alaikum</Text>
              <Text className="text-white text-[24px] font-bold tracking-tight mt-0.5">{mockUser.name}</Text>
              <Text className="text-accent-light/80 text-[12px] mt-0.5 font-medium">{mockHijriDate}</Text>
            </View>
            <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center border border-white/20">
              <Icon name="person" size={22} color={colors.accentLight} />
            </View>
          </View>

          <TouchableOpacity onPress={() => navigate('prayer')} activeOpacity={0.8}
            className="bg-white/10 rounded-3xl px-5 py-4 flex-row items-center border border-white/10"
            style={{
              shadowColor: 'rgba(0,0,0,0.15)',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <View className="w-12 h-12 rounded-2xl bg-accent/20 items-center justify-center mr-4">
              <Icon name="moon" size={22} color={colors.accentLight} />
            </View>
            <View className="flex-1">
              <Text className="text-white/50 text-[12px] font-medium">Next Prayer</Text>
              <Text className="text-white text-[17px] font-semibold tracking-tight">{nextPrayer.name} · {nextPrayer.time}</Text>
            </View>
            <View className="bg-white/10 rounded-xl px-3 py-1.5 border border-white/10">
              <Text className="text-accent-light text-[13px] font-bold">{completed}/{total}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <View style={{ gap: 16 }}>
          <TouchableOpacity onPress={() => navigate('prayer')} activeOpacity={0.7}
            className="bg-white rounded-3xl p-5"
            style={{
              shadowColor: 'rgba(0,0,0,0.04)',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 1,
            }}
          >
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mr-3.5">
                <Icon name="moon" size={22} color='#0F9D8A' />
              </View>
              <View className="flex-1">
                <Text className="text-[17px] font-semibold text-[#111827] tracking-tight">Salah Progress</Text>
                <Text className="text-[13px] text-[#6B7280] mt-0.5">{completed}/{total} prayers completed</Text>
              </View>
            </View>
            <View className="h-[6px] bg-[#F3F4F6] rounded-full overflow-hidden">
              <View className="h-full bg-primary rounded-full" style={{ width: `${(completed / total) * 100}%` }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Spouse')} activeOpacity={0.7}
            className="bg-white rounded-3xl p-5"
            style={{
              shadowColor: 'rgba(0,0,0,0.04)',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 1,
            }}
          >
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 rounded-2xl bg-rose-100 items-center justify-center mr-3.5">
                <Icon name="heart" size={22} color='#EF4444' />
              </View>
              <Text className="text-[17px] font-semibold text-[#111827] tracking-tight flex-1">{mockUser.spouse}'s Progress</Text>
              <Icon name="chevron" size={16} color='#9CA3AF' />
            </View>
            <View className="flex-row gap-2">
              <View className="flex-1 bg-[#F8FAFC] rounded-2xl py-3.5 items-center">
                <Icon name="moon" size={16} color='#0F9D8A' />
                <Text className="text-[17px] font-bold text-[#111827] mt-1">{mockSpouseProgress.salah.completed}/{mockSpouseProgress.salah.total}</Text>
                <Text className="text-[10px] font-medium text-[#6B7280] mt-0.5">Salah</Text>
              </View>
              <View className="flex-1 bg-[#F8FAFC] rounded-2xl py-3.5 items-center">
                <Icon name="heart" size={16} color='#EF4444' />
                <Text className="text-[17px] font-bold text-[#111827] mt-1">{mockSpouseProgress.tahajjud ? 'Yes' : 'No'}</Text>
                <Text className="text-[10px] font-medium text-[#6B7280] mt-0.5">Tahajjud</Text>
              </View>
              <View className="flex-1 bg-[#F8FAFC] rounded-2xl py-3.5 items-center">
                <Icon name="location" size={16} color='#F59E6B' />
                <Text className="text-[17px] font-bold text-[#111827] mt-1">{mockSpouseProgress.locationSharing ? 'On' : 'Off'}</Text>
                <Text className="text-[10px] font-medium text-[#6B7280] mt-0.5">Location</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View>
            <Text className="text-[20px] font-bold text-[#111827] tracking-tight mb-4">Quick Actions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 24 }}>
              <View className="flex-row gap-2.5">
                {quickActions.map((action) => (
                  <TouchableOpacity key={action.route} onPress={() => navigate(action.route)} activeOpacity={0.7}
                    className="bg-white rounded-2xl px-4 py-4 items-center"
                    style={{
                      width: 88,
                      shadowColor: 'rgba(0,0,0,0.04)',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 1,
                      shadowRadius: 6,
                      elevation: 1,
                    }}
                  >
                    <View className="w-12 h-12 rounded-2xl items-center justify-center mb-2.5"
                      style={{ backgroundColor: action.color + '12' }}
                    >
                      <Icon name={action.icon} size={22} color={action.color} />
                    </View>
                    <Text className="text-[11px] font-semibold text-[#111827] text-center">{action.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
