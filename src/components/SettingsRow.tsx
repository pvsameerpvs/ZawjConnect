import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

interface SettingsRowProps {
  title: string;
  subtitle?: string;
  icon: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  iconColor?: string;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  title, subtitle, icon, onPress, rightElement, iconColor = '#0F9D8A',
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container onPress={onPress} activeOpacity={onPress ? 0.7 : 1} className="flex-row items-center py-3.5">
      <View className="w-11 h-11 rounded-2xl items-center justify-center" style={{ backgroundColor: iconColor + '12' }}>
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-[15px] font-semibold text-[#111827]">{title}</Text>
        {subtitle && <Text className="text-[12px] text-[#6B7280] mt-0.5">{subtitle}</Text>}
      </View>
      {rightElement || (onPress && <Icon name="chevron" size={18} color='#9CA3AF' />)}
    </Container>
  );
};

export default SettingsRow;
