import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
  background?: 'surface' | 'ink' | 'white' | 'gradient';
  withPadding?: boolean;
  edges?: Edge[];
}

const DEFAULT_EDGES: Edge[] = ['top', 'bottom'];

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scroll = false,
  className = '',
  contentClassName = '',
  background = 'surface',
  withPadding = true,
  edges = DEFAULT_EDGES,
}) => {
  const bgColors: Record<string, string> = {
    surface: colors.surface,
    ink: colors.ink,
    white: colors.white,
  };

  const content = (
    <View className={`flex-1 ${withPadding ? 'px-5' : ''} ${contentClassName}`}>
      {children}
    </View>
  );

  const wrappedContent = scroll ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    content
  );

  if (background === 'gradient') {
    return (
      <LinearGradient
        colors={[colors.ink, colors.primaryDark]}
        className={`flex-1 ${className}`}
      >
        <SafeAreaView edges={edges} className="flex-1">
          {wrappedContent}
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView
      edges={edges}
      className={`flex-1 ${className}`}
      style={{ backgroundColor: bgColors[background] || colors.surface }}
    >
      {wrappedContent}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
