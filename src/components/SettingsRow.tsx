import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface SettingsRowProps {
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  iconColor?: string;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  rightElement,
  iconColor = colors.primary,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className="flex-row items-center py-3.5 border-b border-borderLight"
    >
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: iconColor + '12' }}
      >
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-ink">{title}</Text>
        {subtitle && <Text className="text-xs text-muted mt-0.5">{subtitle}</Text>}
      </View>
      {rightElement || (onPress && <Ionicons name="chevron-forward" size={16} color={colors.muted} />)}
    </Container>
  );
};

export default SettingsRow;
