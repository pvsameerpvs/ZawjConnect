import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

interface ChecklistCardProps {
  item: { id: string; label: string };
  completed: boolean;
  onToggle: () => void;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ item, completed, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      className={`flex-row items-center py-3.5 px-4 rounded-2xl mb-2 ${completed ? 'bg-primary/5' : 'bg-white'}`}
      style={{
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: completed ? 0 : 0.5,
        borderWidth: completed ? 1 : 0,
        borderColor: completed ? '#0F9D8A20' : 'transparent',
      }}
    >
      <View className={`w-7 h-7 rounded-xl items-center justify-center ${completed ? 'bg-primary' : 'border-2 border-[#D1D5DB]'}`}>
        {completed ? <Icon name="check" size={15} color='#FFFFFF' /> : null}
      </View>
      <Text className={`flex-1 text-[14px] ml-3 ${completed ? 'text-primary line-through' : 'text-[#111827] font-medium'}`}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default ChecklistCard;
