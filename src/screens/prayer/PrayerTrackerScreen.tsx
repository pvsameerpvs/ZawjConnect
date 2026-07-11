import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from '../../components/Icon';
import IslamicCard from '../../components/IslamicCard';
import ProgressBar from '../../components/ProgressBar';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const generateWeekData = () => DAYS.map(day => ({ day, completed: Math.floor(Math.random() * 6), total: 5 }));

const PrayerTrackerScreen: React.FC = () => {
  const weekData = useMemo(() => generateWeekData(), []);
  const totalCompleted = weekData.reduce((s, d) => s + d.completed, 0);
  const totalPrayers = weekData.reduce((s, d) => s + d.total, 0);
  const weekPercentage = Math.round((totalCompleted / totalPrayers) * 100);

  const getDayColor = (c: number, t: number) => c === t ? '#22C55E' : c === 0 ? '#EF4444' : '#F59E0B';
  const getDayIcon = (c: number, t: number) => c === t ? 'check-circle' : c === 0 ? 'x-circle' : 'clock';

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ gap: 20 }}>
        <IslamicCard variant="gradient" className="py-6">
          <View className="items-center">
            <Text className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-2">Week Total</Text>
            <Text className="text-accent text-[44px] font-bold tracking-tight">{weekPercentage}%</Text>
            <Text className="text-white/70 text-[14px] mt-1.5 font-medium">{totalCompleted}/{totalPrayers} prayers completed this week</Text>
            <View className="w-full mt-4"><ProgressBar progress={weekPercentage / 100} color='#F59E6B' /></View>
          </View>
        </IslamicCard>

        <Text className="text-[20px] font-bold text-[#111827] tracking-tight">Daily Breakdown</Text>

        <View className="flex-row flex-wrap gap-4">
          {weekData.map(item => {
            const dayProgress = item.total > 0 ? item.completed / item.total : 0;
            const iconColor = getDayColor(item.completed, item.total);
            return (
              <View key={item.day} className="bg-white rounded-2xl p-4 w-[47%]"
                style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
              >
                <View className="items-center">
                  <View className="w-9 h-9 rounded-2xl items-center justify-center mb-2.5" style={{ backgroundColor: iconColor + '12' }}>
                    <Icon name={getDayIcon(item.completed, item.total)} size={20} color={iconColor} />
                  </View>
                  <Text className="text-[16px] font-bold text-[#111827] tracking-tight">{item.day}</Text>
                  <View className="flex-row items-baseline mt-1">
                    <Text className="text-[18px] font-bold" style={{ color: iconColor }}>{item.completed}</Text>
                    <Text className="text-[12px] text-[#6B7280]">/{item.total}</Text>
                  </View>
                  <View className="w-full mt-3"><ProgressBar progress={dayProgress} color={iconColor} /></View>
                </View>
              </View>
            );
          })}
        </View>

        <View className="bg-white rounded-3xl p-5"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-2xl bg-accent/15 items-center justify-center mr-3">
              <Icon name="trophy" size={20} color='#F59E6B' />
            </View>
            <Text className="text-[16px] font-bold text-[#111827] tracking-tight">Streak</Text>
          </View>
          <View className="flex-row items-center justify-between py-3 border-b border-[#F3F4F6]">
            <Text className="text-[#6B7280] text-[14px] font-medium">Current streak</Text>
            <View className="flex-row items-center gap-1.5">
              <Icon name="flame" size={20} color='#F59E6B' />
              <Text className="text-accent font-bold text-[18px] tracking-tight">3 days</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between pt-3">
            <Text className="text-[#6B7280] text-[14px] font-medium">Best streak</Text>
            <Text className="text-[18px] font-bold text-[#111827] tracking-tight">7 days</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrayerTrackerScreen;
