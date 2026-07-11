import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

interface MockMapCardProps {
  sharingEnabled: boolean;
  onToggleSharing: () => void;
}

const MockMapCard: React.FC<MockMapCardProps> = ({ sharingEnabled, onToggleSharing }) => {
  return (
    <View className="rounded-3xl overflow-hidden"
      style={{
        shadowColor: 'rgba(0,0,0,0.06)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <View className="bg-[#111827] h-48 relative">
        <View className="absolute top-12 left-8 items-center">
          <View className="w-10 h-10 rounded-2xl bg-accent/20 items-center justify-center mb-1">
            <Icon name="location" size={20} color='#F59E6B' />
          </View>
          <View className="bg-white/95 px-3 py-1.5 rounded-xl">
            <Text className="text-[12px] font-bold text-[#111827]">Sameer</Text>
            <Text className="text-[10px] text-[#6B7280]">Dubai, UAE</Text>
          </View>
        </View>
        <View className="absolute bottom-12 right-8 items-center">
          <View className="w-10 h-10 rounded-2xl bg-primary/20 items-center justify-center mb-1">
            <Icon name="location" size={20} color='#0F9D8A' />
          </View>
          <View className="bg-white/95 px-3 py-1.5 rounded-xl">
            <Text className="text-[12px] font-bold text-[#111827]">Sherin</Text>
            <Text className="text-[10px] text-[#6B7280]">Kerala, India</Text>
          </View>
        </View>
      </View>
      <View className="bg-white px-5 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-[12px] text-[#6B7280] font-medium">Location Sharing</Text>
          <Text className="text-[15px] font-semibold text-[#111827] mt-0.5">{sharingEnabled ? 'Enabled' : 'Disabled'}</Text>
        </View>
        <TouchableOpacity
          onPress={onToggleSharing}
          activeOpacity={0.7}
          className={`px-5 py-2.5 rounded-xl ${sharingEnabled ? 'bg-primary' : 'bg-[#F3F4F6] border border-[#E5E7EB]'}`}
        >
          <Text className={`text-[12px] font-bold ${sharingEnabled ? 'text-white' : 'text-[#6B7280]'}`}>
            {sharingEnabled ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MockMapCard;
