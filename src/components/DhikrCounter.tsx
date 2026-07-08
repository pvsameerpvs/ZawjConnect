import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import * as Haptics from 'expo-haptics';
import { colors } from '../constants/colors';

interface DhikrCounterProps {
  count: number;
  goal: number;
  label: string;
  onIncrement: () => void;
  onReset: () => void;
}

const DhikrCounter: React.FC<DhikrCounterProps> = ({
  count,
  goal,
  label,
  onIncrement,
  onReset,
}) => {
  const progress = goal > 0 ? Math.min(count / goal, 1) : 0;

  const handleIncrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onIncrement();
  };

  return (
    <View className="items-center">
      <View
        className="w-60 h-60 rounded-full bg-white items-center justify-center border border-borderLight mb-5"
      >
        <TouchableOpacity
          onPress={handleIncrement}
          activeOpacity={0.8}
          className="w-52 h-52 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.surface }}
        >
          <Text className="text-4xl font-bold text-primary">{count}</Text>
          <Text className="text-sm text-muted mt-1">/ {goal}</Text>

          <View className="w-36 h-1 bg-surface rounded-full mt-3 overflow-hidden">
            <View
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                backgroundColor: colors.primary,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-semibold text-ink mb-5">{label}</Text>

      <TouchableOpacity
        onPress={onReset}
        activeOpacity={0.7}
        className="flex-row items-center px-5 py-2.5 rounded-full bg-surface"
      >
        <Icon name="refresh" size={16} color={colors.primary} />
        <Text className="text-sm font-semibold text-primary ml-2">Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DhikrCounter;
