import React from 'react';
import { View, Text, Switch } from 'react-native';
import { colors } from '../constants/colors';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  description?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onValueChange,
  label,
  description,
}) => {
  return (
    <View className="flex-row items-center justify-between py-3.5 border-b border-borderLight">
      <View className="flex-1 mr-4">
        <Text className="text-base font-semibold text-ink">{label}</Text>
        {description && (
          <Text className="text-xs text-muted mt-0.5">{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surface, true: colors.primary + '60' }}
        thumbColor={value ? colors.primary : colors.muted}
      />
    </View>
  );
};

export default ToggleSwitch;
