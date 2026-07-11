import React from 'react';
import { View, Text } from 'react-native';
import Icon from './Icon';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title, description, icon = 'bookmark', action,
}) => {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <View className="w-20 h-20 rounded-3xl bg-[#F3F4F6] items-center justify-center mb-5">
        <Icon name={icon} size={32} color='#9CA3AF' />
      </View>
      <Text className="text-[17px] font-semibold text-[#111827] text-center">{title}</Text>
      {description && <Text className="text-[14px] text-[#6B7280] text-center mt-2 px-10 leading-5">{description}</Text>}
      {action && <View className="mt-5">{action}</View>}
    </View>
  );
};

export default EmptyState;
