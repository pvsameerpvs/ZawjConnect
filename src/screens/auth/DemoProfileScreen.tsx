import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { colors } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';


const DemoProfileScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState<'Husband' | 'Wife'>('Husband');

  const handleSave = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScreenWrapper background="surface" scroll withPadding={false}>
      <View className="flex-1 px-5 pt-8">
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-surface items-center justify-center mb-4">
            <Icon name="person-circle-outline" size={28} color={colors.accent} />
          </View>
          <Text className="text-ink text-2xl font-bold">Create Your Profile</Text>
          <Text className="text-muted text-sm mt-1">Set up your demo account</Text>
        </View>

        <AppInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          icon="person-outline"
        />

        <AppInput
          label="City"
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
          icon="location-outline"
        />

        <AppInput
          label="Country"
          value={country}
          onChangeText={setCountry}
          placeholder="Enter your country"
          icon="globe-outline"
        />

        <Text className="text-sm font-medium text-ink mb-3">I am a</Text>
        <View className="flex-row gap-3 mb-8">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setRole('Husband')}
            className={`flex-1 h-[52px] rounded-2xl items-center justify-center flex-row border ${
               role === 'Husband' ? 'bg-ink border-brown' : 'bg-white border-borderLight'
            }`}
            style={role === 'Husband' ? { shadowColor: colors.ink, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 } : {}}
          >
            <Icon
              name={role === 'Husband' ? 'man' : 'man-outline'}
              size={20}
              color={role === 'Husband' ? colors.white : colors.muted}
            />
            <Text className={`ml-2 text-base font-semibold ${role === 'Husband' ? 'text-white' : 'text-muted'}`}>
              Husband
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setRole('Wife')}
            className={`flex-1 h-[52px] rounded-2xl items-center justify-center flex-row border ${
               role === 'Wife' ? 'bg-ink border-brown' : 'bg-white border-borderLight'
            }`}
            style={role === 'Wife' ? { shadowColor: colors.ink, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 } : {}}
          >
            <Icon
              name={role === 'Wife' ? 'woman' : 'woman-outline'}
              size={20}
              color={role === 'Wife' ? colors.white : colors.muted}
            />
            <Text className={`ml-2 text-base font-semibold ${role === 'Wife' ? 'text-white' : 'text-muted'}`}>
              Wife
            </Text>
          </TouchableOpacity>
        </View>

        <AppButton
          title="Save Profile"
          variant="primary"
          onPress={handleSave}
        />
      </View>
    </ScreenWrapper>
  );
};

export default DemoProfileScreen;
