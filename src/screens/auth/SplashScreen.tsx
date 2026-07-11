import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';

const SplashScreen: React.FC = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={[colors.ink, colors.primaryDark]} className="flex-1">
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-24 h-24 rounded-3xl bg-white/10 items-center justify-center mb-8 border border-white/20"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 24,
            elevation: 8,
          }}
        >
          <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center">
            <Text className="text-white text-[28px] font-bold">Z</Text>
          </View>
        </View>
        <Text className="text-white text-[40px] font-bold tracking-tight text-center leading-none">
          ZawjConnect
        </Text>
        <Text className="text-white/60 text-[17px] mt-3 text-center leading-6 font-medium">
          Grow closer to Allah, together.
        </Text>
        <View className="w-16 h-[3px] bg-accent/50 rounded-full mt-8" />
      </View>
      <View className="px-8 pb-12">
        <TouchableOpacity
          onPress={() => router.push('/(auth)/onboarding')}
          activeOpacity={0.85}
          className="bg-accent h-[60px] rounded-3xl items-center justify-center"
          style={{
            shadowColor: colors.accent,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          <Text className="text-white text-[17px] font-bold tracking-tight">Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;
