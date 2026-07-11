import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import FamilyMemberCard from '../components/FamilyMemberCard';
import { useFamily } from '../stores/FamilyContext';
import type { FamilyRole } from '../types';

const ROLES: { role: FamilyRole; icon: string; desc: string }[] = [
  { role: 'Husband', icon: 'person', desc: 'Father figure' },
  { role: 'Wife', icon: 'person', desc: 'Mother figure' },
  { role: 'Brother', icon: 'users', desc: 'Brother' },
  { role: 'Sister', icon: 'person', desc: 'Sister' },
  { role: 'Mother', icon: 'heart', desc: 'Grandmother' },
  { role: 'Father', icon: 'person', desc: 'Grandfather' },
];

const roleColors: Record<string, string> = {
  Husband: '#0F9D8A', Wife: '#F59E6B', Brother: '#6B7280',
  Sister: '#D9773E', Mother: '#EF4444', Father: '#111827',
};

export default function FamilyMembersScreen() {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useFamily();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<FamilyRole>('Brother');

  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch({ type: 'ADD_MEMBER', payload: { id: Date.now().toString(), name: name.trim(), role, joinedAt: Date.now() } });
    setName(''); setRole('Brother'); setShowAdd(false);
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingTop: insets.top + 16, paddingBottom: 24, paddingHorizontal: 24 }}>
          <View className="flex-row items-center justify-between mb-5">
            <View>
              <Text className="text-white/50 text-[11px] font-semibold tracking-wide uppercase">Family Members</Text>
              <Text className="text-white text-[22px] font-bold mt-1 tracking-tight">{state.familyName}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowAdd(true)}
              className="bg-white/10 rounded-2xl px-4 py-2.5 flex-row items-center border border-white/10"
            >
              <Icon name="user-plus" size={16} color={colors.accentLight} />
              <Text className="text-accent-light text-[14px] font-semibold ml-2">Add</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-3">
            {state.members.slice(0, 7).map(m => (
              <View key={m.id} className="items-center">
                <View className="w-11 h-11 rounded-full items-center justify-center border-2 border-white/20"
                  style={{ backgroundColor: roleColors[m.role] + '30' }}
                >
                  <Text className="text-white text-[15px] font-bold">{m.name.charAt(0)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <Text className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">All Members · {state.members.length}</Text>
        <View style={{ gap: 8 }}>{state.members.map(m => <FamilyMemberCard key={m.id} member={m} />)}</View>
      </ScrollView>

      <Modal visible={showAdd} transparent animationType="fade">
        <View className="flex-1 justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
          <View className="bg-white rounded-3xl p-6"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 25, elevation: 10 }}
          >
            <View className="w-12 h-[5px] rounded-full bg-[#E5E7EB] mx-auto mb-5" />
            <Text className="text-[22px] font-bold text-[#111827] tracking-tight mb-1">Add Family Member</Text>
            <Text className="text-[14px] text-[#6B7280] mb-5">Enter their name and select their role</Text>
            <TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor='#9CA3AF'
              className="bg-[#F8FAFC] rounded-2xl px-4 py-3.5 text-[14px] text-[#111827] mb-5 border border-[#E5E7EB]" autoFocus
            />
            <Text className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">Role</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
              <View className="flex-row gap-2.5">
                {ROLES.map(({ role: r, icon }) => {
                  const selected = role === r;
                  const clr = roleColors[r];
                  return (
                    <TouchableOpacity key={r} activeOpacity={0.7} onPress={() => setRole(r)}
                      className={`px-4 py-3 rounded-2xl items-center min-w-[90px] ${selected ? '' : 'bg-white border border-[#E5E7EB]'}`}
                      style={selected ? { backgroundColor: clr + '12', borderColor: clr + '30', borderWidth: 1 } : {}}
                    >
                      <View className="w-9 h-9 rounded-2xl items-center justify-center mb-1.5" style={{ backgroundColor: selected ? clr + '18' : '#F3F4F6' }}>
                        <Icon name={icon} size={20} color={selected ? clr : '#9CA3AF'} />
                      </View>
                      <Text className={`text-[13px] font-semibold ${selected ? 'text-[#111827]' : 'text-[#6B7280]'}`}>{r}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <View className="flex-row gap-3">
              <TouchableOpacity onPress={() => setShowAdd(false)} className="flex-1 py-3.5 rounded-2xl bg-[#F8FAFC] items-center border border-[#E5E7EB]">
                <Text className="text-[14px] font-bold text-[#111827]">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAdd} className="flex-1 py-3.5 rounded-2xl bg-primary items-center"
                style={{ shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
              >
                <Text className="text-[14px] font-bold text-white">Add Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
