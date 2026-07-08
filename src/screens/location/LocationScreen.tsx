import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import GradientHeader from '../../components/GradientHeader';
import MockMapCard from '../../components/MockMapCard';
import ToggleSwitch from '../../components/ToggleSwitch';

const LocationScreen: React.FC = () => {
  const [sharingEnabled, setSharingEnabled] = useState(true);

  const handleToggleSharing = () => {
    setSharingEnabled((prev) => !prev);
  };

  const handleRefresh = () => {
    Alert.alert('Refresh', 'Location refreshed successfully');
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Live Location" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5 gap-4">
          <MockMapCard
            sharingEnabled={sharingEnabled}
            onToggleSharing={handleToggleSharing}
          />

          <Text className="text-xs text-muted text-center">
            Last synced: 2 min ago
          </Text>

          <AppButton
            title="Refresh Location"
            variant="secondary"
            onPress={handleRefresh}
          />

          <ToggleSwitch
            value={sharingEnabled}
            onValueChange={setSharingEnabled}
            label="Location Sharing"
            description="Allow your spouse to see your live location"
          />
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default LocationScreen;
