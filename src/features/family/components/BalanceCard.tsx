import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/constants/colors';
import type { MemberShare } from '../types';
import { useFamily } from '../stores/FamilyContext';

interface BalanceCardProps {
  memberShares: MemberShare[];
}

export default function BalanceCard({ memberShares }: BalanceCardProps) {
  const { getMember, formatCurrency } = useFamily();

  const maxAmount = Math.max(...memberShares.map(s => Math.max(s.totalPaid, s.totalShare)), 1);

  return (
    <View className="bg-white rounded-2xl p-4"
      style={{
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 1,
      }}
    >
      <Text className="text-sm font-semibold text-ink mb-3">Sharing Map</Text>
      {memberShares.map((share) => {
        const member = getMember(share.memberId);
        if (!member) return null;
        const paidWidth = (share.totalPaid / maxAmount) * 100;
        const shareWidth = (share.totalShare / maxAmount) * 100;
        const isPositive = share.balance >= 0;

        return (
          <View key={share.memberId} className="mb-3">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm text-ink">{member.name}</Text>
              <Text className={`text-xs font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
                {isPositive ? '+' : ''}{formatCurrency(share.balance)}
              </Text>
            </View>
            <View style={{ height: 20 }} className="flex-row rounded-lg overflow-hidden bg-surface">
              <View style={{ width: `${paidWidth}%` }} className="bg-primary/30 rounded-l-lg" />
            </View>
            <View className="flex-row justify-between mt-0.5">
              <Text className="text-[10px] text-muted">Paid: {formatCurrency(share.totalPaid)}</Text>
              <Text className="text-[10px] text-muted">Share: {formatCurrency(share.totalShare)}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
