import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

interface InviteCodeCardProps {
  code: string;
  onGenerate: () => void;
  onCopy: () => void;
  onShare: () => void;
}

const InviteCodeCard: React.FC<InviteCodeCardProps> = ({ code, onGenerate, onCopy, onShare }) => {
  return (
    <View className="bg-white rounded-3xl p-6 items-center"
      style={{
        shadowColor: 'rgba(0,0,0,0.06)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 3,
      }}
    >
      <View className="w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-4">
        <Icon name="link" size={28} color='#0F9D8A' />
      </View>
      <Text className="text-[22px] font-bold text-[#111827]">Invite Your Spouse</Text>
      <Text className="text-[14px] text-[#6B7280] text-center mt-1.5 mb-6 leading-5">
        Share this code with your spouse to connect your accounts
      </Text>

      {code ? (
        <View className="bg-[#F8FAFC] rounded-2xl px-6 py-5 mb-6 w-full items-center border border-[#E5E7EB]">
          <Text className="text-[32px] font-bold tracking-[0.3em] text-primary">{code}</Text>
          <Text className="text-[12px] text-[#6B7280] mt-2">Share this code before it expires</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onGenerate}
          activeOpacity={0.8}
          className="bg-primary rounded-2xl px-10 py-3.5 mb-4"
          style={{
            shadowColor: '#0F9D8A',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text className="text-white font-bold text-[15px]">Generate Code</Text>
        </TouchableOpacity>
      )}

      {code && (
        <View className="flex-row gap-3">
          <TouchableOpacity onPress={onCopy} activeOpacity={0.7} className="flex-row items-center bg-[#F3F4F6] rounded-2xl px-6 py-3">
            <Icon name="copy" size={18} color='#0F9D8A' />
            <Text className="text-[14px] font-semibold text-primary ml-2">Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onShare}
            activeOpacity={0.8}
            className="flex-row items-center bg-primary rounded-2xl px-6 py-3"
            style={{
              shadowColor: '#0F9D8A',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <Icon name="share" size={18} color='#FFFFFF' />
            <Text className="text-[14px] font-semibold text-white ml-2">Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default InviteCodeCard;
