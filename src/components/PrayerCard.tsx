import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../constants/colors';

interface PrayerCardProps {
  name: string;
  time: string;
  completed: boolean;
  isNext: boolean;
  onToggle: () => void;
}

const PrayerCard: React.FC<PrayerCardProps> = ({
  name,
  time,
  completed,
  isNext,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      className={`rounded-2xl p-4 flex-row items-center ${completed ? 'bg-primary/5 border border-sage/15' : 'bg-white border border-borderLight'}`}
    >
      <View className={`w-9 h-9 rounded-full items-center justify-center ${completed ? 'bg-primary' : 'bg-surface'}`}>
        <Icon
          name={completed ? 'checkmark-circle' : 'time-outline'}
          size={16}
          color={completed ? colors.white : colors.muted}
        />
      </View>
      <View className="flex-1 ml-3">
        <View className="flex-row items-center">
           <Text className={`text-base font-semibold ${completed ? 'text-primary' : 'text-ink'}`}>{name}</Text>
          {isNext && (
            <View className="bg-accent/20 px-2 py-0.5 rounded-full ml-2">
              <Text className="text-xs font-medium text-accent-dark">Next</Text>
            </View>
          )}
        </View>
        <Text className="text-sm text-muted">{time}</Text>
      </View>
      <TouchableOpacity onPress={onToggle} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Icon
          name={completed ? 'checkbox' : 'square-outline'}
          size={20}
          color={completed ? colors.primary : colors.muted}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PrayerCard;
