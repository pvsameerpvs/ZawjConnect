import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from '../../components/Icon';
import { mockUser } from '../../constants/mockData';

const field = (label: string, val: string, set: (v: string) => void, icon: string, kt?: 'default' | 'email-address') => (
  <View className="mb-4">
    <Text className="text-[13px] font-semibold text-[#111827] mb-2">{label}</Text>
    <View className="flex-row items-center bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] h-[54px]">
      <View className="pl-4"><Icon name={icon} size={16} color='#9CA3AF' /></View>
      <TextInput className="flex-1 px-4 text-[15px] text-[#111827]" value={val} onChangeText={set} placeholder={label} placeholderTextColor='#9CA3AF' keyboardType={kt} autoCapitalize="none" />
    </View>
  </View>
);

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [city, setCity] = useState(mockUser.city);
  const [country, setCountry] = useState(mockUser.country);

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View className="bg-white rounded-3xl p-5"
        style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
      >
        <View className="items-center pb-5 border-b border-[#F3F4F6] mb-5">
          <View className="w-20 h-20 rounded-full items-center justify-center mb-3 bg-primary/10">
            <Text className="text-[28px] font-bold text-primary">{name.charAt(0)}</Text>
          </View>
          <Text className="text-[22px] font-bold text-[#111827] tracking-tight">{name}</Text>
          <Text className="text-[14px] text-[#6B7280] mt-0.5">{email}</Text>
        </View>
        {field('Name', name, setName, 'person')}
        {field('Email', email, setEmail, 'mail', 'email-address')}
        {field('City', city, setCity, 'location')}
        {field('Country', country, setCountry, 'globe')}
        <View className="mb-4">
          <Text className="text-[13px] font-semibold text-[#111827] mb-2">Role</Text>
          <View className="bg-[#F8FAFC] rounded-2xl h-[54px] justify-center px-4 border border-[#E5E7EB]">
            <Text className="text-[15px] text-[#111827] font-medium">{mockUser.role}</Text>
          </View>
        </View>
        <View className="mb-2">
          <Text className="text-[13px] font-semibold text-[#111827] mb-2">Spouse</Text>
          <View className="bg-[#F8FAFC] rounded-2xl h-[54px] justify-center px-4 border border-[#E5E7EB]">
            <Text className="text-[15px] text-[#111827] font-medium">{mockUser.spouse}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Saved', 'Profile updated')} activeOpacity={0.85}
        className="h-[56px] rounded-3xl bg-primary items-center justify-center mt-5"
        style={{ shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 }}
      >
        <Text className="text-white text-[17px] font-bold">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
