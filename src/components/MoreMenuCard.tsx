import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

interface MoreMenuCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  iconColor?: string;
  onPress: () => void;
}

const MoreMenuCard: React.FC<MoreMenuCardProps> = ({
  title, subtitle, icon, iconColor = '#0F9D8A', onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 flex-row items-center"
      style={{
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 1,
      }}
    >
      <View className="w-12 h-12 rounded-2xl items-center justify-center" style={{ backgroundColor: iconColor + '12' }}>
        <Icon name={icon} size={22} color={iconColor} />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-[15px] font-semibold text-[#111827]">{title}</Text>
        {subtitle && <Text className="text-[12px] text-[#6B7280] mt-0.5">{subtitle}</Text>}
      </View>
      <Icon name="chevron" size={18} color='#9CA3AF' />
    </TouchableOpacity>
  );
};

export default MoreMenuCard;
