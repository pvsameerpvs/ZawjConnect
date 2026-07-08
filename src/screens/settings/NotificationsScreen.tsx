import React, { useState } from 'react';
import { View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import IslamicCard from '../../components/IslamicCard';
import ToggleSwitch from '../../components/ToggleSwitch';

const NotificationsScreen: React.FC = () => {
  const [prayerReminders, setPrayerReminders] = useState(true);
  const [quranReminder, setQuranReminder] = useState(true);
  const [dhikrReminder, setDhikrReminder] = useState(false);
  const [tahajjudReminder, setTahajjudReminder] = useState(true);
  const [fastingReminder, setFastingReminder] = useState(false);
  const [spouseEncouragement, setSpouseEncouragement] = useState(true);

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Notifications" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5">
          <IslamicCard>
            <ToggleSwitch
              label="Prayer reminders"
              value={prayerReminders}
              onValueChange={setPrayerReminders}
            />
            <ToggleSwitch
              label="Quran reminder"
              value={quranReminder}
              onValueChange={setQuranReminder}
            />
            <ToggleSwitch
              label="Dhikr reminder"
              value={dhikrReminder}
              onValueChange={setDhikrReminder}
            />
            <ToggleSwitch
              label="Tahajjud reminder"
              value={tahajjudReminder}
              onValueChange={setTahajjudReminder}
            />
            <ToggleSwitch
              label="Fasting reminder"
              value={fastingReminder}
              onValueChange={setFastingReminder}
            />
            <ToggleSwitch
              label="Spouse encouragement"
              value={spouseEncouragement}
              onValueChange={setSpouseEncouragement}
            />
          </IslamicCard>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default NotificationsScreen;
