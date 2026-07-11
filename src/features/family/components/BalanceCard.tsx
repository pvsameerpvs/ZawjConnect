import React from 'react';
import { View, Text } from 'react-native';
import type { MemberShare } from '../types';
import { useFamily } from '../stores/FamilyContext';

interface BalanceCardProps {
  memberShares: MemberShare[];
}

export default function BalanceCard({ memberShares }: BalanceCardProps) {
  const { getMember, formatCurrency } = useFamily();
  const maxAmount = Math.max(...memberShares.map(s => Math.max(s.totalPaid, s.totalShare)), 1);

  return (
    <View className="bg-white rounded-3xl p-5"
      style={{
        shadowColor: 'rgba(0,0,0,0.06)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <Text className="text-[15px] font-bold text-[#111827] mb-5 tracking-tight">Sharing Map</Text>
      {memberShares.map((share) => {
        const member = getMember(share.memberId);
        if (!member) return null;
        const paidWidth = (share.totalPaid / maxAmount) * 100;
        const shareWidth = (share.totalShare / maxAmount) * 100;
        const isPositive = share.balance >= 0;

        return (
          <View key={share.memberId} className="mb-4 last:mb-0">
            <View className="flex-row items-center justify-between mb-2.5">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full items-center justify-center mr-2.5"
                  style={{ backgroundColor: isPositive ? '#22C55E18' : '#EF444418' }}
                >
                  <Text className={`text-[11px] font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
                    {member.name.charAt(0)}
                  </Text>
                </View>
                <Text className="text-[14px] font-semibold text-[#111827]">{member.name}</Text>
              </View>
              <Text className={`text-[13px] font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
                {isPositive ? '+' : ''}{formatCurrency(share.balance)}
              </Text>
            </View>
            <View className="flex-row gap-2">
              <View className="flex-1">
                <View className="h-[6px] bg-[#F3F4F6] rounded-full overflow-hidden">
                  <View className="h-full bg-primary/30 rounded-full" style={{ width: `${paidWidth}%` }} />
                </View>
                <Text className="text-[10px] text-[#6B7280] mt-1">Paid {formatCurrency(share.totalPaid)}</Text>
              </View>
              <View className="flex-1">
                <View className="h-[6px] bg-[#F3F4F6] rounded-full overflow-hidden">
                  <View className="h-full bg-accent/30 rounded-full" style={{ width: `${shareWidth}%` }} />
                </View>
                <Text className="text-[10px] text-[#6B7280] mt-1">Share {formatCurrency(share.totalShare)}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
