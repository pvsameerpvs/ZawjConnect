import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import Icon from '../../components/Icon';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import IslamicCard from '../../components/IslamicCard';
import ProgressRing from '../../components/ProgressRing';
import { mockFasting } from '../../constants/mockData';
import { colors } from '../../constants/colors';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface FastingCardProps {
  title: string;
  subtitle: string;
  completed: boolean;
  status: 'completed' | 'pending' | 'upcoming';
  onPress?: () => void;
}

const FastingCard: React.FC<FastingCardProps> = ({ title, subtitle, completed, status, onPress }) => {
  const isDisabled = status === 'upcoming';

  return (
    <IslamicCard
      variant="white"
      onPress={isDisabled ? undefined : onPress}
      className={`mb-3 ${isDisabled ? 'opacity-50' : ''}`}
    >
      <View className="flex-row items-center">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
            completed ? 'bg-primary/15' : status === 'upcoming' ? 'bg-surface' : 'bg-surface'
          }`}
        >
          <Icon
            name={completed ? 'checkmark-circle' : status === 'upcoming' ? 'calendar-outline' : 'ellipse-outline'}
            size={20}
            color={completed ? colors.success : colors.muted}
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-ink">{title}</Text>
          <Text className="text-xs text-muted mt-0.5">{subtitle}</Text>
        </View>
        {status === 'pending' && !completed && (
          <View className="px-3 py-1 rounded-full bg-surface">
            <Text className="text-xs font-medium text-muted">Tap</Text>
          </View>
        )}
      </View>
    </IslamicCard>
  );
};

const FastingScreen: React.FC = () => {
  const [monday, setMonday] = useState(mockFasting.monday);
  const [thursday, setThursday] = useState(mockFasting.thursday);
  const whiteDays = mockFasting.whiteDays;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const completedCount = [monday, thursday, whiteDays].filter(Boolean).length;
  const totalFasts = 3;
  const progress = completedCount / totalFasts;

  const calendarDays = useMemo(() => {
    const days: { day: number; isMonday: boolean; isThursday: boolean; isPast: boolean }[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      const dayOfWeek = date.getDay();
      days.push({
        day: d,
        isMonday: dayOfWeek === 1,
        isThursday: dayOfWeek === 4,
        isPast: date < new Date(currentYear, currentMonth, now.getDate() + 1),
      });
    }
    return days;
  }, [daysInMonth, currentYear, currentMonth, now]);

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Sunnah Fasting" />

      <ScreenWrapper scroll background="surface" withPadding edges={['bottom']} contentClassName="pt-0">
        <IslamicCard variant="white" className="mb-4">
          <View className="flex-row items-center">
            <ProgressRing progress={progress} size={72} strokeWidth={5} />
            <View className="flex-1 ml-5">
              <Text className="text-base font-bold text-ink">This Week</Text>
              <Text className="text-sm text-muted mt-1">
                {completedCount}/{totalFasts} fasts completed
              </Text>
              <View className="flex-row mt-2 gap-1">
                {['Mon', 'Thu', '13-15'].map((label, i) => {
                  const done = [monday, thursday, whiteDays][i];
                  return (
                    <View
                      key={label}
                      className={`px-2.5 py-1 rounded-full ${done ? 'bg-primary/15' : 'bg-surface'}`}
                    >
                      <Text className={`text-[10px] font-semibold ${done ? 'text-primary' : 'text-muted'}`}>
                        {done ? '✓' : '○'} {label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </IslamicCard>

        <FastingCard
          title="Monday Fasting"
          subtitle="Sunnah of Prophet ﷺ"
          completed={monday}
          status={monday ? 'completed' : 'pending'}
          onPress={() => setMonday((prev) => !prev)}
        />

        <FastingCard
          title="Thursday Fasting"
          subtitle="Sunnah of Prophet ﷺ"
          completed={thursday}
          status={thursday ? 'completed' : 'pending'}
          onPress={() => setThursday((prev) => !prev)}
        />

        <FastingCard
          title="White Days (13-15)"
          subtitle="Ayyamul Bidh - 13th, 14th, 15th"
          completed={whiteDays}
          status="upcoming"
        />

        <IslamicCard variant="surface" className="mb-4">
          <Text className="text-base font-bold text-ink mb-3">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </Text>
          <View className="flex-row justify-between mb-2">
            {WEEKDAYS.map((day) => (
              <View key={day} className="w-[32px] items-center">
                <Text className="text-xs font-semibold text-muted">{day}</Text>
              </View>
            ))}
          </View>
          <View className="flex-row flex-wrap">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <View key={`empty-${i}`} className="w-[32px] h-[32px]" />
            ))}
            {calendarDays.map((d) => {
              const isHighlighted = d.isMonday || d.isThursday;
              return (
                <View
                  key={d.day}
                  className={`w-[32px] h-[32px] items-center justify-center rounded-full ${
                    isHighlighted && d.isPast ? 'bg-primary/15' : ''
                  } ${d.isPast && isHighlighted ? '' : ''}`}
                >
                  <Text
                    className={`text-xs ${
                      isHighlighted && d.isPast
                        ? 'text-primary font-bold'
                        : d.isPast
                        ? 'text-ink'
                        : 'text-muted/50'
                    }`}
                  >
                    {d.day}
                  </Text>
                </View>
              );
            })}
          </View>
          <View className="flex-row items-center justify-center mt-3 gap-3">
            <View className="flex-row items-center">
              <View className="w-2.5 h-2.5 rounded-full bg-primary/30 mr-1.5" />
              <Text className="text-[10px] text-muted">Mon / Thu</Text>
            </View>
          </View>
        </IslamicCard>
      </ScreenWrapper>
    </View>
  );
};

export default FastingScreen;
