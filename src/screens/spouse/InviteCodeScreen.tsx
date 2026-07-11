import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { generateInviteCode } from '../../utils/helpers';
import { Alert } from 'react-native';
import InviteCodeCard from '../../components/InviteCodeCard';

const InviteCodeScreen: React.FC = () => {
  const [code, setCode] = useState('');

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="px-6 pt-16 pb-4">
        <Text className="text-[28px] font-bold text-[#111827] tracking-tight">Invite Spouse</Text>
      </View>
      <View className="flex-1 px-6 pt-4">
        <InviteCodeCard code={code} onGenerate={() => setCode(generateInviteCode())}
          onCopy={() => Alert.alert('Copied', 'Code copied to clipboard')}
          onShare={() => Alert.alert('Share', 'Sharing invite code...')}
        />
      </View>
    </View>
  );
};

export default InviteCodeScreen;
