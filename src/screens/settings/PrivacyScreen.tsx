import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ToggleSwitch from '../../components/ToggleSwitch';

const PrivacyScreen: React.FC = () => {
  const [items, setItems] = useState({
    salah: true, quran: true, dhikr: true, dua: false, tahajjud: true, fasting: false, location: true,
  });

  const toggle = (key: keyof typeof items) => setItems(prev => ({ ...prev, [key]: !prev[key] }));

  const toggles = [
    { label: 'Share Salah Progress', key: 'salah' as const },
    { label: 'Share Quran Progress', key: 'quran' as const },
    { label: 'Share Dhikr Progress', key: 'dhikr' as const },
    { label: 'Share Dua list', key: 'dua' as const },
    { label: 'Share Tahajjud progress', key: 'tahajjud' as const },
    { label: 'Share Fasting progress', key: 'fasting' as const },
    { label: 'Share Live Location', key: 'location' as const },
  ];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="px-6 pt-16 pb-4">
        <Text className="text-[28px] font-bold text-[#111827] tracking-tight">Privacy</Text>
        <Text className="text-[14px] text-[#6B7280] mt-1">Control what you share</Text>
      </View>
      <View className="flex-1 px-6">
        <View className="bg-white rounded-3xl p-1 px-4"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          {toggles.map((t, i) => (
            <View key={t.key}>
              <ToggleSwitch label={t.label} value={items[t.key]} onValueChange={() => toggle(t.key)} />
              {i < toggles.length - 1 && <View className="h-px bg-[#F3F4F6]" />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PrivacyScreen;
