import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
  progress: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress, label, color = '#0F9D8A', showPercentage = false,
}) => {
  const clamped = Math.min(Math.max(progress, 0), 1);

  return (
    <View className="w-full">
      {(label || showPercentage) && (
        <View className="flex-row justify-between items-center mb-2">
          {label && <Text className="text-[13px] text-[#6B7280] font-medium">{label}</Text>}
          {showPercentage && <Text className="text-[13px] font-bold" style={{ color }}>{Math.round(clamped * 100)}%</Text>}
        </View>
      )}
      <View className="h-[6px] bg-[#F3F4F6] rounded-full overflow-hidden">
        <View className="h-full rounded-full" style={{ width: `${clamped * 100}%`, backgroundColor: color }} />
      </View>
    </View>
  );
};

export default ProgressBar;
