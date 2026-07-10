import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import ScreenWrapper from '@/components/ScreenWrapper';
import ExpenseRow from '../components/ExpenseRow';
import { useFamily } from '../stores/FamilyContext';

export default function ExpensesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, formatCurrency, getMember } = useFamily();

  const now = new Date();
  const thisMonth = state.expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const sortedExpenses = [...state.expenses].sort((a, b) => b.date - a.date);

  const totalThisMonth = thisMonth.reduce((s, e) => s + e.amount, 0);

  const currentUser = getMember(state.currentUserId);

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
          <View className="flex-1">
            <Text className="text-white/50 text-xs font-medium tracking-wide uppercase">All Expenses</Text>
            <Text className="text-white text-[28px] font-bold mt-1 leading-tight">
              {formatCurrency(totalThisMonth)}
            </Text>
            <Text className="text-white/40 text-xs mt-0.5">
              This month · {thisMonth.length} {thisMonth.length === 1 ? 'transaction' : 'transactions'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/family/addexpense')}
            className="bg-white/10 rounded-xl px-4 py-2.5 flex-row items-center border border-white/10"
          >
            <Icon name="add-circle-outline" size={16} color={colors.accentLight} />
            <Text className="text-accent-light text-sm font-semibold ml-2">Add</Text>
          </TouchableOpacity>
        </View>
        <View className="px-5 flex-row gap-2">
          <View className="bg-white/10 rounded-2xl px-4 py-2.5 flex-1 items-center border border-white/10">
            <Text className="text-white/50 text-[10px] uppercase tracking-wider">Paid by you</Text>
            <Text className="text-white text-sm font-bold mt-0.5">
              {formatCurrency(thisMonth.filter(e => e.paidBy === state.currentUserId).reduce((s, e) => s + e.amount, 0))}
            </Text>
          </View>
          <View className="bg-white/10 rounded-2xl px-4 py-2.5 flex-1 items-center border border-white/10">
            <Text className="text-white/50 text-[10px] uppercase tracking-wider">Your share</Text>
            <Text className="text-white text-sm font-bold mt-0.5">
              {formatCurrency(thisMonth.reduce((s, e) => {
                if (e.splitAmong.includes(state.currentUserId)) {
                  return s + (e.amount / e.splitAmong.length);
                }
                return s;
              }, 0))}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-4 pb-6" style={{ gap: 10 }}>
          {sortedExpenses.length === 0 ? (
            <View className="py-16 items-center">
              <View className="w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-4">
                <Icon name="wallet-outline" size={32} color={colors.primary} />
              </View>
              <Text className="text-base font-semibold text-ink mb-1">No expenses yet</Text>
              <Text className="text-sm text-muted text-center px-10">
                Start tracking your family expenses. Every bill, grocery run, and shared cost.
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/family/addexpense')}
                className="mt-4 bg-primary/10 rounded-xl px-5 py-2.5"
              >
                <Text className="text-sm font-semibold text-primary">Add your first expense</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View className="flex-row items-center justify-between px-1 mb-1">
                <Text className="text-xs font-semibold text-muted uppercase tracking-wider">
                  All Transactions · {sortedExpenses.length}
                </Text>
              </View>
              <View style={{ gap: 8 }}>
                {sortedExpenses.map(expense => (
                  <ExpenseRow key={expense.id} expense={expense} />
                ))}
              </View>
            </>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
}
