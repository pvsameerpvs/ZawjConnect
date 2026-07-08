import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import ScreenWrapper from '../../components/ScreenWrapper';
import IslamicCard from '../../components/IslamicCard';
import SectionHeader from '../../components/SectionHeader';
import ProgressBar from '../../components/ProgressBar';

interface DayData {
  day: string;
  completed: number;
  total: number;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateWeekData = (): DayData[] => {
  return DAYS.map((day) => ({
    day,
    completed: Math.floor(Math.random() * 6),
    total: 5,
  }));
};

const PrayerTrackerScreen: React.FC = () => {
  const weekData = useMemo(() => generateWeekData(), []);

  const totalCompleted = weekData.reduce((sum, d) => sum + d.completed, 0);
  const totalPrayers = weekData.reduce((sum, d) => sum + d.total, 0);
  const weekPercentage = Math.round((totalCompleted / totalPrayers) * 100);

  const getDayIcon = (completed: number, total: number): keyof typeof Ionicons.glyphMap => {
    if (completed === total) return 'checkmark-circle';
    if (completed === 0) return 'close-circle';
    return 'time';
  };

  const getDayColor = (completed: number, total: number): string => {
    if (completed === total) return colors.primary;
    if (completed === 0) return colors.error;
    return colors.accent;
  };

  return (
    <ScreenWrapper background="surface" scroll withPadding>
      <View className="pt-2">
        <IslamicCard variant="gradient" className="mb-6">
          <View className="items-center">
            <Text className="text-surface/60 text-xs font-semibold uppercase tracking-wider mb-1">Week Total</Text>
            <Text className="text-accent text-4xl font-bold">{weekPercentage}%</Text>
            <Text className="text-surface/70 text-sm mt-1">{totalCompleted}/{totalPrayers} prayers completed</Text>
            <View className="w-full mt-3">
              <ProgressBar progress={weekPercentage / 100} color={colors.accent} />
            </View>
          </View>
        </IslamicCard>

        <SectionHeader title="Daily Breakdown" />

        <View className="flex-row flex-wrap justify-between mb-6">
          {weekData.map((item) => {
            const dayProgress = item.total > 0 ? item.completed / item.total : 0;
            const iconColor = getDayColor(item.completed, item.total);

            return (
              <IslamicCard
                key={item.day}
                variant="white"
                className="w-[48%] mb-4 p-4"
              >
                <View className="items-center">
                  <Ionicons
                    name={getDayIcon(item.completed, item.total)}
                    size={20}
                    color={iconColor}
                  />
                  <Text className="text-ink font-bold text-base mt-2">{item.day}</Text>
                  <Text className="text-muted text-xs mt-0.5">
                    <Text className="font-semibold" style={{ color: iconColor }}>{item.completed}</Text>
                    /{item.total}
                  </Text>
                  <View className="w-full mt-2">
                    <ProgressBar progress={dayProgress} color={iconColor} />
                  </View>
                </View>
              </IslamicCard>
            );
          })}
        </View>

        <IslamicCard variant="surface" className="mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="trophy-outline" size={20} color={colors.accent} />
            <Text className="text-ink font-semibold text-base ml-2">Streak</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-muted text-sm">Current streak</Text>
            <View className="flex-row items-center">
              <Ionicons name="flame" size={16} color={colors.accent} />
              <Text className="text-accent font-bold text-lg ml-1">3 days</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-2">
            <Text className="text-muted text-sm">Best streak</Text>
            <Text className="text-ink font-semibold">7 days</Text>
          </View>
        </IslamicCard>
      </View>
    </ScreenWrapper>
  );
};

export default PrayerTrackerScreen;
