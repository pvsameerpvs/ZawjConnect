import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import { colors } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { AuthStackParamList } from '../../navigation/types';

type OnboardingNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

const slides = [
  {
    icon: 'moon' as const,
    title: 'Grow Together in Deen',
    text: 'Track your daily Salah, Quran reading, and dhikr. Build a shared spiritual journey with your spouse.',
  },
  {
    icon: 'people' as const,
    title: 'Connect With Your Spouse',
    text: 'Share your progress, send duas, and encourage each other to stay consistent in worship.',
  },
  {
    icon: 'shield-checkmark' as const,
    title: 'Private and Flexible',
    text: 'You control what to share. Your spiritual journey stays personal unless you choose otherwise.',
  },
];

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      navigation.navigate(ROUTES.LOGIN);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <ScreenWrapper background="surface">
      <View className="flex-1">
        <View className="flex-row justify-end pt-2">
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)} activeOpacity={0.7}>
            <Text className="text-muted text-base font-medium">Skip</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center px-4">
          <View className="w-20 h-20 rounded-full bg-surface items-center justify-center mb-8 border border-borderLight">
            <Icon name={slide.icon} size={28} color={colors.accent} />
          </View>

          <Text className="text-ink text-2xl font-bold text-center mb-4">
            {slide.title}
          </Text>

          <Text className="text-muted text-base text-center leading-6 px-2">
            {slide.text}
          </Text>
        </View>

        <View className="flex-row justify-center mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1.5 ${
                index === currentSlide ? 'bg-accent' : 'bg-surface'
              }`}
            />
          ))}
        </View>

        <View className="flex-row justify-end mb-2">
          <AppButton
            title={isLastSlide ? 'Get Started' : 'Next'}
            variant="accent"
            onPress={handleNext}
            icon={
              !isLastSlide ? (
                <Icon name="arrow-forward" size={16} color={colors.white} />
              ) : undefined
            }
            className="px-8"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default OnboardingScreen;
