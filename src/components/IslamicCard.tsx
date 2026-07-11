import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { CardVariant } from '../types';

interface IslamicCardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, { bg: string; border: string }> = {
  white: { bg: 'bg-white', border: '' },
  surface: { bg: 'bg-surface', border: '' },
  ink: { bg: 'bg-ink', border: '' },
  gradient: { bg: '', border: '' },
  glass: { bg: 'bg-white/80', border: 'border border-white/40' },
  elevated: { bg: 'bg-white', border: '' },
};

const IslamicCard: React.FC<IslamicCardProps> = ({
  children, className = '', onPress, variant = 'elevated',
}) => {
  const s = variantStyles[variant];
  const baseStyle = `rounded-3xl p-5 ${s.bg} ${s.border} ${className}`;

  const shadowStyle = variant === 'elevated' || variant === 'white' ? {
    shadowColor: colors.cardShadowMd,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  } : {};

  if (variant === 'gradient') {
    const Wrapper = onPress ? TouchableOpacity : View;
    return (
      <Wrapper onPress={onPress} disabled={!onPress} activeOpacity={0.85}>
        <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className={`rounded-3xl p-5 ${className}`}>
          {children}
        </LinearGradient>
      </Wrapper>
    );
  }

  const CardWrapper = onPress ? TouchableOpacity : View;
  return (
    <CardWrapper onPress={onPress} disabled={!onPress} activeOpacity={0.85} className={baseStyle} style={shadowStyle}>
      {children}
    </CardWrapper>
  );
};

export default IslamicCard;
