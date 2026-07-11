import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, actionLabel, onActionPress }) => {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-1">
        <Text className="text-[20px] font-bold text-[#111827] tracking-tight">{title}</Text>
        {subtitle && <Text className="text-[13px] text-[#6B7280] mt-0.5">{subtitle}</Text>}
      </View>
      {actionLabel && onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7} className="px-3 py-1.5 rounded-xl bg-primary/8">
          <Text className="text-[13px] font-semibold text-primary">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
