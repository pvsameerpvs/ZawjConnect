import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import SettingsRow from '../../components/SettingsRow';

const SettingsScreen: React.FC = () => {
  const router = useRouter();

  const rows = [
    { icon: 'person', title: 'Profile', route: 'profile' },
    { icon: 'notifications', title: 'Notifications', route: 'notifications' },
    { icon: 'shield', title: 'Privacy', route: 'privacy' },
    { icon: 'palette', title: 'Theme', route: null },
    { icon: 'info', title: 'About App', route: null },
  ];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="px-6 pt-16 pb-4">
        <Text className="text-[28px] font-bold text-[#111827] tracking-tight">Settings</Text>
      </View>
      <View className="flex-1 px-6">
        <View className="bg-white rounded-3xl overflow-hidden"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          {rows.map((row, i) => (
            <View key={row.title}>
              <SettingsRow icon={row.icon} title={row.title} onPress={row.route ? () => router.push(`/more/${row.route}`) : undefined} />
              {i < rows.length - 1 && <View className="h-px bg-[#F3F4F6] mx-4" />}
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => router.replace('/(auth)')} activeOpacity={0.85}
          className="h-[54px] rounded-2xl bg-error items-center justify-center mt-6"
          style={{ shadowColor: '#EF4444', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
        >
          <Text className="text-white text-[15px] font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
