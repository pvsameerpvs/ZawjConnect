import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';
import { colors } from '../../constants/colors';
import { mockUser, mockSpouse, mockSpouseProgress } from '../../constants/mockData';
import ProgressBar from '../../components/ProgressBar';

const SpouseScreen: React.FC = () => {
  const router = useRouter();

  const items = [
    { icon: 'moon', label: 'Salah', detail: `${mockSpouseProgress.salah.completed}/${mockSpouseProgress.salah.total} completed`, progress: mockSpouseProgress.salah.completed / mockSpouseProgress.salah.total, color: '#0F9D8A' },
    { icon: 'check-circle', label: 'Tahajjud', detail: mockSpouseProgress.tahajjud ? 'Completed' : 'Pending', isActive: mockSpouseProgress.tahajjud },
    { icon: 'location', label: 'Location Sharing', detail: mockSpouseProgress.locationSharing ? 'Enabled' : 'Disabled', isActive: mockSpouseProgress.locationSharing },
  ];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <View style={{ gap: 16 }}>
          <View className="bg-white rounded-3xl p-5 flex-row items-center"
            style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
          >
            <View className="w-20 h-20 rounded-2xl bg-primary/10 items-center justify-center border-2 border-accent/20">
              <Text className="text-[28px] font-bold text-primary">{mockSpouse.name.charAt(0)}</Text>
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-[22px] font-bold text-[#111827] tracking-tight">{mockSpouse.name}</Text>
              <Text className="text-[14px] text-[#6B7280] mt-0.5">{mockSpouse.city}, {mockSpouse.country}</Text>
              <View className="bg-primary/10 px-3 py-1 rounded-full mt-2 self-start">
                <Text className="text-[12px] font-bold text-primary">{mockSpouse.role}</Text>
              </View>
            </View>
          </View>

          <Text className="text-[20px] font-bold text-[#111827] tracking-tight">Shared Progress</Text>

          {items.map((item, i) => (
            <View key={i} className="bg-white rounded-2xl p-4 flex-row items-center"
              style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
            >
              <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${'color' in item ? 'bg-primary/10' : item.isActive ? 'bg-success/10' : 'bg-[#F3F4F6]'}`}
                style={'color' in item ? {} : {}}
              >
                <Icon name={item.icon} size={22} color={item.color || (item.isActive ? '#22C55E' : '#9CA3AF')} />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-[#111827]">{item.label}</Text>
                {item.progress !== undefined ? (
                  <View className="mt-2"><ProgressBar progress={item.progress} label={item.detail} /></View>
                ) : (
                  <View className={`px-3 py-1 rounded-xl mt-1.5 self-start ${item.isActive ? 'bg-success/10' : 'bg-[#F3F4F6] border border-[#E5E7EB]'}`}>
                    <Text className={`text-[11px] font-bold ${item.isActive ? 'text-success' : 'text-[#6B7280]'}`}>{item.detail}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}

          <TouchableOpacity onPress={() => router.push('/more/invitecode')} activeOpacity={0.85}
            className="h-[52px] rounded-2xl bg-white items-center justify-center border border-[#E5E7EB]">
            <Text className="text-primary text-[15px] font-semibold">Generate Invite Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/more/joininvite')} activeOpacity={0.7}
            className="h-[48px] rounded-2xl items-center justify-center bg-primary/8">
            <Text className="text-primary text-[15px] font-semibold">Join with Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SpouseScreen;
