import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { mockPrayerTimes, mockPrayerProgress } from '../../constants/mockData';
import ScreenWrapper from '../../components/ScreenWrapper';
import IslamicCard from '../../components/IslamicCard';
import ProgressBar from '../../components/ProgressBar';
import PrayerCard from '../../components/PrayerCard';
import SectionHeader from '../../components/SectionHeader';
import ToggleSwitch from '../../components/ToggleSwitch';

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const getNextPrayer = (): string => {
  const hour = new Date().getHours();
  if (hour < 4) return 'Fajr';
  if (hour < 12) return 'Dhuhr';
  if (hour < 15) return 'Asr';
  if (hour < 19) return 'Maghrib';
  return 'Isha';
};

const PrayerScreen: React.FC = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>({ ...mockPrayerProgress });
  const [reminderOn, setReminderOn] = useState(true);

  const nextPrayer = useMemo(() => getNextPrayer(), []);

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalPrayers = PRAYER_NAMES.length;

  const togglePrayer = (name: string) => {
    setProgress((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <ScreenWrapper background="surface" scroll withPadding>
      <View className="pt-2">
        <View className="bg-primary/10 rounded-2xl p-4 flex-row items-center border border-primary/20 mb-6"
          style={{
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="w-12 h-12 rounded-full bg-accent items-center justify-center">
            <Ionicons name="star" size={24} color={colors.ink} />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-xs text-primary font-semibold uppercase tracking-wider">Next Prayer</Text>
            <Text className="text-xl font-bold text-ink mt-0.5">{nextPrayer}</Text>
            <Text className="text-sm text-muted mt-0.5">{mockPrayerTimes[nextPrayer as keyof typeof mockPrayerTimes]}</Text>
          </View>
          <View className="bg-primary rounded-full px-3 py-1">
            <Text className="text-xs font-bold text-white">{completedCount}/{totalPrayers}</Text>
          </View>
        </View>

        <SectionHeader title="Today's Prayers" />

        <View className="gap-3 mb-6">
          {PRAYER_NAMES.map((name) => (
            <PrayerCard
              key={name}
              name={name}
              time={mockPrayerTimes[name as keyof typeof mockPrayerTimes]}
              completed={progress[name] ?? false}
              isNext={name === nextPrayer}
              onToggle={() => togglePrayer(name)}
            />
          ))}
        </View>

        <SectionHeader title="Weekly Progress" />

        <IslamicCard variant="surface" className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-ink font-semibold text-base">This Week</Text>
            <Text className="text-primary font-bold text-lg">{completedCount}/{totalPrayers}</Text>
          </View>
          <ProgressBar progress={completedCount / totalPrayers} showPercentage color={colors.primary} />
          <Text className="text-xs text-muted mt-2 text-center">
            {completedCount === totalPrayers ? 'All prayers completed! 🌟' : `${totalPrayers - completedCount} prayer${totalPrayers - completedCount === 1 ? '' : 's'} remaining today`}
          </Text>
        </IslamicCard>

        <IslamicCard variant="white" className="mb-4">
          <View className="flex-row items-center mb-3">
            <Ionicons name="notifications-outline" size={20} color={colors.accent} />
            <Text className="text-ink font-semibold text-base ml-2">Reminders</Text>
          </View>
          <ToggleSwitch
            value={reminderOn}
            onValueChange={setReminderOn}
            label="Prayer Reminders"
            description="Get notified before each prayer time"
          />
        </IslamicCard>
      </View>
    </ScreenWrapper>
  );
};

export default PrayerScreen;
