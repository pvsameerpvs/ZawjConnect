import React, { useState } from 'react';
import { View } from 'react-native';
import { generateInviteCode } from '../../utils/helpers';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import InviteCodeCard from '../../components/InviteCodeCard';
import { Alert } from 'react-native';

const InviteCodeScreen: React.FC = () => {
  const [code, setCode] = useState('');

  const handleGenerate = () => {
    const newCode = generateInviteCode();
    setCode(newCode);
  };

  const handleCopy = () => {
    Alert.alert('Copied', 'Code copied to clipboard');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Sharing invite code...');
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Invite Spouse" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5">
          <InviteCodeCard
            code={code}
            onGenerate={handleGenerate}
            onCopy={handleCopy}
            onShare={handleShare}
          />
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default InviteCodeScreen;
