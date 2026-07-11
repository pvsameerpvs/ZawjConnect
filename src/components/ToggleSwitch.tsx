import React from 'react';
import { View, Text, Switch } from 'react-native';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  description?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange, label, description }) => {
  return (
    <View className="flex-row items-center justify-between py-3.5">
      <View className="flex-1 mr-4">
        <Text className="text-[15px] font-semibold text-[#111827]">{label}</Text>
        {description && <Text className="text-[12px] text-[#6B7280] mt-0.5 leading-4">{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E5E7EB', true: '#0F9D8A50' }}
        thumbColor={value ? '#0F9D8A' : '#9CA3AF'}
        ios_backgroundColor='#E5E7EB'
      />
    </View>
  );
};

export default ToggleSwitch;
