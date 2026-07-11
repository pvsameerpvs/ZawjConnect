import React from 'react';
import { View, Text } from 'react-native';
import Icon from '@/components/Icon';
import type { Expense, ExpenseCategory } from '../types';
import { useFamily } from '../stores/FamilyContext';

const categoryIcons: Record<ExpenseCategory, string> = {
  groceries: 'cart', utilities: 'zap', rent: 'home',
  medical: 'heart', education: 'book', transport: 'location',
  entertainment: 'star', other: 'wallet',
};

const categoryColors: Record<ExpenseCategory, string> = {
  groceries: '#22C55E', utilities: '#F59E0B', rent: '#0F9D8A',
  medical: '#EF4444', education: '#14B8A6', transport: '#6B7280',
  entertainment: '#D9773E', other: '#9CA3AF',
};

interface ExpenseRowProps {
  expense: Expense;
}

export default function ExpenseRow({ expense }: ExpenseRowProps) {
  const { getMember, formatCurrency } = useFamily();
  const payer = getMember(expense.paidBy);

  return (
    <View className="flex-row items-center bg-white rounded-2xl px-4 py-3.5"
      style={{
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 1,
      }}
    >
      <View className="w-11 h-11 rounded-2xl items-center justify-center mr-3.5"
        style={{ backgroundColor: categoryColors[expense.category] + '15' }}
      >
        <Icon name={categoryIcons[expense.category]} size={20} color={categoryColors[expense.category]} />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-semibold text-[#111827] tracking-tight">{expense.title}</Text>
        <View className="flex-row items-center mt-0.5">
          <Text className="text-[12px] text-[#6B7280]">{payer?.name || 'Unknown'}</Text>
          <Text className="text-[12px] text-[#6B7280] mx-1.5">·</Text>
          <Text className="text-[12px] text-[#6B7280]">{expense.splitAmong.length} people</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-[15px] font-bold text-[#111827] tracking-tight">{formatCurrency(expense.amount)}</Text>
        <Text className="text-[11px] text-[#6B7280]">{expense.category}</Text>
      </View>
    </View>
  );
}
