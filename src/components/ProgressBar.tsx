import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../constants/colors';

interface ProgressBarProps {
  progress: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  color = colors.primary,
  showPercentage = false,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View className="w-full">
      {(label || showPercentage) && (
        <View className="flex-row justify-between items-center mb-1.5">
          {label && <Text className="text-xs text-muted font-medium">{label}</Text>}
          {showPercentage && (
            <Text className="text-xs font-semibold" style={{ color }}>
              {Math.round(clampedProgress * 100)}%
            </Text>
          )}
        </View>
      )}
      <View className="h-2 bg-surface rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{
            width: `${clampedProgress * 100}%`,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
