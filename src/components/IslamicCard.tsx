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

const variantStyles: Record<CardVariant, { bg: string; border: string; hasShadow: boolean }> = {
  white: { bg: 'bg-white', border: 'border border-borderLight', hasShadow: true },
  surface: { bg: 'bg-surface', border: '', hasShadow: false },
  ink: { bg: 'bg-ink', border: '', hasShadow: false },
  gradient: { bg: '', border: '', hasShadow: false },
  glass: { bg: 'bg-white/90', border: 'border border-white/60', hasShadow: false },
};

const IslamicCard: React.FC<IslamicCardProps> = ({
  children,
  className = '',
  onPress,
  variant = 'white',
}) => {
  const styles = variantStyles[variant];
  const cardStyle = `rounded-2xl p-4 ${styles.bg} ${styles.border} ${className}`;

  const shadowStyle = styles.hasShadow ? {
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 1,
  } : {};

  const commonProps = {
    activeOpacity: onPress ? 0.7 : 1,
  };

  if (variant === 'gradient') {
    const Wrapper = onPress ? TouchableOpacity : View;
    return (
      <Wrapper onPress={onPress} disabled={!onPress} {...commonProps}>
        <LinearGradient
          colors={[colors.ink, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={`rounded-2xl p-4 ${className}`}
        >
          {children}
        </LinearGradient>
      </Wrapper>
    );
  }

  const CardWrapper = onPress ? TouchableOpacity : View;
  return (
    <CardWrapper
      onPress={onPress}
      disabled={!onPress}
      {...commonProps}
      className={cardStyle}
      style={shadowStyle}
    >
      {children}
    </CardWrapper>
  );
};

export default IslamicCard;
