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

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border: string; shadow: boolean }> = {
  primary: { bg: 'bg-primary', text: 'text-white', border: '', shadow: true },
  secondary: { bg: 'bg-white', text: 'text-primary', border: 'border border-borderLight', shadow: false },
  accent: { bg: 'bg-accent', text: 'text-white', border: '', shadow: false },
  ghost: { bg: 'bg-transparent', text: 'text-primary', border: '', shadow: false },
  danger: { bg: 'bg-error', text: 'text-white', border: '', shadow: false },
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

  const shadowStyle = styles.shadow ? {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  } : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      className={`h-[50px] rounded-2xl flex-row items-center justify-center ${styles.bg} ${styles.border} ${disabled ? 'opacity-50' : ''} ${className}`}
      style={shadowStyle}
    >
      {loading ? (
        <ActivityIndicator color={styles.text === 'text-white' ? colors.white : colors.primary} />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && <View className="mr-2">{icon}</View>}
           <Text className={`text-base font-semibold tracking-wide ${styles.text} ${textClassName}`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
