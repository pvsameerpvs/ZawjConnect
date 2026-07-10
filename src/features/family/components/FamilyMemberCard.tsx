import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import type { FamilyMember, FamilyRole } from '../types';
import { useFamily } from '../stores/FamilyContext';

const roleIcons: Record<FamilyRole, string> = {
  Husband: 'man-outline',
  Wife: 'person-outline',
  Brother: 'people-outline',
  Sister: 'person-outline',
  Mother: 'heart-outline',
  Father: 'man-outline',
};

const roleColors: Record<FamilyRole, string> = {
  Husband: colors.primary,
  Wife: colors.accent,
  Brother: colors.inkLight,
  Sister: colors.accentDark,
  Mother: colors.error,
  Father: colors.ink,
};

interface FamilyMemberCardProps {
  member: FamilyMember;
  onPress?: () => void;
}

export default function FamilyMemberCard({ member, onPress }: FamilyMemberCardProps) {
  const { getMemberBalance, formatCurrency } = useFamily();
  const balance = getMemberBalance(member.id);

  const content = (
    <>
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: roleColors[member.role] + '18' }}
      >
        <Icon name={roleIcons[member.role]} size={20} color={roleColors[member.role]} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="text-sm font-semibold text-ink">{member.name}</Text>
          {member.isAdmin && (
            <View className="ml-2 bg-primary/10 rounded-md px-1.5 py-0.5">
              <Text className="text-[10px] font-semibold text-primary">Admin</Text>
            </View>
          )}
        </View>
        <Text className="text-xs text-muted">{member.role}</Text>
      </View>
      <View className="items-end">
        <Text className={`text-sm font-bold ${balance >= 0 ? 'text-success' : 'text-error'}`}>
          {balance >= 0 ? '+' : ''}{formatCurrency(balance)}
        </Text>
        <Text className="text-[10px] text-muted">Balance</Text>
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        className="flex-row items-center bg-white rounded-2xl px-4 py-3.5"
        style={{
          shadowColor: colors.cardShadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 1,
        }}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      className="flex-row items-center bg-white rounded-2xl px-4 py-3.5"
      style={{
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 1,
      }}
    >
      {content}
    </View>
  );
}
