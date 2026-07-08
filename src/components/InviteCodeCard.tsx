import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface InviteCodeCardProps {
  code: string;
  onGenerate: () => void;
  onCopy: () => void;
  onShare: () => void;
}

const InviteCodeCard: React.FC<InviteCodeCardProps> = ({
  code,
  onGenerate,
  onCopy,
  onShare,
}) => {
  return (
    <View
      className="bg-white rounded-2xl p-6 border border-borderLight items-center"
    >
      <View className="w-14 h-14 rounded-full bg-primary/10 items-center justify-center mb-4">
        <Ionicons name="link" size={24} color={colors.primary} />
      </View>
      <Text className="text-lg font-bold text-ink">Invite Your Spouse</Text>
      <Text className="text-sm text-muted text-center mt-1 mb-5">
        Share this code with your spouse to connect
      </Text>

      {code ? (
        <View className="bg-surface rounded-2xl px-6 py-4 mb-5 w-full items-center border border-borderLight">
          <Text className="text-2xl font-bold tracking-widest text-primary">{code}</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onGenerate}
          activeOpacity={0.7}
          className="bg-primary rounded-2xl px-8 py-3 mb-5"
        >
          <Text className="text-white font-semibold">Generate Code</Text>
        </TouchableOpacity>
      )}

      {code && (
        <View className="flex-row gap-2.5">
          <TouchableOpacity
            onPress={onCopy}
            activeOpacity={0.7}
            className="flex-row items-center bg-surface rounded-2xl px-5 py-2.5"
          >
            <Ionicons name="copy-outline" size={16} color={colors.primary} />
            <Text className="text-sm font-semibold text-primary ml-2">Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onShare}
            activeOpacity={0.7}
            className="flex-row items-center bg-primary rounded-2xl px-5 py-2.5"
          >
            <Ionicons name="share-outline" size={16} color={colors.white} />
            <Text className="text-sm font-semibold text-white ml-2">Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default InviteCodeCard;
