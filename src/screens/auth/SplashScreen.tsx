import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import { colors } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { AuthStackParamList } from '../../navigation/types';

type SplashNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashNavigationProp>();

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
          onPress={() => navigation.navigate(ROUTES.ONBOARDING)}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SplashScreen;
