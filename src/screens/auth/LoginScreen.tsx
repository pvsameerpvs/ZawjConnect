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

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  const handleNavigateToDemo = () => {
    navigation.navigate(ROUTES.DEMO_PROFILE as any);
  };

  return (
    <ScreenWrapper background="surface">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full items-center bg-white rounded-2xl px-8 py-10 border border-borderLight"
          style={{ shadowColor: 'rgba(61, 53, 42, 0.06)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 2 }}
        >
          <View className="w-14 h-14 rounded-full bg-surface items-center justify-center mb-4">
            <Icon name="moon" size={24} color={colors.accent} />
          </View>
          <Text className="text-ink text-2xl font-bold mb-1">ZawjConnect</Text>
          <Text className="text-muted text-sm mb-8">Welcome back</Text>

          <AppButton
            title="Google Sign In"
            variant="secondary"
            onPress={handleNavigateToDemo}
            icon={<Icon name="logo-google" size={16} color={colors.primary} />}
            className="w-full mb-3"
          />
          <AppButton
            title="Continue as Demo"
            variant="ghost"
            onPress={handleNavigateToDemo}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
