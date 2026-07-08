import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { mockUser, mockSpouse } from '../../constants/mockData';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import IslamicCard from '../../components/IslamicCard';
import GradientHeader from '../../components/GradientHeader';

const JoinInviteScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!code.trim()) {
      setError('Please enter an invite code');
      setShowSuccess(false);
      return;
    }
    setError('');
    setShowSuccess(true);
  };

  const connectedName = mockUser.role === 'Husband' ? mockSpouse.name : mockUser.name;

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Join Spouse" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5 gap-4">
          {!showSuccess ? (
            <>
              <AppInput
                label="Invite Code"
                value={code}
                onChangeText={(text) => {
                  setCode(text);
                  if (error) setError('');
                }}
                placeholder="Enter invite code"
                icon="key-outline"
                error={error}
              />
              <AppButton title="Join" variant="primary" onPress={handleJoin} />
            </>
          ) : (
            <IslamicCard variant="surface">
              <View className="items-center py-4">
                <View className="w-16 h-16 rounded-full bg-success/10 items-center justify-center mb-4">
                  <Icon name="checkmark-circle" size={28} color={colors.success} />
                </View>
                <Text className="text-xl font-bold text-ink text-center">
                  Connected with {connectedName}!
                </Text>
                <Text className="text-sm text-muted text-center mt-2">
                  You are now connected with your spouse.
                </Text>
              </View>
            </IslamicCard>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default JoinInviteScreen;
