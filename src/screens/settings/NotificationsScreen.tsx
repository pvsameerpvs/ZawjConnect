import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ToggleSwitch from '../../components/ToggleSwitch';

const NotificationsScreen: React.FC = () => {
  const [prayer, setPrayer] = useState(true);
  const [tahajjud, setTahajjud] = useState(true);
  const [fasting, setFasting] = useState(false);
  const [spouse, setSpouse] = useState(true);

  const toggles = [
    { label: 'Prayer reminders', value: prayer, set: setPrayer },
    { label: 'Tahajjud reminder', value: tahajjud, set: setTahajjud },
    { label: 'Fasting reminder', value: fasting, set: setFasting },
    { label: 'Spouse encouragement', value: spouse, set: setSpouse },
  ];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="px-6 pt-16 pb-4">
        <Text className="text-[28px] font-bold text-[#111827] tracking-tight">Notifications</Text>
      </View>
      <View className="flex-1 px-6">
        <View className="bg-white rounded-3xl p-1 px-4"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          {toggles.map((t, i) => (
            <View key={t.label}>
              <ToggleSwitch label={t.label} value={t.value} onValueChange={t.set} />
              {i < toggles.length - 1 && <View className="h-px bg-[#F3F4F6]" />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default NotificationsScreen;
