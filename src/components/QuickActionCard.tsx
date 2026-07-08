import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../constants/colors';

interface QuickActionCardProps {
  title: string;
  icon: string;
  onPress: () => void;
  iconColor?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  icon,
  onPress,
  iconColor = colors.primary,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl py-4 px-3 items-center border border-borderLight"
      style={{
        width: '30%',
      }}
    >
      <View
        className="w-11 h-11 rounded-xl items-center justify-center mb-2"
        style={{ backgroundColor: iconColor + '12' }}
      >
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <Text className="text-xs font-semibold text-ink text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default QuickActionCard;
