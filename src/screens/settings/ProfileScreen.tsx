import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import IslamicCard from '../../components/IslamicCard';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { mockUser } from '../../constants/mockData';
import { colors } from '../../constants/colors';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [city, setCity] = useState(mockUser.city);
  const [country, setCountry] = useState(mockUser.country);

  const handleSave = () => {
    Alert.alert('Saved', 'Profile updated');
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Profile" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5">
          <IslamicCard>
            <View className="items-center mb-6">
              <View
                className="w-20 h-20 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: colors.primary + '12' }}
              >
                <Text className="text-3xl font-bold text-primary">
                  {name.charAt(0)}
                </Text>
              </View>
              <Text className="text-lg font-bold text-ink">{name}</Text>
              <Text className="text-sm text-muted">{email}</Text>
            </View>
            <AppInput
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              icon="person"
            />
            <AppInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              icon="mail"
            />
            <AppInput
              label="City"
              value={city}
              onChangeText={setCity}
              placeholder="Enter your city"
              icon="location"
            />
            <AppInput
              label="Country"
              value={country}
              onChangeText={setCountry}
              placeholder="Enter your country"
              icon="globe"
            />
            <View className="mb-4">
              <Text className="text-sm font-medium text-ink mb-2">Role</Text>
              <View className="bg-surface rounded-2xl h-[52px] justify-center px-4">
                <Text className="text-base text-ink">{mockUser.role}</Text>
              </View>
            </View>
            <View className="mb-4">
              <Text className="text-sm font-medium text-ink mb-2">Spouse</Text>
              <View className="bg-surface rounded-2xl h-[52px] justify-center px-4">
                <Text className="text-base text-ink">{mockUser.spouse}</Text>
              </View>
            </View>
          </IslamicCard>
          <View className="mt-6">
            <AppButton
              title="Save Changes"
              variant="primary"
              onPress={handleSave}
            />
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default ProfileScreen;
