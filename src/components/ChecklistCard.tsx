import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface ChecklistCardProps {
  item: { id: string; label: string };
  completed: boolean;
  onToggle: () => void;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({
  item,
  completed,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      className={`flex-row items-center py-3 px-4 rounded-xl mb-2 ${completed ? 'bg-primary/5' : 'bg-white border border-borderLight'}`}
    >
      <View
        className={`w-6 h-6 rounded-full items-center justify-center ${completed ? 'bg-primary' : 'bg-surface'}`}
      >
        {completed ? (
          <Ionicons name="checkmark" size={16} color={colors.white} />
        ) : null}
      </View>
      <Text className={`flex-1 text-sm ml-3 ${completed ? 'text-primary line-through' : 'text-ink'}`}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default ChecklistCard;
