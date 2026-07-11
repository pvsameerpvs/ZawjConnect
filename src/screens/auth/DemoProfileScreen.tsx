import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';

const DemoProfileScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState<'Husband' | 'Wife'>('Husband');

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-6 pt-8 pb-8">
            <View className="items-center mb-10">
              <View className="w-20 h-20 rounded-3xl bg-white items-center justify-center mb-5"
                style={{
                  shadowColor: 'rgba(0,0,0,0.06)',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 1,
                  shadowRadius: 12,
                  elevation: 3,
                }}
              >
                <Icon name="person-circle" size={36} color='#F59E6B' />
              </View>
              <Text className="text-[#111827] text-[26px] font-bold tracking-tight">Create Your Profile</Text>
              <Text className="text-[#6B7280] text-[15px] mt-1.5 font-medium">Set up your demo account</Text>
            </View>

            <View className="bg-white rounded-3xl p-5 mb-6"
              style={{
                shadowColor: 'rgba(0,0,0,0.04)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 1,
              }}
            >
              <View className="mb-4">
                <Text className="text-[13px] font-semibold text-[#111827] mb-2">Name</Text>
                <View className="flex-row items-center bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] h-[54px]">
                  <View className="pl-4"><Icon name="person" size={16} color='#9CA3AF' /></View>
                  <TextInput className="flex-1 px-4 text-[15px] text-[#111827]" value={name}
                    onChangeText={setName} placeholder="Enter your name" placeholderTextColor='#9CA3AF' autoCapitalize="none" />
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-[13px] font-semibold text-[#111827] mb-2">City</Text>
                <View className="flex-row items-center bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] h-[54px]">
                  <View className="pl-4"><Icon name="location" size={16} color='#9CA3AF' /></View>
                  <TextInput className="flex-1 px-4 text-[15px] text-[#111827]" value={city}
                    onChangeText={setCity} placeholder="Enter your city" placeholderTextColor='#9CA3AF' autoCapitalize="none" />
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-[13px] font-semibold text-[#111827] mb-2">Country</Text>
                <View className="flex-row items-center bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] h-[54px]">
                  <View className="pl-4"><Icon name="globe" size={16} color='#9CA3AF' /></View>
                  <TextInput className="flex-1 px-4 text-[15px] text-[#111827]" value={country}
                    onChangeText={setCountry} placeholder="Enter your country" placeholderTextColor='#9CA3AF' autoCapitalize="none" />
                </View>
              </View>
            </View>

            <Text className="text-[13px] font-semibold text-[#111827] mb-3">I am a</Text>
            <View className="flex-row gap-3 mb-8">
              {(['Husband', 'Wife'] as const).map((r) => {
                const selected = role === r;
                return (
                  <TouchableOpacity key={r} onPress={() => setRole(r)} activeOpacity={0.8}
                    className={`flex-1 h-[54px] rounded-2xl items-center justify-center flex-row border ${selected ? 'bg-primary border-primary' : 'bg-white border-[#E5E7EB]'}`}
                    style={selected ? {
                      shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25, shadowRadius: 8, elevation: 3,
                    } : {}}
                  >
                    <Icon name="person" size={20} color={selected ? '#FFFFFF' : '#9CA3AF'} />
                    <Text className={`ml-2 text-[15px] font-semibold ${selected ? 'text-white' : 'text-[#9CA3AF]'}`}>{r}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={() => router.replace('/(tabs)')}
              activeOpacity={0.85}
              className="bg-primary h-[56px] rounded-3xl items-center justify-center"
              style={{
                shadowColor: '#0F9D8A',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <Text className="text-white text-[17px] font-bold tracking-tight">Save Profile</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DemoProfileScreen;
