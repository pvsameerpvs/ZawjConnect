import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import { useFamily } from '../stores/FamilyContext';
import ExpenseRow from '../components/ExpenseRow';

const roleColors: Record<string, string> = {
  Husband: '#0F9D8A', Wife: '#F59E6B', Brother: '#6B7280',
  Sister: '#D9773E', Mother: '#EF4444', Father: '#111827',
};

export default function FamilyDashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, getActiveGroceryLists, getMonthlySummary, formatCurrency, getMember } = useFamily();
  const [showSwitcher, setShowSwitcher] = useState(false);

  const now = new Date();
  const summary = getMonthlySummary(now.getMonth(), now.getFullYear());
  const activeLists = getActiveGroceryLists();
  const recentExpenses = [...state.expenses].sort((a, b) => b.date - a.date).slice(0, 5);
  const currentUser = getMember(state.currentUserId);
  const userColor = currentUser ? roleColors[currentUser.role] || '#0F9D8A' : '#0F9D8A';

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingTop: insets.top + 16, paddingBottom: 24, paddingHorizontal: 24 }}>
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShowSwitcher(true)} className="flex-1">
              <Text className="text-white/50 text-[12px] font-medium tracking-wide">Assalamu Alaikum</Text>
              <View className="flex-row items-center mt-1.5">
                <View className="w-11 h-11 rounded-full items-center justify-center mr-3 border-2 border-white/20"
                  style={{ backgroundColor: userColor + '40' }}
                >
                  <Text className="text-white text-[17px] font-bold">{currentUser?.name.charAt(0) || '?'}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-[18px] font-bold tracking-tight">{currentUser?.name || 'Family'}</Text>
                  <View className="flex-row items-center mt-0.5">
                    <Text className="text-white/60 text-[12px]">{currentUser?.role}</Text>
                    <View className="w-1 h-1 rounded-full bg-white/30 mx-2" />
                    <Text className="text-accent-light/70 text-[12px]">{state.familyName}</Text>
                  </View>
                </View>
                <View className="opacity-50"><Icon name="chevron" size={16} color='#FFFFFF' /></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/family/members')}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/15"
            >
              <Icon name="users" size={20} color={colors.accentLight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/(tabs)/family/summary')}
            className="bg-white/10 rounded-3xl px-5 py-4 border border-white/10"
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">{now.toLocaleString('default', { month: 'long' })} Summary</Text>
                <Text className="text-white text-[32px] font-bold mt-1 leading-none tracking-tight">{formatCurrency(summary.totalExpenses)}</Text>
                <Text className="text-white/40 text-[12px] mt-1">{summary.expenses.length} transactions · {summary.memberShares.length} members</Text>
              </View>
              <View className="w-11 h-11 rounded-2xl bg-white/10 items-center justify-center">
                <Icon name="trending" size={22} color={colors.accentLight} />
              </View>
            </View>
            <View className="pt-3 border-t border-white/10 flex-row gap-1.5">
              {summary.memberShares.slice(0, 5).map((share) => {
                const member = getMember(share.memberId);
                if (!member) return null;
                const isPositive = share.balance >= 0;
                return (
                  <View key={share.memberId} className="flex-1 items-center">
                    <View className={`w-8 h-8 rounded-full items-center justify-center mb-1 ${isPositive ? 'bg-success/20' : 'bg-error/20'}`}>
                      <Text className={`text-[11px] font-bold ${isPositive ? 'text-success' : 'text-error'}`}>{member.name.charAt(0)}</Text>
                    </View>
                    <Text className={`text-[10px] font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
                      {isPositive ? '+' : ''}{formatCurrency(share.balance)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <View style={{ gap: 16 }}>
          <View className="flex-row gap-3">
            {[
              { icon: 'cart', value: activeLists.length.toString(), title: 'Active Lists' },
              { icon: 'users', value: state.members.length.toString(), title: 'Members' },
              { icon: 'receipt', value: summary.expenses.length.toString(), title: 'Expenses' },
            ].map((item, i) => (
              <View key={i} className="bg-white rounded-2xl p-4 flex-1"
                style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
              >
                <View className="w-10 h-10 rounded-2xl bg-primary/10 items-center justify-center mb-2.5">
                  <Icon name={item.icon} size={18} color='#0F9D8A' />
                </View>
                <Text className="text-[22px] font-bold text-[#111827] tracking-tight">{item.value}</Text>
                <Text className="text-[12px] text-[#6B7280] mt-0.5 font-medium">{item.title}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row gap-2.5">
            {[
              { icon: 'cart', label: 'Groceries', sub: `${activeLists.length} active lists`, route: 'grocery', color: '#22C55E' },
              { icon: 'wallet', label: 'Add Bill', sub: 'Track expense', route: 'addexpense', color: '#F59E6B' },
              { icon: 'chat', label: 'Chat', sub: 'Group chat', route: 'chat', color: '#0F9D8A' },
            ].map((item, i) => (
              <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => router.push(`/(tabs)/family/${item.route}`)}
                className="flex-1 bg-white rounded-2xl py-3.5 px-3.5 items-center"
                style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
              >
                <View className="w-10 h-10 rounded-2xl items-center justify-center mb-2" style={{ backgroundColor: item.color + '12' }}>
                  <Icon name={item.icon} size={20} color={item.color} />
                </View>
                <Text className="text-[13px] font-bold text-[#111827] tracking-tight">{item.label}</Text>
                <Text className="text-[10px] text-[#6B7280] mt-0.5">{item.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <Text className="text-[20px] font-bold text-[#111827] tracking-tight mb-4">Recent Expenses</Text>
            <View style={{ gap: 8 }}>
              {recentExpenses.length === 0 ? (
                <View className="bg-white rounded-3xl p-6 items-center">
                  <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mb-3">
                    <Icon name="wallet" size={24} color='#9CA3AF' />
                  </View>
                  <Text className="text-[14px] text-[#6B7280]">No expenses yet</Text>
                </View>
              ) : recentExpenses.map(expense => <ExpenseRow key={expense.id} expense={expense} />)}
            </View>
          </View>

          <View>
            <Text className="text-[20px] font-bold text-[#111827] tracking-tight mb-4">Active Lists</Text>
            <View style={{ gap: 8 }}>
              {activeLists.length === 0 ? (
                <View className="bg-white rounded-3xl p-6 items-center">
                  <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mb-3">
                    <Icon name="cart" size={24} color='#9CA3AF' />
                  </View>
                  <Text className="text-[14px] text-[#6B7280]">No active lists</Text>
                </View>
              ) : activeLists.map(list => {
                const total = list.items.length;
                const done = list.items.filter(i => i.purchased).length;
                const pct = total > 0 ? (done / total) * 100 : 0;
                return (
                  <TouchableOpacity key={list.id} activeOpacity={0.7}
                    onPress={() => router.push(`/(tabs)/family/grocerydetail?id=${list.id}`)}
                    className="bg-white rounded-2xl px-4 py-3.5 flex-row items-center"
                    style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 1 }}
                  >
                    <View className="w-11 h-11 rounded-2xl bg-success/10 items-center justify-center mr-3.5">
                      <Icon name="cart" size={20} color='#22C55E' />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[15px] font-bold text-[#111827] tracking-tight">{list.title}</Text>
                      <View className="flex-row items-center mt-1.5">
                        <View className="flex-1 h-[5px] bg-[#F3F4F6] rounded-full overflow-hidden mr-2">
                          <View className="h-full bg-success rounded-full" style={{ width: `${pct}%` }} />
                        </View>
                        <Text className="text-[10px] font-medium text-[#6B7280]">{done}/{total}</Text>
                      </View>
                    </View>
                    <Icon name="chevron" size={20} color='#9CA3AF' />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={showSwitcher} transparent animationType="fade">
        <View className="flex-1 justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
          <View className="bg-white rounded-3xl p-6"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 25, elevation: 10 }}
          >
            <View className="w-12 h-[5px] rounded-full bg-[#E5E7EB] mx-auto mb-5" />
            <Text className="text-[22px] font-bold text-[#111827] tracking-tight mb-1">Who are you?</Text>
            <Text className="text-[14px] text-[#6B7280] mb-5">Select your name to use the app as yourself</Text>
            {state.members.map(m => {
              const isActive = m.id === state.currentUserId;
              const clr = roleColors[m.role] || '#0F9D8A';
              return (
                <TouchableOpacity key={m.id} activeOpacity={0.7} onPress={() => { setShowSwitcher(false); }} // simplified
                  className="flex-row items-center px-4 py-3 rounded-2xl mb-2 border border-[#E5E7EB]"
                  style={isActive ? { backgroundColor: clr + '10', borderColor: clr + '30' } : {}}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: isActive ? clr + '20' : '#F3F4F6' }}>
                    <Text className="text-[13px] font-bold" style={{ color: isActive ? clr : '#9CA3AF' }}>{m.name.charAt(0)}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-[14px] font-semibold text-[#111827]">{m.name}</Text>
                    <Text className="text-[11px] text-[#6B7280] mt-0.5">{m.role}</Text>
                  </View>
                  {isActive && <View className="w-6 h-6 rounded-full bg-primary items-center justify-center"><Icon name="check" size={12} color='#FFFFFF' /></View>}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity onPress={() => setShowSwitcher(false)} className="mt-2 py-3 rounded-xl bg-[#F8FAFC] items-center border border-[#E5E7EB]">
              <Text className="text-[14px] font-bold text-[#111827]">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
