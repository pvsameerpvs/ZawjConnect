import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import ScreenWrapper from '@/components/ScreenWrapper';
import IslamicCard from '@/components/IslamicCard';
import SectionHeader from '@/components/SectionHeader';
import StatCard from '@/components/StatCard';
import { useFamily } from '../stores/FamilyContext';
import ExpenseRow from '../components/ExpenseRow';

const roleColors: Record<string, string> = {
  Husband: colors.primary, Wife: colors.accent, Brother: colors.inkLight,
  Sister: colors.accentDark, Mother: colors.error, Father: colors.ink,
};

export default function FamilyDashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, dispatch, getActiveGroceryLists, getMonthlySummary, formatCurrency, getMember } = useFamily();
  const [showSwitcher, setShowSwitcher] = useState(false);

  const now = new Date();
  const summary = getMonthlySummary(now.getMonth(), now.getFullYear());
  const activeLists = getActiveGroceryLists();
  const recentExpenses = [...state.expenses].sort((a, b) => b.date - a.date).slice(0, 5);

  const currentUser = getMember(state.currentUserId);
  const currentUserColor = currentUser ? roleColors[currentUser.role] || colors.primary : colors.primary;

  const switchUser = (id: string) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: id });
    setShowSwitcher(false);
  };

  return (
    <View className="flex-1 bg-surface">
      <LinearGradient
        colors={[colors.ink, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-b-[32px]"
        style={{ paddingTop: insets.top + 16, paddingBottom: 20 }}
      >
        <View className="px-5 flex-row items-center justify-between mb-4">
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShowSwitcher(true)} className="flex-1">
            <Text className="text-white/50 text-xs font-medium tracking-wide">Assalamu Alaikum</Text>
            <View className="flex-row items-center mt-1">
              <View className="w-9 h-9 rounded-full items-center justify-center mr-2.5 border-2 border-white/20"
                style={{ backgroundColor: currentUserColor + '40' }}
              >
                <Text className="text-white text-sm font-bold">{currentUser?.name.charAt(0) || '?'}</Text>
              </View>
              <View>
                <Text className="text-white text-xl font-bold">{currentUser?.name || 'Family'}</Text>
                <View className="flex-row items-center mt-0.5">
                  <Text className="text-white/60 text-xs">{currentUser?.role}</Text>
                  <View className="w-1 h-1 rounded-full bg-white/30 mx-2" />
                  <Text className="text-accent-light/70 text-xs">{state.familyName}</Text>
                </View>
              </View>
              <View className="ml-1 opacity-60"><Icon name="chevron-forward" size={14} color={colors.white} /></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/family/members')}
            className="w-11 h-11 rounded-full bg-white/10 items-center justify-center border border-white/15"
          >
            <Icon name="people-outline" size={22} color={colors.accentLight} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/family/summary')}
          className="mx-5 bg-white/10 rounded-2xl px-5 py-4 border border-white/10"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/50 text-xs font-medium uppercase tracking-wider">
                {now.toLocaleString('default', { month: 'long' })} Summary
              </Text>
              <Text className="text-white text-[28px] font-bold mt-1 leading-tight">
                {formatCurrency(summary.totalExpenses)}
              </Text>
              <Text className="text-white/40 text-xs mt-0.5">
                {summary.expenses.length} transactions · {summary.memberShares.length} members
              </Text>
            </View>
            <View className="w-10 h-10 rounded-xl bg-white/10 items-center justify-center">
              <Icon name="trending-up-outline" size={20} color={colors.accentLight} />
            </View>
          </View>
          <View className="mt-3 flex-row gap-1.5">
            {summary.memberShares.slice(0, 5).map((share) => {
              const member = getMember(share.memberId);
              if (!member) return null;
              const isPositive = share.balance >= 0;
              return (
                <View key={share.memberId} className="flex-1 items-center">
                  <View className={`w-8 h-8 rounded-full items-center justify-center mb-1 ${
                    isPositive ? 'bg-success/20' : 'bg-error/20'
                  }`}>
                    <Text className={`text-xs font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
                      {member.name.charAt(0)}
                    </Text>
                  </View>
                  <Text className={`text-[10px] font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
                    {isPositive ? '+' : ''}{formatCurrency(share.balance)}
                  </Text>
                </View>
              );
            })}
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View style={{ gap: 10 }} className="pt-1 pb-6">
          <View className="flex-row gap-2.5">
            <StatCard icon="shopping-cart-outline" value={activeLists.length.toString()} title="Active Lists" />
            <StatCard icon="people-outline" value={state.members.length.toString()} title="Members" />
            <StatCard icon="trending-up-outline" value={summary.expenses.length.toString()} title="Expenses" />
          </View>

          <View className="flex-row gap-2 mt-2">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/family/grocery')}
              className="flex-1 bg-white rounded-2xl py-3.5 px-4 flex-row items-center"
              style={{
                shadowColor: colors.cardShadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <View className="w-9 h-9 rounded-xl bg-success/10 items-center justify-center mr-3">
                <Icon name="shopping-cart-outline" size={18} color={colors.success} />
              </View>
              <View>
                <Text className="text-sm font-semibold text-ink">Groceries</Text>
                <Text className="text-[10px] text-muted">{activeLists.length} active lists</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/family/addexpense')}
              className="flex-1 bg-white rounded-2xl py-3.5 px-4 flex-row items-center"
              style={{
                shadowColor: colors.cardShadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <View className="w-9 h-9 rounded-xl bg-accent/10 items-center justify-center mr-3">
                <Icon name="wallet-outline" size={18} color={colors.accent} />
              </View>
              <View>
                <Text className="text-sm font-semibold text-ink">Add Bill</Text>
                <Text className="text-[10px] text-muted">Track expense</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/family/chat')}
              className="flex-1 bg-white rounded-2xl py-3.5 px-4 flex-row items-center"
              style={{
                shadowColor: colors.cardShadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <View className="w-9 h-9 rounded-xl bg-primary/10 items-center justify-center mr-3">
                <Icon name="message-circle-outline" size={18} color={colors.primary} />
              </View>
              <View>
                <Text className="text-sm font-semibold text-ink">Chat</Text>
                <Text className="text-[10px] text-muted">Group chat</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <SectionHeader title="Recent Expenses" actionLabel="See All" onActionPress={() => router.push('/(tabs)/family/expenses')} />
            <View style={{ gap: 8 }}>
              {recentExpenses.length === 0 ? (
                <IslamicCard>
                  <View className="py-4 items-center">
                    <Icon name="wallet-outline" size={32} color={colors.muted} />
                    <Text className="text-sm text-muted mt-2">No expenses yet</Text>
                  </View>
                </IslamicCard>
              ) : (
                recentExpenses.map(expense => <ExpenseRow key={expense.id} expense={expense} />)
              )}
            </View>
          </View>

          <View className="mt-2">
            <SectionHeader title="Active Grocery Lists" actionLabel="View All" onActionPress={() => router.push('/(tabs)/family/grocery')} />
            <View style={{ gap: 8 }}>
              {activeLists.length === 0 ? (
                <IslamicCard>
                  <View className="py-4 items-center">
                    <Icon name="shopping-cart-outline" size={32} color={colors.muted} />
                    <Text className="text-sm text-muted mt-2">No active lists</Text>
                  </View>
                </IslamicCard>
              ) : (
                activeLists.map(list => {
                  const total = list.items.length;
                  const done = list.items.filter(i => i.purchased).length;
                  const pct = total > 0 ? (done / total) * 100 : 0;
                  return (
                    <TouchableOpacity
                      key={list.id}
                      activeOpacity={0.7}
                      onPress={() => router.push(`/(tabs)/family/grocerydetail?id=${list.id}`)}
                      className="bg-white rounded-2xl px-4 py-3.5 flex-row items-center"
                      style={{
                        shadowColor: colors.cardShadow,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 6,
                        elevation: 1,
                      }}
                    >
                      <View className="w-10 h-10 rounded-xl bg-success/10 items-center justify-center mr-3">
                        <Icon name="shopping-cart-outline" size={20} color={colors.success} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-ink">{list.title}</Text>
                        <View className="flex-row items-center mt-1">
                          <View className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden mr-2">
                            <View className="h-full bg-success rounded-full" style={{ width: `${pct}%` }} />
                          </View>
                          <Text className="text-[10px] text-muted">{done}/{total}</Text>
                        </View>
                      </View>
                      <Icon name="chevron-forward" size={18} color={colors.muted} />
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </View>

          <View className="mt-2">
            <SectionHeader title="Monthly Overview" actionLabel="Full Report" onActionPress={() => router.push('/(tabs)/family/summary')} />
            <IslamicCard>
              <View className="flex-row justify-between py-1">
                <View className="items-center flex-1">
                  <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mb-1.5">
                    <Icon name="wallet-outline" size={18} color={colors.primary} />
                  </View>
                  <Text className="text-lg font-bold text-ink">{formatCurrency(summary.totalExpenses)}</Text>
                  <Text className="text-[10px] text-muted">Total</Text>
                </View>
                <View className="w-px bg-border" />
                <View className="items-center flex-1">
                  <View className="w-10 h-10 rounded-xl bg-accent/10 items-center justify-center mb-1.5">
                    <Icon name="people-outline" size={18} color={colors.accent} />
                  </View>
                  <Text className="text-lg font-bold text-ink">{summary.memberShares.length}</Text>
                  <Text className="text-[10px] text-muted">Members</Text>
                </View>
                <View className="w-px bg-border" />
                <View className="items-center flex-1">
                  <View className="w-10 h-10 rounded-xl bg-success/10 items-center justify-center mb-1.5">
                    <Icon name="receipt-outline" size={18} color={colors.success} />
                  </View>
                  <Text className="text-lg font-bold text-ink">{summary.expenses.length}</Text>
                  <Text className="text-[10px] text-muted">Bills</Text>
                </View>
              </View>
            </IslamicCard>
          </View>
        </View>
      </ScreenWrapper>

      <Modal visible={showSwitcher} transparent animationType="fade">
        <View className="flex-1 bg-overlay justify-center px-6">
          <View className="bg-white rounded-3xl p-6"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.15,
              shadowRadius: 25,
              elevation: 10,
            }}
          >
            <View className="w-12 h-1 rounded-full bg-border mx-auto mb-4" />
            <Text className="text-lg font-bold text-ink mb-1">Who are you?</Text>
            <Text className="text-sm text-muted mb-4">Select your name to use the app as yourself</Text>
            {state.members.map(m => {
              const isActive = m.id === state.currentUserId;
              const clr = roleColors[m.role] || colors.primary;
              return (
                <TouchableOpacity
                  key={m.id}
                  activeOpacity={0.7}
                  onPress={() => switchUser(m.id)}
                  className={`flex-row items-center px-4 py-3 rounded-2xl mb-2 ${
                    isActive ? 'bg-primary/5 border border-primary/20' : 'border border-border'
                  }`}
                >
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    isActive ? '' : 'bg-surface'
                  }`}
                    style={isActive ? { backgroundColor: clr + '20' } : {}}
                  >
                    <Text className={`text-sm font-bold ${isActive ? 'text-ink' : 'text-ink'}`}
                      style={isActive ? { color: clr } : {}}
                    >{m.name.charAt(0)}</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Text className={`text-sm font-semibold ${isActive ? 'text-ink' : 'text-ink'}`}>{m.name}</Text>
                      {m.isAdmin && (
                        <View className="ml-2 bg-primary/10 rounded-md px-1.5 py-0.5">
                          <Text className="text-[10px] font-semibold text-primary">Admin</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-xs text-muted">{m.role}</Text>
                  </View>
                  {isActive && (
                    <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                      <Icon name="checkmark" size={12} color={colors.white} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={() => setShowSwitcher(false)}
              className="mt-2 py-3 rounded-xl bg-surface items-center border border-border"
            >
              <Text className="text-sm font-semibold text-ink">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
