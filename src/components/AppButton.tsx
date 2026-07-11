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
  size?: 'md' | 'lg';
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border: string }> = {
  primary: { bg: 'bg-primary', text: 'text-white', border: '' },
  secondary: { bg: 'bg-white', text: 'text-primary', border: 'border border-border' },
  accent: { bg: 'bg-accent', text: 'text-white', border: '' },
  ghost: { bg: 'bg-primary/8', text: 'text-primary', border: '' },
  danger: { bg: 'bg-error', text: 'text-white', border: '' },
  outline: { bg: 'bg-transparent', text: 'text-primary', border: 'border border-primary' },
};

const shadowPresets: Record<string, object> = {
  primary: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  accent: { shadowColor: colors.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  danger: { shadowColor: colors.error, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
};

const sizeStyles = {
  md: 'h-[52px] px-6 rounded-2xl',
  lg: 'h-[60px] px-8 rounded-3xl',
};

const AppButton: React.FC<AppButtonProps> = ({
  title, onPress, variant = 'primary', icon, loading = false,
  disabled = false, className = '', textClassName = '', size = 'md',
}) => {
  const s = variantStyles[variant];
  const shadow = shadowPresets[variant] || {};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      className={`flex-row items-center justify-center ${sizeStyles[size]} ${s.bg} ${s.border} ${disabled ? 'opacity-50' : ''} ${className}`}
      style={s.bg !== 'bg-transparent' && !disabled ? shadow : {}}
    >
      {loading ? (
        <ActivityIndicator color={s.text === 'text-white' ? colors.white : colors.primary} />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && <View className="mr-2.5">{icon}</View>}
          <Text className={`text-[15px] font-semibold tracking-tight ${s.text} ${textClassName}`}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
