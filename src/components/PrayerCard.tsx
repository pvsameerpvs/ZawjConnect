import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

interface PrayerCardProps {
  name: string;
  time: string;
  completed: boolean;
  isNext: boolean;
  onToggle: () => void;
}

const PRAYER_ICONS: Record<string, string> = {
  Fajr: 'moon', Dhuhr: 'sun', Asr: 'sun', Maghrib: 'sunset', Isha: 'moon',
};

const PRAYER_ICON_COLORS: Record<string, string> = {
  Fajr: '#6366F1', Dhuhr: '#F59E0B', Asr: '#F97316', Maghrib: '#EF4444', Isha: '#8B5CF6',
};

const PrayerCard: React.FC<PrayerCardProps> = ({ name, time, completed, isNext, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      className="bg-white rounded-2xl px-4 py-3.5 flex-row items-center"
      style={{
        shadowColor: isNext ? '#F59E6B' : 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 0, height: isNext ? 4 : 2 },
        shadowOpacity: isNext ? 0.15 : 1,
        shadowRadius: isNext ? 12 : 6,
        elevation: isNext ? 3 : 1,
        borderWidth: isNext ? 1 : 0,
        borderColor: isNext ? '#F59E6B30' : 'transparent',
      }}
    >
      <View className={`w-11 h-11 rounded-2xl items-center justify-center ${completed ? 'bg-primary' : 'bg-[#F3F4F6]'}`}>
        <Icon name={PRAYER_ICONS[name] || 'moon'} size={20} color={completed ? '#FFFFFF' : PRAYER_ICON_COLORS[name] || '#6B7280'} />
      </View>
      <View className="flex-1 ml-3.5">
        <View className="flex-row items-center">
          <Text className={`text-[15px] font-semibold ${completed ? 'text-primary' : 'text-[#111827]'}`}>{name}</Text>
          {isNext && (
            <View className="bg-accent/15 px-2 py-0.5 rounded-full ml-2">
              <Text className="text-[11px] font-semibold text-accent-dark">Next</Text>
            </View>
          )}
        </View>
        <Text className="text-[13px] text-[#6B7280] mt-0.5">{time}</Text>
      </View>
      <View className={`w-7 h-7 rounded-xl items-center justify-center ${completed ? 'bg-primary' : 'border-2 border-[#D1D5DB]'}`}>
        {completed && <Icon name="check" size={15} color='#FFFFFF' />}
      </View>
    </TouchableOpacity>
  );
};

export default PrayerCard;
