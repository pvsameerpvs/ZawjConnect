import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';
import { colors } from '../../constants/colors';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={[colors.ink, colors.primaryDark]} className="flex-1">
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-full bg-white/95 rounded-4xl px-8 py-10 max-w-sm"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 6,
          }}
        >
          <View className="w-14 h-14 rounded-2xl bg-[#F8FAFC] items-center justify-center mb-5 mx-auto">
            <Icon name="moon" size={22} color={colors.accent} />
          </View>
          <Text className="text-[#111827] text-[26px] font-bold tracking-tight text-center">ZawjConnect</Text>
          <Text className="text-[#6B7280] text-[15px] text-center mt-1 mb-8">Welcome back</Text>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/demo-profile')}
            activeOpacity={0.85}
            className="h-[54px] rounded-2xl flex-row items-center justify-center bg-white border border-[#E5E7EB] mb-3"
          >
            <Icon name="google" size={18} color='#4285F4' />
            <Text className="text-[#111827] text-[15px] font-semibold ml-3">Google Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/demo-profile')}
            activeOpacity={0.7}
            className="h-[48px] rounded-2xl items-center justify-center bg-primary/8"
          >
            <Text className="text-primary text-[15px] font-semibold">Continue as Demo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
