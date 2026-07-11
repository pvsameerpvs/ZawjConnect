import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import { mockUser, mockSpouse } from '../../constants/mockData';

const JoinInviteScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const connectedName = mockUser.role === 'Husband' ? mockSpouse.name : mockUser.name;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="flex-1 px-6 pt-20">
        {!showSuccess ? (
          <View style={{ gap: 20 }}>
            <View className="items-center mb-4">
              <View className="w-16 h-16 rounded-3xl bg-primary/10 items-center justify-center mb-4">
                <Icon name="key" size={28} color='#0F9D8A' />
              </View>
              <Text className="text-[22px] font-bold text-[#111827] tracking-tight">Join Spouse</Text>
              <Text className="text-[14px] text-[#6B7280] mt-1">Enter the invite code from your spouse</Text>
            </View>
            <Text className="text-[13px] font-semibold text-[#111827]">Invite Code</Text>
            <View className="flex-row items-center bg-white rounded-2xl border border-[#E5E7EB] h-[56px]">
              <View className="pl-4"><Icon name="key" size={16} color='#9CA3AF' /></View>
              <TextInput className="flex-1 px-4 text-[16px] text-[#111827] tracking-widest font-bold" value={code}
                onChangeText={t => { setCode(t); if (error) setError(''); }} placeholder="Enter invite code"
                placeholderTextColor='#9CA3AF' autoCapitalize="characters"
              />
            </View>
            {error ? <Text className="text-error text-[12px]">{error}</Text> : null}
            <TouchableOpacity onPress={() => { if (!code.trim()) { setError('Please enter an invite code'); return; } setShowSuccess(true); }}
              activeOpacity={0.85} className="h-[56px] rounded-3xl bg-primary items-center justify-center"
              style={{ shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 }}
            >
              <Text className="text-white text-[17px] font-bold">Join</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-white rounded-3xl p-6 items-center"
            style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
          >
            <View className="w-20 h-20 rounded-2xl bg-success/10 items-center justify-center mb-5">
              <Icon name="check-circle" size={36} color='#22C55E' />
            </View>
            <Text className="text-[22px] font-bold text-[#111827] text-center tracking-tight">Connected with {connectedName}!</Text>
            <Text className="text-[14px] text-[#6B7280] text-center mt-3 leading-5">You are now connected with your spouse.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default JoinInviteScreen;
