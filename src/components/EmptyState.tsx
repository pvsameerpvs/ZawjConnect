import React from 'react';
import { View, Text } from 'react-native';
import Icon from './Icon';
import { colors } from '../constants/colors';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'bookmark-outline',
}) => {
  return (
    <View className="flex-1 items-center justify-center py-12">
      <View className="w-16 h-16 rounded-full bg-surface items-center justify-center mb-4">
        <Icon name={icon} size={24} color={colors.muted} />
      </View>
      <Text className="text-base font-semibold text-ink text-center">{title}</Text>
      {description && (
        <Text className="text-sm text-muted text-center mt-1 px-8">{description}</Text>
      )}
    </View>
  );
};

export default EmptyState;
