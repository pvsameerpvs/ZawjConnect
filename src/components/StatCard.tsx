import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor = colors.primary,
}) => {
  return (
    <View
      className="bg-white rounded-2xl p-4 border border-borderLight flex-1"
    >
      <View
        className="w-9 h-9 rounded-xl items-center justify-center mb-2"
        style={{ backgroundColor: iconColor + '12' }}
      >
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <Text className="text-xl font-bold text-ink">{value}</Text>
      <Text className="text-xs text-muted mt-0.5">{title}</Text>
      {subtitle && <Text className="text-[10px] text-muted mt-0.5">{subtitle}</Text>}
    </View>
  );
};

export default StatCard;
