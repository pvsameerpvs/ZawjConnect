import React from 'react';
import { View, Text } from 'react-native';
import Icon from './Icon';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title, value, subtitle, icon, iconColor = '#0F9D8A',
}) => {
  return (
    <View className="bg-white rounded-2xl p-4 flex-1"
      style={{
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 1,
      }}
    >
      <View className="w-10 h-10 rounded-xl items-center justify-center mb-3" style={{ backgroundColor: iconColor + '12' }}>
        <Icon name={icon} size={18} color={iconColor} />
      </View>
      <Text className="text-[22px] font-bold text-[#111827] tracking-tight">{value}</Text>
      <Text className="text-[12px] text-[#6B7280] mt-0.5 font-medium">{title}</Text>
      {subtitle && <Text className="text-[11px] text-[#9CA3AF] mt-0.5">{subtitle}</Text>}
    </View>
  );
};

export default StatCard;
