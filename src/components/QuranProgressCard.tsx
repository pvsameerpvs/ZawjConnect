import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface QuranProgressCardProps {
  surah: string;
  ayah: number;
  completed: number;
  goal: number;
  onPress?: () => void;
}

const QuranProgressCard: React.FC<QuranProgressCardProps> = ({
  surah,
  ayah,
  completed,
  goal,
  onPress,
}) => {
  const progress = goal > 0 ? completed / goal : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 border border-borderLight"
    >
      <View className="flex-row items-center mb-3">
        <View className="w-9 h-9 rounded-xl bg-primary/10 items-center justify-center">
          <Ionicons name="book" size={16} color={colors.primary} />
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-ink">Quran Progress</Text>
          <Text className="text-xs text-muted">Continue your journey</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-3">
        <View>
          <Text className="text-xs text-muted">Current</Text>
          <Text className="text-sm font-semibold text-ink">{surah}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-muted">Ayah</Text>
          <Text className="text-sm font-semibold text-ink">{ayah}</Text>
        </View>
      </View>

      <View className="h-1.5 bg-surface rounded-full overflow-hidden mb-1.5">
        <View
          className="h-full rounded-full bg-primary"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </View>
      <View className="flex-row justify-between">
        <Text className="text-xs text-muted">{completed} today</Text>
        <Text className="text-xs text-muted">Goal: {goal}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuranProgressCard;
