import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress, size = 80, strokeWidth = 6, label, color,
}) => {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped);
  const center = size / 2;
  const ringColor = color || (clamped >= 1 ? '#22C55E' : '#0F9D8A');

  return (
    <View className="items-center justify-center">
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle cx={center} cy={center} r={radius} stroke='#E5E7EB' strokeWidth={strokeWidth} fill="transparent" />
          <Circle
            cx={center} cy={center} r={radius} stroke={ringColor} strokeWidth={strokeWidth}
            fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" transform={`rotate(-90 ${center} ${center})`}
          />
        </Svg>
        <View className="absolute inset-0 items-center justify-center">
          <Text className="text-lg font-bold text-[#111827]" style={{ fontSize: size * 0.22 }}>
            {Math.round(clamped * 100)}%
          </Text>
        </View>
      </View>
      {label && <Text className="text-[13px] text-[#6B7280] mt-2 text-center">{label}</Text>}
    </View>
  );
};

export default ProgressRing;
