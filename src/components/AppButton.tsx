import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { colors } from '../constants/colors';
import { ButtonVariant } from '../types';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border: string }> = {
  primary: { bg: 'bg-primary', text: 'text-white', border: '' },
  secondary: { bg: 'bg-white', text: 'text-primary', border: 'border border-borderLight' },
  accent: { bg: 'bg-accent', text: 'text-ink', border: '' },
  ghost: { bg: 'bg-transparent', text: 'text-primary', border: '' },
  danger: { bg: 'bg-error', text: 'text-white', border: '' },
};

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  className = '',
  textClassName = '',
}) => {
  const styles = variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`h-[50px] rounded-2xl flex-row items-center justify-center ${styles.bg} ${styles.border} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'accent' ? colors.white : colors.primary} />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && <View className="mr-2">{icon}</View>}
           <Text className={`text-base font-semibold ${styles.text} ${textClassName}`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
