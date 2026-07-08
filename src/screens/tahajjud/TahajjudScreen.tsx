import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import IslamicCard from '../../components/IslamicCard';
import ProgressBar from '../../components/ProgressBar';
import ProgressRing from '../../components/ProgressRing';
import AppButton from '../../components/AppButton';
import ToggleSwitch from '../../components/ToggleSwitch';
import { mockTahajjud } from '../../constants/mockData';
import { colors } from '../../constants/colors';

const TahajjudScreen: React.FC = () => {
  const [todayCompleted, setTodayCompleted] = useState(mockTahajjud.todayCompleted);
  const [reminder, setReminder] = useState(false);

  const weeklyProgress = mockTahajjud.weeklyCompleted / mockTahajjud.weeklyGoal;

  const handleMarkToday = () => {
    setTodayCompleted((prev) => !prev);
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Tahajjud" subtitle="Night Prayer" />

      <ScreenWrapper scroll background="surface" withPadding edges={['bottom']} contentClassName="pt-0">
        <IslamicCard variant="white" className="mb-4">
          <View className="items-center mb-4">
            <ProgressRing progress={weeklyProgress} size={100} strokeWidth={8} label="Weekly Progress" />
          </View>
          <ProgressBar
            progress={weeklyProgress}
            label={`This Week: ${mockTahajjud.weeklyCompleted}/${mockTahajjud.weeklyGoal} days`}
            showPercentage
          />
        </IslamicCard>

        <IslamicCard variant="surface" className="mb-4">
          <View className="items-center mb-2">
            <View className="w-10 h-10 rounded-full bg-accent/15 items-center justify-center mb-3">
              <Ionicons name="moon" size={20} color={colors.accent} />
            </View>
            <Text className="text-sm text-ink text-center leading-relaxed italic">
              "The best prayer after the obligatory prayers is the night prayer."
            </Text>
            <Text className="text-xs text-muted mt-2 font-medium">— Muslim</Text>
          </View>
        </IslamicCard>

        <AppButton
          title={todayCompleted ? '✓ Completed Today' : 'Mark Today as Completed'}
          onPress={handleMarkToday}
          variant={todayCompleted ? 'primary' : 'accent'}
          icon={
            todayCompleted ? (
              <Ionicons name="checkmark-circle" size={20} color={colors.white} />
            ) : undefined
          }
          className="mb-4"
        />

        <IslamicCard variant="white" className="mb-4">
          <ToggleSwitch
            value={reminder}
            onValueChange={setReminder}
            label="Tahajjud Reminder"
            description="Get notified before Fajr for night prayer"
          />
        </IslamicCard>
      </ScreenWrapper>
    </View>
  );
};

export default TahajjudScreen;
