import React, { useState } from 'react';
import { View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import IslamicCard from '../../components/IslamicCard';
import ToggleSwitch from '../../components/ToggleSwitch';

const PrivacyScreen: React.FC = () => {
  const [shareSalah, setShareSalah] = useState(true);
  const [shareQuran, setShareQuran] = useState(true);
  const [shareDhikr, setShareDhikr] = useState(true);
  const [shareDua, setShareDua] = useState(false);
  const [shareTahajjud, setShareTahajjud] = useState(true);
  const [shareFasting, setShareFasting] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Privacy" subtitle="Control what you share" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5">
          <IslamicCard>
            <ToggleSwitch
              label="Share Salah Progress"
              value={shareSalah}
              onValueChange={setShareSalah}
            />
            <ToggleSwitch
              label="Share Quran Progress"
              value={shareQuran}
              onValueChange={setShareQuran}
            />
            <ToggleSwitch
              label="Share Dhikr Progress"
              value={shareDhikr}
              onValueChange={setShareDhikr}
            />
            <ToggleSwitch
              label="Share Dua list"
              value={shareDua}
              onValueChange={setShareDua}
            />
            <ToggleSwitch
              label="Share Tahajjud progress"
              value={shareTahajjud}
              onValueChange={setShareTahajjud}
            />
            <ToggleSwitch
              label="Share Fasting progress"
              value={shareFasting}
              onValueChange={setShareFasting}
            />
            <ToggleSwitch
              label="Share Live Location"
              value={shareLocation}
              onValueChange={setShareLocation}
            />
          </IslamicCard>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default PrivacyScreen;
