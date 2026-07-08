import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../constants/colors';

interface MoreMenuCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  iconColor?: string;
  onPress: () => void;
}

const MoreMenuCard: React.FC<MoreMenuCardProps> = ({
  title,
  subtitle,
  icon,
  iconColor = colors.primary,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 flex-row items-center border border-borderLight mb-3"
    >
      <View
        className="w-11 h-11 rounded-xl items-center justify-center"
        style={{ backgroundColor: iconColor + '12' }}
      >
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-ink">{title}</Text>
        {subtitle && <Text className="text-xs text-muted mt-0.5">{subtitle}</Text>}
      </View>
      <Icon name="chevron-forward" size={16} color={colors.muted} />
    </TouchableOpacity>
  );
};

export default MoreMenuCard;
