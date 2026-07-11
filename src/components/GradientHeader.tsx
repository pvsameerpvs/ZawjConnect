import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'gold';
}

const gradients = {
  default: { colors: [colors.ink, colors.primaryDark] as const },
  gold: { colors: [colors.ink, colors.accentDark] as const },
};

const GradientHeader: React.FC<GradientHeaderProps> = ({
  title, subtitle, rightIcon, variant = 'default',
}) => {
  const insets = useSafeAreaInsets();
  const gradient = gradients[variant];

  return (
    <LinearGradient colors={gradient.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={{ paddingTop: insets.top + 16, paddingBottom: 24, paddingHorizontal: 24 }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-[28px] font-bold text-white tracking-tight leading-none">{title}</Text>
            {subtitle && <Text className="text-[15px] text-white/70 mt-1.5 font-medium">{subtitle}</Text>}
          </View>
          {rightIcon && <View className="ml-4">{rightIcon}</View>}
        </View>
      </View>
    </LinearGradient>
  );
};

export default GradientHeader;
