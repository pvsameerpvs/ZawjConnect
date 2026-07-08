import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}) => {
  return (
    <View className="flex-row items-center justify-between mb-3 mt-1">
      <View className="flex-1">
        <Text className="text-lg font-bold text-ink">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-muted mt-0.5">{subtitle}</Text>
        )}
      </View>
      {actionLabel && onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <Text className="text-sm font-semibold text-primary">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
