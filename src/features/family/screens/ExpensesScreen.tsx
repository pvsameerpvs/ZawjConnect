import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
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
  const paidByMe = thisMonth.filter(e => e.paidBy === state.currentUserId).reduce((s, e) => s + e.amount, 0);
  const myShare = thisMonth.reduce((s, e) => s + (e.splitAmong.includes(state.currentUserId) ? e.amount / e.splitAmong.length : 0), 0);

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingTop: insets.top + 16, paddingBottom: 24, paddingHorizontal: 24 }}>
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-1">
              <Text className="text-white/50 text-[11px] font-semibold tracking-wide uppercase">All Expenses</Text>
              <Text className="text-white text-[32px] font-bold mt-1 leading-none tracking-tight">{formatCurrency(totalThisMonth)}</Text>
              <Text className="text-white/40 text-[12px] mt-1">This month · {thisMonth.length} {thisMonth.length === 1 ? 'transaction' : 'transactions'}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/family/addexpense')}
              className="bg-white/10 rounded-2xl px-4 py-2.5 flex-row items-center border border-white/10"
            >
              <Icon name="plus-circle" size={16} color={colors.accentLight} />
              <Text className="text-accent-light text-[14px] font-semibold ml-2">Add</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-3">
            <View className="bg-white/10 rounded-2xl px-4 py-3 flex-1 items-center">
              <Text className="text-white/50 text-[10px] font-semibold uppercase tracking-wider">Paid by you</Text>
              <Text className="text-white text-[15px] font-bold mt-1 tracking-tight">{formatCurrency(paidByMe)}</Text>
            </View>
            <View className="bg-white/10 rounded-2xl px-4 py-3 flex-1 items-center">
              <Text className="text-white/50 text-[10px] font-semibold uppercase tracking-wider">Your share</Text>
              <Text className="text-white text-[15px] font-bold mt-1 tracking-tight">{formatCurrency(myShare)}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        {sortedExpenses.length === 0 ? (
          <View className="py-20 items-center">
            <View className="w-16 h-16 rounded-3xl bg-primary/10 items-center justify-center mb-4">
              <Icon name="wallet" size={32} color='#0F9D8A' />
            </View>
            <Text className="text-[17px] font-bold text-[#111827] mb-1 tracking-tight">No expenses yet</Text>
            <Text className="text-[14px] text-[#6B7280] text-center px-12 leading-5">Start tracking your family expenses. Every bill, grocery run, and shared cost.</Text>
          </View>
        ) : (
          <View style={{ gap: 8 }}>
            <Text className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">All Transactions · {sortedExpenses.length}</Text>
            {sortedExpenses.map(expense => <ExpenseRow key={expense.id} expense={expense} />)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
