import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from '../../components/Icon';
import IslamicCard from '../../components/IslamicCard';
import ProgressBar from '../../components/ProgressBar';
import ProgressRing from '../../components/ProgressRing';
import ToggleSwitch from '../../components/ToggleSwitch';
import { mockTahajjud } from '../../constants/mockData';

const TahajjudScreen: React.FC = () => {
  const [todayCompleted, setTodayCompleted] = useState(mockTahajjud.todayCompleted);
  const [reminder, setReminder] = useState(false);
  const weeklyProgress = mockTahajjud.weeklyCompleted / mockTahajjud.weeklyGoal;

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ gap: 16 }}>
        <IslamicCard variant="elevated">
          <View className="items-center mb-5">
            <ProgressRing progress={weeklyProgress} size={110} strokeWidth={8} label="Weekly Progress" />
          </View>
          <ProgressBar progress={weeklyProgress} label={`This Week: ${mockTahajjud.weeklyCompleted}/${mockTahajjud.weeklyGoal} days`} showPercentage />
        </IslamicCard>

        <IslamicCard variant="elevated">
          <View className="items-center">
            <View className="w-12 h-12 rounded-full bg-accent/10 items-center justify-center mb-4">
              <Icon name="moon" size={22} color='#F59E6B' />
            </View>
            <Text className="text-[14px] text-[#111827] text-center leading-relaxed italic">
              "The best prayer after the obligatory prayers is the night prayer."
            </Text>
            <Text className="text-[12px] text-[#6B7280] mt-2 font-semibold">— Muslim</Text>
          </View>
        </IslamicCard>

        <TouchableOpacity
          onPress={() => setTodayCompleted(prev => !prev)}
          activeOpacity={0.85}
          className={`h-[56px] rounded-3xl items-center justify-center flex-row ${todayCompleted ? 'bg-primary' : 'bg-accent'}`}
          style={{
            shadowColor: todayCompleted ? '#0F9D8A' : '#F59E6B',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text className="text-white text-[16px] font-bold tracking-tight mr-2">
            {todayCompleted ? '✓ Completed Today' : 'Mark Today as Completed'}
          </Text>
        </TouchableOpacity>

        <IslamicCard variant="elevated">
          <ToggleSwitch value={reminder} onValueChange={setReminder} label="Tahajjud Reminder"
            description="Get notified before Fajr for night prayer" />
        </IslamicCard>
      </View>
    </ScrollView>
  );
};

export default TahajjudScreen;
