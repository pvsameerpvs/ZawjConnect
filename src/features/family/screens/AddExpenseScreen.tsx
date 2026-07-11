import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import { useFamily } from '../stores/FamilyContext';
import type { ExpenseCategory } from '../types';

const CATEGORIES: { key: ExpenseCategory; label: string; icon: string; color: string }[] = [
  { key: 'groceries', label: 'Groceries', icon: 'cart', color: '#22C55E' },
  { key: 'utilities', label: 'Utilities', icon: 'zap', color: '#F59E0B' },
  { key: 'rent', label: 'Rent', icon: 'home', color: '#0F9D8A' },
  { key: 'medical', label: 'Medical', icon: 'heart', color: '#EF4444' },
  { key: 'education', label: 'Education', icon: 'book', color: '#14B8A6' },
  { key: 'transport', label: 'Transport', icon: 'location', color: '#6B7280' },
  { key: 'entertainment', label: 'Fun', icon: 'star', color: '#D9773E' },
  { key: 'other', label: 'Other', icon: 'wallet', color: '#9CA3AF' },
];

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
}

export default function AddExpenseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useFamily();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('groceries');
  const [splitAmong, setSplitAmong] = useState<string[]>(state.members.map(m => m.id));
  const [notes, setNotes] = useState('');

  const toggleSplit = (id: string) => setSplitAmong(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const perPerson = splitAmong.length > 0 && amount ? (parseFloat(amount) / splitAmong.length) : 0;
  const isValid = title.trim() && amount.trim();

  const handleSubmit = () => {
    if (!isValid) return;
    const expenseId = Date.now().toString();
    dispatch({ type: 'ADD_EXPENSE', payload: { id: expenseId, title: title.trim(), amount: parseFloat(amount), category, paidBy: state.currentUserId, date: Date.now(), splitAmong: splitAmong.length > 0 ? splitAmong : state.members.map(m => m.id), notes: notes.trim() || undefined } });
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: { id: (Date.now() + 1).toString(), senderId: state.currentUserId, text: `New expense: ${title.trim()} - $${amount}`, timestamp: Date.now(), type: 'expense_share', expenseId } });
    router.back();
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingTop: insets.top + 16, paddingBottom: 24, paddingHorizontal: 24 }}>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mr-3">
              <Icon name="chevron-back" size={20} color='#FFFFFF' />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-[20px] font-bold tracking-tight">Add Expense</Text>
              <Text className="text-white/50 text-[12px]">Track and split bills with family</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <View style={{ gap: 20 }}>
          <View className="bg-white rounded-3xl p-5"
            style={{ shadowColor: 'rgba(0,0,0,0.06)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 2 }}
          >
            <Text className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-4">Bill Details</Text>
            <TextInput value={title} onChangeText={setTitle} placeholder="What was the bill for?" placeholderTextColor='#9CA3AF'
              className="text-[15px] font-bold text-[#111827] border-b border-[#E5E7EB] pb-3 mb-4"
            />
            <View className="flex-row items-center">
              <Text className="text-[24px] font-bold text-[#9CA3AF] mr-1">$</Text>
              <TextInput value={amount} onChangeText={setAmount} placeholder="0" placeholderTextColor='#9CA3AF'
                keyboardType="decimal-pad" className="flex-1 text-[32px] font-bold text-[#111827]"
              />
            </View>
            {perPerson > 0 && splitAmong.length > 1 && (
              <View className="mt-4 bg-primary/8 rounded-xl px-4 py-3 flex-row items-center">
                <Icon name="users" size={16} color='#0F9D8A' />
                <Text className="text-[14px] font-bold text-primary ml-2">{formatCurrency(perPerson)} per person</Text>
              </View>
            )}
          </View>

          <View>
            <Text className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {CATEGORIES.map(cat => {
                  const selected = category === cat.key;
                  return (
                    <TouchableOpacity key={cat.key} activeOpacity={0.7} onPress={() => setCategory(cat.key)} className="items-center">
                      <View className={`w-14 h-14 rounded-2xl items-center justify-center mb-1.5 ${selected ? '' : 'bg-white border border-[#E5E7EB]'}`}
                        style={selected ? { backgroundColor: cat.color + '15' } : { shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1, shadowRadius: 3, elevation: 0.5 }}
                      >
                        <Icon name={cat.icon} size={20} color={selected ? cat.color : '#9CA3AF'} />
                      </View>
                      <Text className={`text-[12px] font-semibold ${selected ? 'text-[#111827]' : 'text-[#6B7280]'}`}>{cat.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View>
            <Text className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">Split With · {splitAmong.length} {splitAmong.length === 1 ? 'person' : 'people'}</Text>
            <View className="flex-row flex-wrap gap-2">
              {state.members.map(member => {
                const selected = splitAmong.includes(member.id);
                return (
                  <TouchableOpacity key={member.id} activeOpacity={0.7} onPress={() => toggleSplit(member.id)}
                    className={`px-4 py-2.5 rounded-xl flex-row items-center border ${selected ? 'bg-primary border-primary' : 'bg-white border-[#E5E7EB]'}`}
                    style={!selected ? { shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1, shadowRadius: 3, elevation: 0.5 } : {}}
                  >
                    <View className={`w-6 h-6 rounded-full items-center justify-center mr-2 ${selected ? 'bg-white/20' : 'bg-[#F3F4F6]'}`}>
                      <Text className={`text-[11px] font-bold ${selected ? 'text-white' : 'text-[#111827]'}`}>{member.name.charAt(0)}</Text>
                    </View>
                    <Text className={`text-[14px] font-semibold ${selected ? 'text-white' : 'text-[#111827]'}`}>{member.name}</Text>
                    {selected && <View className="ml-1"><Icon name="check" size={16} color='#FFFFFF' /></View>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View className="bg-white rounded-2xl overflow-hidden px-4 py-1 border border-[#E5E7EB]">
            <TextInput value={notes} onChangeText={setNotes} placeholder="Add a note (optional)" placeholderTextColor='#9CA3AF'
              className="text-[14px] text-[#111827] py-3"
            />
          </View>

          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85} disabled={!isValid}
            className="py-4 rounded-3xl bg-primary items-center"
            style={isValid ? { shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 } : {}}
          >
            <Text className={`text-[16px] font-bold ${isValid ? 'text-white' : 'text-white/50'}`}>
              {isValid ? `Add ${formatCurrency(parseFloat(amount || '0'))} · ${splitAmong.length} people` : 'Fill in the details'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
