import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';
import type { FamilyMember, FamilyRole } from '../types';
import { useFamily } from '../stores/FamilyContext';

const roleIcons: Record<FamilyRole, string> = {
  Husband: 'person', Wife: 'person', Brother: 'users',
  Sister: 'person', Mother: 'heart', Father: 'person',
};

const roleColors: Record<FamilyRole, string> = {
  Husband: '#0F9D8A', Wife: '#F59E6B', Brother: '#6B7280',
  Sister: '#D9773E', Mother: '#EF4444', Father: '#111827',
};

interface FamilyMemberCardProps {
  member: FamilyMember;
  onPress?: () => void;
}

export default function FamilyMemberCard({ member, onPress }: FamilyMemberCardProps) {
  const { getMemberBalance, formatCurrency } = useFamily();
  const balance = getMemberBalance(member.id);
  const color = roleColors[member.role];

  const content = (
    <>
      <View className="w-11 h-11 rounded-full items-center justify-center mr-3.5" style={{ backgroundColor: color + '18' }}>
        <Icon name={roleIcons[member.role]} size={20} color={color} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="text-[15px] font-bold text-[#111827] tracking-tight">{member.name}</Text>
          {member.isAdmin && (
            <View className="ml-2 bg-primary/10 rounded-md px-1.5 py-0.5">
              <Text className="text-[9px] font-bold text-primary tracking-wide">Admin</Text>
            </View>
          )}
        </View>
        <Text className="text-[12px] text-[#6B7280] mt-0.5">{member.role}</Text>
      </View>
      <View className="items-end">
        <Text className={`text-[14px] font-bold tracking-tight ${balance >= 0 ? 'text-success' : 'text-error'}`}>
          {balance >= 0 ? '+' : ''}{formatCurrency(balance)}
        </Text>
        <Text className="text-[10px] text-[#6B7280] mt-0.5">Balance</Text>
      </View>
    </>
  );

  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper onPress={onPress} activeOpacity={0.7}
      className="flex-row items-center bg-white rounded-2xl px-4 py-3.5"
      style={{
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 1,
      }}
    >
      {content}
    </Wrapper>
  );
}
