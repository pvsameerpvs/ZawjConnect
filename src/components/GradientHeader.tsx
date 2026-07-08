import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: React.ReactNode;
}

const GradientHeader: React.FC<GradientHeaderProps> = ({
  title,
  subtitle,
  rightIcon,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.ink, colors.primaryDark]}
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
            <Text className="text-sm text-accent-light mt-1.5">{subtitle}</Text>
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
