import React from 'react';
import { View, Text } from 'react-native';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import type { Expense, ExpenseCategory } from '../types';
import { useFamily } from '../stores/FamilyContext';

const categoryIcons: Record<ExpenseCategory, string> = {
  groceries: 'shopping-cart-outline',
  utilities: 'flash-outline',
  rent: 'home-outline',
  medical: 'heart-outline',
  education: 'book-outline',
  transport: 'location-outline',
  entertainment: 'star-outline',
  other: 'wallet-outline',
};

const categoryColors: Record<ExpenseCategory, string> = {
  groceries: colors.success,
  utilities: colors.accent,
  rent: colors.primary,
  medical: colors.error,
  education: colors.primaryLight,
  transport: colors.inkLight,
  entertainment: colors.accentDark,
  other: colors.muted,
};

interface ExpenseRowProps {
  expense: Expense;
}

export default function ExpenseRow({ expense }: ExpenseRowProps) {
  const { getMember, formatCurrency } = useFamily();
  const payer = getMember(expense.paidBy);

  return (
    <View
      className="flex-row items-center bg-white rounded-2xl px-4 py-3"
      style={{
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 0.5,
      }}
    >
      <View
        className="w-9 h-9 rounded-xl items-center justify-center mr-3"
        style={{ backgroundColor: categoryColors[expense.category] + '15' }}
      >
        <Icon name={categoryIcons[expense.category]} size={18} color={categoryColors[expense.category]} />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-ink">{expense.title}</Text>
        <Text className="text-xs text-muted">
          {payer?.name || 'Unknown'} · {expense.splitAmong.length} people
        </Text>
      </View>
      <Text className="text-sm font-bold text-ink">{formatCurrency(expense.amount)}</Text>
    </View>
  );
}
