import React from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import SettingsRow from '../../components/SettingsRow';
import AppButton from '../../components/AppButton';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' as any }],
            }),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Settings" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5">
          <SettingsRow
            icon="person"
            title="Profile"
            onPress={() => navigation.navigate('Profile')}
          />
          <SettingsRow
            icon="notifications"
            title="Notifications"
            onPress={() => navigation.navigate('Notifications')}
          />
          <SettingsRow
            icon="shield-checkmark"
            title="Privacy"
            onPress={() => navigation.navigate('Privacy')}
          />
          <SettingsRow
            icon="color-palette"
            title="Theme"
            onPress={() => Alert.alert('Theme', 'Theme options coming soon')}
          />
          <SettingsRow
            icon="information-circle"
            title="About App"
            onPress={() => Alert.alert('About', 'ZawjConnect v1.0.0')}
          />
          <View className="mt-8">
            <AppButton
              title="Logout"
              variant="danger"
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default SettingsScreen;
