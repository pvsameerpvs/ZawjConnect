import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import ScreenWrapper from '@/components/ScreenWrapper';
import IslamicCard from '@/components/IslamicCard';
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

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else { setMonth(m => m - 1); }
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else { setMonth(m => m + 1); }
  };

  const settlements: { from: string; to: string; amount: number }[] = [];
  const debtors = summary.memberShares
    .filter(s => s.balance < 0)
    .map(s => ({ memberId: s.memberId, balance: -s.balance }))
    .sort((a, b) => b.balance - a.balance);
  const creditors = summary.memberShares
    .filter(s => s.balance > 0)
    .map(s => ({ memberId: s.memberId, balance: s.balance }))
    .sort((a, b) => b.balance - a.balance);

  let di = 0, ci = 0;
  while (di < debtors.length && ci < creditors.length) {
    const amount = Math.min(debtors[di].balance, creditors[ci].balance);
    if (amount > 0.01) {
      settlements.push({ from: debtors[di].memberId, to: creditors[ci].memberId, amount });
    }
    debtors[di].balance -= amount;
    creditors[ci].balance -= amount;
    if (debtors[di].balance < 0.01) di++;
    if (creditors[ci].balance < 0.01) ci++;
  }

  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  return (
    <View className="flex-1 bg-surface">
      <LinearGradient
        colors={[colors.ink, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-b-[32px]"
        style={{ paddingTop: insets.top + 16, paddingBottom: 20 }}
      >
        <View className="items-center mb-3">
          <Text className="text-white/50 text-xs font-medium tracking-wide uppercase">Monthly Summary</Text>
          <View className="flex-row items-center mt-2">
            <TouchableOpacity onPress={prevMonth} className="w-9 h-9 rounded-full bg-white/10 items-center justify-center border border-white/10">
              <Icon name="chevron-back" size={20} color={colors.white} />
            </TouchableOpacity>
            <View className="mx-5 items-center">
              <Text className="text-white text-xl font-bold">{MONTHS[month]}</Text>
              <Text className="text-white/50 text-sm">{year}</Text>
            </View>
            <TouchableOpacity onPress={nextMonth} className="w-9 h-9 rounded-full bg-white/10 items-center justify-center border border-white/10">
              <Icon name="chevron-forward" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          {isCurrentMonth && (
            <View className="mt-2 bg-white/10 rounded-lg px-3 py-1">
              <Text className="text-white/70 text-xs">Current month</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-4 pb-6" style={{ gap: 16 }}>
          <View className="flex-row gap-3">
            <IslamicCard className="flex-1 items-center py-3">
              <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mb-2">
                <Icon name="wallet-outline" size={18} color={colors.primary} />
              </View>
              <Text className="text-2xl font-bold text-ink">{formatCurrency(summary.totalExpenses)}</Text>
              <Text className="text-[10px] text-muted uppercase tracking-wider">Total Spent</Text>
            </IslamicCard>
            <IslamicCard className="flex-1 items-center py-3">
              <View className="w-10 h-10 rounded-xl bg-accent/10 items-center justify-center mb-2">
                <Icon name="receipt-outline" size={18} color={colors.accent} />
              </View>
              <Text className="text-2xl font-bold text-ink">{summary.expenses.length}</Text>
              <Text className="text-[10px] text-muted uppercase tracking-wider">Bills</Text>
            </IslamicCard>
          </View>

          {summary.memberShares.length > 0 && (
            <BalanceCard memberShares={summary.memberShares} />
          )}

          {settlements.length > 0 && (
            <IslamicCard>
              <Text className="text-base font-bold text-ink mb-3">Settlements</Text>
              {settlements.map((s, idx) => {
                const from = getMember(s.from);
                const to = getMember(s.to);
                if (!from || !to) return null;
                return (
                  <View key={`${s.from}-${s.to}-${idx}`} className="flex-row items-center py-2.5 border-b border-border last:border-0">
                    <View className="flex-row items-center flex-1">
                      <View className="w-8 h-8 rounded-full bg-error/10 items-center justify-center mr-2">
                        <Text className="text-xs font-bold text-error">{from.name.charAt(0)}</Text>
                      </View>
                      <Text className="text-sm text-ink font-medium">{from.name}</Text>
                    </View>
                    <View className="items-center mx-3">
                      <Icon name="arrow-forward" size={14} color={colors.primary} />
                      <Text className="text-xs font-bold text-primary">{formatCurrency(s.amount)}</Text>
                    </View>
                    <View className="flex-row items-center flex-1 justify-end">
                      <Text className="text-sm text-ink font-medium mr-2">{to.name}</Text>
                      <View className="w-8 h-8 rounded-full bg-success/10 items-center justify-center">
                        <Text className="text-xs font-bold text-success">{to.name.charAt(0)}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </IslamicCard>
          )}

          {summary.expenses.length > 0 && (
            <>
              <View className="flex-row items-center justify-between px-1">
                <Text className="text-base font-bold text-ink">Transactions</Text>
                <Text className="text-xs text-muted">{summary.expenses.length} total</Text>
              </View>
              <View style={{ gap: 8 }}>
                {summary.expenses
                  .sort((a, b) => b.date - a.date)
                  .map(expense => <ExpenseRow key={expense.id} expense={expense} />)
                }
              </View>
            </>
          )}

          {summary.expenses.length === 0 && (
            <IslamicCard>
              <View className="py-8 items-center">
                <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mb-3">
                  <Icon name="wallet-outline" size={28} color={colors.primary} />
                </View>
                <Text className="text-base font-semibold text-ink mb-1">No expenses this month</Text>
                <Text className="text-sm text-muted text-center">
                  {MONTHS[month]} {year} has no recorded expenses yet.
                </Text>
              </View>
            </IslamicCard>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
}
