import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../../components/Icon';
import IslamicCard from '../../components/IslamicCard';
import ProgressRing from '../../components/ProgressRing';
import { mockFasting } from '../../constants/mockData';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const FastingCard: React.FC<{ title: string; subtitle: string; completed: boolean; onPress?: () => void }> = ({ title, subtitle, completed, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}
    className="bg-white rounded-2xl p-4 flex-row items-center"
    style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
  >
    <View className={`w-11 h-11 rounded-2xl items-center justify-center mr-4 ${completed ? 'bg-primary/10' : 'bg-[#F3F4F6]'}`}>
      <Icon name={completed ? 'check-circle' : 'circle'} size={22} color={completed ? '#22C55E' : '#9CA3AF'} />
    </View>
    <View className="flex-1">
      <Text className="text-[15px] font-bold text-[#111827] tracking-tight">{title}</Text>
      <Text className="text-[12px] text-[#6B7280] mt-0.5">{subtitle}</Text>
    </View>
    {!completed && <View className="px-3 py-1.5 rounded-xl bg-[#F3F4F6]"><Text className="text-[11px] font-semibold text-[#6B7280]">Tap</Text></View>}
  </TouchableOpacity>
);

const FastingScreen: React.FC = () => {
  const [monday, setMonday] = useState(mockFasting.monday);
  const [thursday, setThursday] = useState(mockFasting.thursday);
  const whiteDays = mockFasting.whiteDays;
  const now = new Date();
  const completionCount = [monday, thursday, whiteDays].filter(Boolean).length;
  const progress = completionCount / 3;

  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const days: { day: number; isMonday: boolean; isThursday: boolean; isPast: boolean }[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(now.getFullYear(), now.getMonth(), d);
      days.push({ day: d, isMonday: date.getDay() === 1, isThursday: date.getDay() === 4, isPast: date < new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) });
    }
    return days;
  }, [now]);

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ gap: 16 }}>
        <IslamicCard variant="elevated">
          <View className="flex-row items-center">
            <ProgressRing progress={progress} size={76} strokeWidth={5} />
            <View className="flex-1 ml-5">
              <Text className="text-[16px] font-bold text-[#111827] tracking-tight">This Week</Text>
              <Text className="text-[14px] text-[#6B7280] mt-1">{completionCount}/3 fasts completed</Text>
              <View className="flex-row mt-3 gap-2">
                {['Mon', 'Thu', '13-15'].map((label, i) => {
                  const done = [monday, thursday, whiteDays][i];
                  return (
                    <View key={label} className={`px-3 py-1 rounded-xl ${done ? 'bg-primary/10' : 'bg-[#F3F4F6] border border-[#E5E7EB]'}`}>
                      <Text className={`text-[10px] font-bold ${done ? 'text-primary' : 'text-[#6B7280]'}`}>{done ? '✓' : '○'} {label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </IslamicCard>

        <FastingCard title="Monday Fasting" subtitle="Sunnah of Prophet ﷺ" completed={monday} onPress={() => setMonday(p => !p)} />
        <FastingCard title="Thursday Fasting" subtitle="Sunnah of Prophet ﷺ" completed={thursday} onPress={() => setThursday(p => !p)} />
        <FastingCard title="White Days (13-15)" subtitle="Ayyamul Bidh - 13th, 14th, 15th" completed={whiteDays} />

        <IslamicCard variant="elevated">
          <Text className="text-[16px] font-bold text-[#111827] tracking-tight mb-4">{MONTH_NAMES[now.getMonth()]} {now.getFullYear()}</Text>
          <View className="flex-row justify-between mb-3">
            {WEEKDAYS.map(day => <View key={day} className="w-[36px] items-center"><Text className="text-[11px] font-bold text-[#6B7280]">{day}</Text></View>)}
          </View>
          <View className="flex-row flex-wrap">
            {Array.from({ length: new Date(now.getFullYear(), now.getMonth(), 1).getDay() }).map((_, i) => <View key={`e-${i}`} className="w-[36px] h-[36px]" />)}
            {calendarDays.map(d => (
              <View key={d.day} className={`w-[36px] h-[36px] items-center justify-center rounded-full ${(d.isMonday || d.isThursday) && d.isPast ? 'bg-primary/10' : ''}`}>
                <Text className={`text-[12px] font-semibold ${(d.isMonday || d.isThursday) && d.isPast ? 'text-primary' : d.isPast ? 'text-[#111827]' : 'text-[#9CA3AF]/40'}`}>{d.day}</Text>
              </View>
            ))}
          </View>
        </IslamicCard>
      </View>
    </ScrollView>
  );
};

export default FastingScreen;
