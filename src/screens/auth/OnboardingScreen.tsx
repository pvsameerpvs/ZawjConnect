import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../../components/Icon';
import { colors } from '../../constants/colors';

const slides = [
  {
    icon: 'moon', title: 'Grow Together in Deen',
    text: 'Track your daily Salah, manage family expenses, and build a shared spiritual journey together.',
    color: '#0F9D8A',
  },
  {
    icon: 'users', title: 'Connect With Your Spouse',
    text: 'Share your progress, send duas, and encourage each other to stay consistent in worship.',
    color: '#F59E6B',
  },
  {
    icon: 'shield', title: 'Private and Flexible',
    text: 'You control what to share. Your spiritual journey stays personal unless you choose otherwise.',
    color: '#3B82F6',
  },
];

const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="px-6 pt-6 pb-4 flex-row justify-end">
        <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}
          className="px-4 py-2 rounded-2xl bg-white border border-[#E5E7EB]"
        >
          <Text className="text-[#6B7280] text-[13px] font-semibold">Skip</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center">
          <LinearGradient colors={[colors.ink, colors.primaryDark]} className="w-24 h-24 rounded-3xl items-center justify-center mb-8"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 5,
            }}
          >
            <Icon name={slide.icon} size={36} color={colors.accentLight} />
          </LinearGradient>
          <Text className="text-[#111827] text-[28px] font-bold text-center tracking-tight mb-4">{slide.title}</Text>
          <Text className="text-[#6B7280] text-[16px] text-center leading-7 px-4">{slide.text}</Text>
        </View>
      </View>

      <View className="flex-row justify-center mb-8 gap-2.5">
        {slides.map((_, index) => (
          <View key={index}
            className={`rounded-full ${index === current ? 'w-7 h-[5px] bg-primary' : 'w-[5px] h-[5px] bg-[#D1D5DB]'}`}
          />
        ))}
      </View>

      <View className="px-6 pb-10">
        <TouchableOpacity
          onPress={() => isLast ? router.push('/(auth)/login') : setCurrent(c => c + 1)}
          activeOpacity={0.85}
          className="bg-primary h-[58px] rounded-3xl items-center justify-center flex-row"
          style={{
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <Text className="text-white text-[17px] font-bold tracking-tight mr-2">
            {isLast ? 'Get Started' : 'Next'}
          </Text>
          {!isLast && <Icon name="arrow" size={18} color='#FFFFFF' />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
