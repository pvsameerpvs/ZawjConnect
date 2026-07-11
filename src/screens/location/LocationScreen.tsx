import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MockMapCard from '../../components/MockMapCard';
import ToggleSwitch from '../../components/ToggleSwitch';

const LocationScreen: React.FC = () => {
  const [sharingEnabled, setSharingEnabled] = useState(true);

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <View style={{ gap: 16 }}>
          <MockMapCard sharingEnabled={sharingEnabled} onToggleSharing={() => setSharingEnabled(p => !p)} />

          <View className="flex-row items-center justify-center gap-1.5">
            <View className="w-1.5 h-1.5 rounded-full bg-success" />
            <Text className="text-[12px] text-[#6B7280]">Last synced: 2 min ago</Text>
          </View>

          <TouchableOpacity onPress={() => Alert.alert('Refresh', 'Location refreshed')} activeOpacity={0.85}
            className="h-[52px] rounded-2xl bg-white items-center justify-center border border-[#E5E7EB]"
          >
            <Text className="text-primary text-[15px] font-semibold">Refresh Location</Text>
          </TouchableOpacity>

          <View className="bg-white rounded-3xl px-4"
            style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
          >
            <ToggleSwitch value={sharingEnabled} onValueChange={setSharingEnabled}
              label="Location Sharing" description="Allow your spouse to see your live location" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LocationScreen;
