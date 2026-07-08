import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../constants/colors';

interface MockMapCardProps {
  sharingEnabled: boolean;
  onToggleSharing: () => void;
}

const MockMapCard: React.FC<MockMapCardProps> = ({
  sharingEnabled,
  onToggleSharing,
}) => {
  return (
    <View
      className="rounded-2xl overflow-hidden border border-ink/10"
    >
      <View className="bg-ink h-44 relative">
        <View className="absolute top-8 left-8 items-center">
          <Icon name="location-outline" size={24} color={colors.accent} />
          <View className="bg-white/90 px-2 py-1 rounded-lg mt-1">
            <Text className="text-xs font-semibold text-ink">Sameer</Text>
            <Text className="text-[10px] text-muted">Dubai, UAE</Text>
          </View>
        </View>
        <View className="absolute bottom-8 right-8 items-center">
          <Icon name="location-outline" size={24} color={colors.primary} />
          <View className="bg-white/90 px-2 py-1 rounded-lg mt-1">
            <Text className="text-xs font-semibold text-ink">Sherin</Text>
            <Text className="text-[10px] text-muted">Kerala, India</Text>
          </View>
        </View>
      </View>

      <View className="bg-white px-4 py-3 flex-row items-center justify-between">
        <View>
          <Text className="text-xs text-muted">Location Sharing</Text>
          <Text className="text-sm font-semibold text-ink">{sharingEnabled ? 'Enabled' : 'Disabled'}</Text>
        </View>
        <TouchableOpacity
          onPress={onToggleSharing}
          activeOpacity={0.7}
          className={`px-4 py-2 rounded-xl ${sharingEnabled ? 'bg-primary' : 'bg-surface'}`}
        >
          <Text className={`text-xs font-semibold ${sharingEnabled ? 'text-white' : 'text-muted'}`}>
            {sharingEnabled ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MockMapCard;
