import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from '../../components/Icon';
import { mockPrayerTimes, mockPrayerProgress } from '../../constants/mockData';
import ProgressBar from '../../components/ProgressBar';
import PrayerCard from '../../components/PrayerCard';
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
  const completed = Object.values(progress).filter(Boolean).length;
  const total = PRAYER_NAMES.length;

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ gap: 24 }}>
        <View className="bg-white rounded-3xl p-5 flex-row items-center"
          style={{ shadowColor: 'rgba(0,0,0,0.06)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 3 }}
        >
          <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center">
            <Icon name="star" size={24} color='#0F9D8A' />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-[11px] text-primary font-bold uppercase tracking-widest">Next Prayer</Text>
            <Text className="text-[24px] font-bold text-[#111827] tracking-tight mt-1">{nextPrayer}</Text>
            <Text className="text-[14px] text-[#6B7280] font-medium mt-0.5">{mockPrayerTimes[nextPrayer as keyof typeof mockPrayerTimes]}</Text>
          </View>
          <View className="bg-primary/10 rounded-xl px-3.5 py-2">
            <Text className="text-[14px] font-bold text-primary">{completed}/{total}</Text>
          </View>
        </View>

        <View>
          <Text className="text-[20px] font-bold text-[#111827] tracking-tight mb-3">Today's Prayers</Text>
          <View style={{ gap: 10 }}>
            {PRAYER_NAMES.map((name) => (
              <PrayerCard key={name} name={name} time={mockPrayerTimes[name as keyof typeof mockPrayerTimes]}
                completed={progress[name] ?? false} isNext={name === nextPrayer}
                onToggle={() => setProgress(prev => ({ ...prev, [name]: !prev[name] }))}
              />
            ))}
          </View>
        </View>

        <View>
          <Text className="text-[20px] font-bold text-[#111827] tracking-tight mb-3">Weekly Progress</Text>
          <View className="bg-white rounded-3xl p-5"
            style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[15px] font-semibold text-[#111827] tracking-tight">This Week</Text>
              <View className="bg-primary/10 rounded-lg px-3 py-1">
                <Text className="text-primary font-bold text-[15px]">{completed}/{total}</Text>
              </View>
            </View>
            <ProgressBar progress={completed / total} showPercentage />
            <Text className="text-[12px] text-[#6B7280] mt-3 text-center font-medium">
              {completed === total ? 'All prayers completed!' : `${total - completed} prayer${total - completed === 1 ? '' : 's'} remaining today`}
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-5"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-2xl bg-accent/10 items-center justify-center mr-3">
              <Icon name="notifications" size={20} color='#F59E6B' />
            </View>
            <Text className="text-[15px] font-semibold text-[#111827] tracking-tight">Reminders</Text>
          </View>
          <View className="bg-[#F8FAFC] rounded-xl px-4 border border-[#E5E7EB]">
            <ToggleSwitch value={reminderOn} onValueChange={setReminderOn} label="Prayer Reminders" description="Get notified before each prayer time" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrayerScreen;
