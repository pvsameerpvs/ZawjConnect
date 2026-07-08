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
  title,
  subtitle,
  rightIcon,
  variant = 'default',
}) => {
  const insets = useSafeAreaInsets();
  const gradient = gradients[variant];

  return (
    <LinearGradient
      colors={gradient.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-b-3xl"
      style={{
        paddingTop: insets.top + 20,
        paddingBottom: 28,
      }}
    >
      <View className="flex-row items-center justify-between px-5">
        <View className="flex-1">
          <Text className="text-xl font-bold text-white tracking-wide">{title}</Text>
          {subtitle && (
            <Text className="text-sm text-white/80 mt-1.5 font-medium">{subtitle}</Text>
          )}
        </View>
        {rightIcon && (
          <View className="ml-4">{rightIcon}</View>
        )}
      </View>
    </LinearGradient>
  );
};

export default GradientHeader;
