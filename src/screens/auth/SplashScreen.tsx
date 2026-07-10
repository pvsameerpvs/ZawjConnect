import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../../components/Icon';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import { colors } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';


const SplashScreen: React.FC = () => {
  const router = useRouter();

  return (
    <ScreenWrapper background="ink" withPadding={false}>
      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center">
          <View className="w-20 h-20 rounded-full bg-white/10 items-center justify-center mb-6 border border-white/20">
            <Icon name="moon" size={28} color={colors.accentLight} />
          </View>
          <Text className="text-white text-3xl font-bold tracking-wider">
            ZawjConnect
          </Text>
          <Text className="text-accent-light text-base mt-3 text-center">
            Grow closer to Allah, together.
          </Text>
          <View className="w-12 h-0.5 bg-accent-light/50 rounded-full mt-5" />
        </View>
      </View>
      <View className="px-6 pb-8">
        <AppButton
          title="Continue"
          variant="accent"
          onPress={() => router.push('/(auth)/onboarding')}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SplashScreen;
