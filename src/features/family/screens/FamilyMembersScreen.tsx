import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import ScreenWrapper from '@/components/ScreenWrapper';
import FamilyMemberCard from '../components/FamilyMemberCard';
import { useFamily } from '../stores/FamilyContext';
import type { FamilyRole } from '../types';

const ROLES: { role: FamilyRole; icon: string; desc: string }[] = [
  { role: 'Husband', icon: 'man-outline', desc: 'Father figure' },
  { role: 'Wife', icon: 'person-outline', desc: 'Mother figure' },
  { role: 'Brother', icon: 'people-outline', desc: 'Brother' },
  { role: 'Sister', icon: 'person-outline', desc: 'Sister' },
  { role: 'Mother', icon: 'heart-outline', desc: 'Grandmother' },
  { role: 'Father', icon: 'man-outline', desc: 'Grandfather' },
];

const roleColors: Record<string, string> = {
  Husband: colors.primary,
  Wife: colors.accent,
  Brother: colors.inkLight,
  Sister: colors.accentDark,
  Mother: colors.error,
  Father: colors.ink,
};

export default function FamilyMembersScreen() {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useFamily();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<FamilyRole>('Brother');

  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch({
      type: 'ADD_MEMBER',
      payload: {
        id: Date.now().toString(),
        name: name.trim(),
        role,
        joinedAt: Date.now(),
      },
    });
    setName('');
    setRole('Brother');
    setShowAdd(false);
  };

  return (
    <View className="flex-1 bg-surface">
      <LinearGradient
        colors={[colors.ink, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-b-[32px]"
        style={{ paddingTop: insets.top + 16, paddingBottom: 20 }}
      >
        <View className="px-5 flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-white/50 text-xs font-medium tracking-wide uppercase">Family Members</Text>
            <Text className="text-white text-xl font-bold mt-1">{state.familyName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowAdd(true)}
            className="bg-white/10 rounded-xl px-4 py-2.5 flex-row items-center border border-white/10"
          >
            <Icon name="user-plus-outline" size={16} color={colors.accentLight} />
            <Text className="text-accent-light text-sm font-semibold ml-2">Add</Text>
          </TouchableOpacity>
        </View>
        <View className="px-5 flex-row gap-2">
          {state.members.slice(0, 7).map(m => (
            <View key={m.id} className="items-center">
              <View className="w-10 h-10 rounded-full items-center justify-center border-2 border-white/20"
                style={{ backgroundColor: roleColors[m.role] + '30' }}
              >
                <Text className="text-white text-sm font-bold">{m.name.charAt(0)}</Text>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>

      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-4 pb-6" style={{ gap: 10 }}>
          <Text className="text-xs text-muted font-medium uppercase tracking-wider px-1">All Members · {state.members.length}</Text>
          {state.members.map(member => (
            <FamilyMemberCard key={member.id} member={member} />
          ))}
        </View>
      </ScreenWrapper>

      <Modal visible={showAdd} transparent animationType="fade">
        <View className="flex-1 bg-overlay justify-center px-6">
          <View className="bg-white rounded-3xl p-6"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.15,
              shadowRadius: 25,
              elevation: 10,
            }}
          >
            <View className="w-12 h-1 rounded-full bg-border mx-auto mb-4" />
            <Text className="text-xl font-bold text-ink mb-1">Add Family Member</Text>
            <Text className="text-sm text-muted mb-5">Enter their name and select their role in the family</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor={colors.muted}
              className="bg-surface rounded-xl px-4 py-3.5 text-sm text-ink mb-5 border border-border"
              autoFocus
            />

            <Text className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">Role</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
              <View className="flex-row gap-2.5">
                {ROLES.map(({ role: r, icon, desc }) => {
                  const selected = role === r;
                  const clr = roleColors[r];
                  return (
                    <TouchableOpacity
                      key={r}
                      activeOpacity={0.7}
                      onPress={() => setRole(r)}
                      className={`px-4 py-3 rounded-2xl items-center border min-w-[90px] ${
                        selected ? 'border-transparent' : 'border-border bg-surface'
                      }`}
                      style={selected ? { backgroundColor: clr + '15' } : {}}
                    >
                      <View className={`w-9 h-9 rounded-xl items-center justify-center mb-1.5 ${
                        selected ? '' : 'bg-surface'
                      }`}
                        style={selected ? { backgroundColor: clr + '20' } : {}}
                      >
                        <Icon name={icon} size={18} color={selected ? clr : colors.muted} />
                      </View>
                      <Text className={`text-sm font-semibold ${selected ? 'text-ink' : 'text-muted'}`}>{r}</Text>
                      <Text className={`text-[10px] ${selected ? 'text-inkLight' : 'text-muted'}`}>{desc}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowAdd(false)}
                className="flex-1 py-3.5 rounded-xl bg-surface items-center border border-border"
              >
                <Text className="text-sm font-semibold text-ink">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAdd}
                className="flex-1 py-3.5 rounded-xl bg-primary items-center"
                style={{
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text className="text-sm font-semibold text-white">Add Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
