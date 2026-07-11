import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import BalanceCard from '../components/BalanceCard';
import ExpenseRow from '../components/ExpenseRow';
import { useFamily } from '../stores/FamilyContext';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function MonthlySummaryScreen() {
  const insets = useSafeAreaInsets();
  const { getMonthlySummary, formatCurrency, getMember } = useFamily();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const summary = getMonthlySummary(month, year);
  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  const settlements = (() => {
    const result: { from: string; to: string; amount: number }[] = [];
    const debtors = summary.memberShares.filter(s => s.balance < 0).map(s => ({ memberId: s.memberId, balance: -s.balance })).sort((a, b) => b.balance - a.balance);
    const creditors = summary.memberShares.filter(s => s.balance > 0).map(s => ({ memberId: s.memberId, balance: s.balance })).sort((a, b) => b.balance - a.balance);
    let di = 0, ci = 0;
    while (di < debtors.length && ci < creditors.length) {
      const amount = Math.min(debtors[di].balance, creditors[ci].balance);
      if (amount > 0.01) result.push({ from: debtors[di].memberId, to: creditors[ci].memberId, amount });
      debtors[di].balance -= amount; creditors[ci].balance -= amount;
      if (debtors[di].balance < 0.01) di++;
      if (creditors[ci].balance < 0.01) ci++;
    }
    return result;
  })();

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingTop: insets.top + 16, paddingBottom: 24, paddingHorizontal: 24 }}>
          <View className="items-center mb-3">
            <Text className="text-white/50 text-[11px] font-semibold tracking-wide uppercase">Monthly Summary</Text>
            <View className="flex-row items-center mt-3">
              <TouchableOpacity onPress={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }}
                className="w-9 h-9 rounded-full bg-white/10 items-center justify-center border border-white/10"
              >
                <Icon name="chevron-back" size={20} color='#FFFFFF' />
              </TouchableOpacity>
              <View className="mx-5 items-center">
                <Text className="text-white text-[22px] font-bold tracking-tight">{MONTHS[month]}</Text>
                <Text className="text-white/50 text-[14px]">{year}</Text>
              </View>
              <TouchableOpacity onPress={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }}
                className="w-9 h-9 rounded-full bg-white/10 items-center justify-center border border-white/10"
              >
                <Icon name="chevron" size={20} color='#FFFFFF' />
              </TouchableOpacity>
            </View>
            {isCurrentMonth && <View className="mt-2 bg-white/10 rounded-lg px-3 py-1"><Text className="text-white/70 text-[12px]">Current month</Text></View>}
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <View style={{ gap: 16 }}>
          <View className="flex-row gap-3">
            <View className="bg-white rounded-2xl p-4 flex-1 items-center"
              style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
            >
              <View className="w-10 h-10 rounded-2xl bg-primary/10 items-center justify-center mb-2">
                <Icon name="wallet" size={20} color='#0F9D8A' />
              </View>
              <Text className="text-[24px] font-bold text-[#111827] tracking-tight">{formatCurrency(summary.totalExpenses)}</Text>
              <Text className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-0.5">Total Spent</Text>
            </View>
            <View className="bg-white rounded-2xl p-4 flex-1 items-center"
              style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
            >
              <View className="w-10 h-10 rounded-2xl bg-accent/10 items-center justify-center mb-2">
                <Icon name="receipt" size={20} color='#F59E6B' />
              </View>
              <Text className="text-[24px] font-bold text-[#111827] tracking-tight">{summary.expenses.length}</Text>
              <Text className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-0.5">Bills</Text>
            </View>
          </View>

          {summary.memberShares.length > 0 && <BalanceCard memberShares={summary.memberShares} />}

          {settlements.length > 0 && (
            <View className="bg-white rounded-3xl p-5"
              style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
            >
              <Text className="text-[16px] font-bold text-[#111827] tracking-tight mb-4">Settlements</Text>
              {settlements.map((s, idx) => {
                const from = getMember(s.from);
                const to = getMember(s.to);
                if (!from || !to) return null;
                return (
                  <View key={`${s.from}-${s.to}-${idx}`} className="flex-row items-center py-3 border-b border-[#E5E7EB] last:border-0">
                    <View className="flex-row items-center flex-1">
                      <View className="w-9 h-9 rounded-full bg-error/10 items-center justify-center mr-2">
                        <Text className="text-[11px] font-bold text-error">{from.name.charAt(0)}</Text>
                      </View>
                      <Text className="text-[14px] font-semibold text-[#111827]">{from.name}</Text>
                    </View>
                    <View className="items-center mx-3">
                      <Icon name="arrow" size={16} color='#0F9D8A' />
                      <Text className="text-[12px] font-bold text-primary mt-0.5">{formatCurrency(s.amount)}</Text>
                    </View>
                    <View className="flex-row items-center flex-1 justify-end">
                      <Text className="text-[14px] font-semibold text-[#111827] mr-2">{to.name}</Text>
                      <View className="w-9 h-9 rounded-full bg-success/10 items-center justify-center">
                        <Text className="text-[11px] font-bold text-success">{to.name.charAt(0)}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {summary.expenses.length > 0 && (
            <>
              <Text className="text-[20px] font-bold text-[#111827] tracking-tight">Transactions · {summary.expenses.length}</Text>
              <View style={{ gap: 8 }}>
                {summary.expenses.sort((a, b) => b.date - a.date).map(expense => <ExpenseRow key={expense.id} expense={expense} />)}
              </View>
            </>
          )}

          {summary.expenses.length === 0 && (
            <View className="bg-white rounded-3xl p-8 items-center">
              <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mb-3">
                <Icon name="wallet" size={28} color='#0F9D8A' />
              </View>
              <Text className="text-[16px] font-bold text-[#111827] mb-1 tracking-tight">No expenses this month</Text>
              <Text className="text-[14px] text-[#6B7280] text-center leading-5">{MONTHS[month]} {year} has no recorded expenses yet.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
