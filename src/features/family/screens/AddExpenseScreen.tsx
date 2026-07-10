import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useFamily } from '../stores/FamilyContext';
import type { ExpenseCategory } from '../types';

const CATEGORIES: { key: ExpenseCategory; label: string; icon: string; color: string }[] = [
  { key: 'groceries', label: 'Groceries', icon: 'shopping-cart-outline', color: colors.success },
  { key: 'utilities', label: 'Utilities', icon: 'flash-outline', color: colors.accent },
  { key: 'rent', label: 'Rent', icon: 'home-outline', color: colors.primary },
  { key: 'medical', label: 'Medical', icon: 'heart-outline', color: colors.error },
  { key: 'education', label: 'Education', icon: 'book-outline', color: colors.primaryLight },
  { key: 'transport', label: 'Transport', icon: 'location-outline', color: colors.inkLight },
  { key: 'entertainment', label: 'Fun', icon: 'star-outline', color: colors.accentDark },
  { key: 'other', label: 'Other', icon: 'wallet-outline', color: colors.muted },
];

export default function AddExpenseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useFamily();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('groceries');
  const [splitAmong, setSplitAmong] = useState<string[]>(state.members.map(m => m.id));
  const [notes, setNotes] = useState('');

  const toggleSplit = (id: string) => {
    setSplitAmong(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const perPerson = splitAmong.length > 0 && amount ? (parseFloat(amount) / splitAmong.length) : 0;

  const handleSubmit = () => {
    if (!title.trim() || !amount.trim()) return;
    const expenseId = Date.now().toString();
    dispatch({
      type: 'ADD_EXPENSE',
      payload: {
        id: expenseId,
        title: title.trim(),
        amount: parseFloat(amount),
        category,
        paidBy: state.currentUserId,
        date: Date.now(),
        splitAmong: splitAmong.length > 0 ? splitAmong : state.members.map(m => m.id),
        notes: notes.trim() || undefined,
      },
    });
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: {
        id: (Date.now() + 1).toString(),
        senderId: state.currentUserId,
        text: `New expense: ${title.trim()} - $${amount}`,
        timestamp: Date.now(),
        type: 'expense_share',
        expenseId,
      },
    });
    router.back();
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
        <View className="px-5 flex-row items-center mb-2">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mr-3">
            <Icon name="chevron-back" size={20} color={colors.white} />
          </TouchableOpacity>
          <View>
            <Text className="text-white text-lg font-bold">Add Expense</Text>
            <Text className="text-white/50 text-xs">Track and split bills with family</Text>
          </View>
        </View>
      </LinearGradient>

      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-4 pb-6" style={{ gap: 18 }}>
          <View className="bg-white rounded-3xl p-5"
            style={{
              shadowColor: colors.cardShadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 12,
              elevation: 2,
            }}
          >
            <Text className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Bill Details</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="What was the bill for?"
              placeholderTextColor={colors.muted}
              className="text-base font-semibold text-ink border-b border-border pb-3 mb-3"
            />
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-muted mr-1">$</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0"
                placeholderTextColor={colors.muted}
                keyboardType="decimal-pad"
                className="flex-1 text-3xl font-bold text-ink"
              />
            </View>
            {perPerson > 0 && splitAmong.length > 1 && (
              <View className="mt-3 bg-primary/5 rounded-xl px-4 py-2.5 flex-row items-center">
                <Icon name="people-outline" size={16} color={colors.primary} />
                <Text className="text-sm text-primary font-semibold ml-2">
                  ${perPerson.toFixed(2)} per person
                </Text>
              </View>
            )}
          </View>

          <View>
            <Text className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-1">Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2.5">
                {CATEGORIES.map(cat => {
                  const selected = category === cat.key;
                  return (
                    <TouchableOpacity
                      key={cat.key}
                      activeOpacity={0.7}
                      onPress={() => setCategory(cat.key)}
                      className="items-center"
                    >
                      <View className={`w-14 h-14 rounded-2xl items-center justify-center mb-1.5 ${
                        selected ? '' : 'bg-white border border-border'
                      }`}
                        style={selected ? { backgroundColor: cat.color + '15' } : {
                          shadowColor: colors.cardShadow,
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 1,
                          shadowRadius: 3,
                          elevation: 0.5,
                        }}
                      >
                        <Icon name={cat.icon} size={22} color={selected ? cat.color : colors.muted} />
                      </View>
                      <Text className={`text-xs font-medium ${selected ? 'text-ink' : 'text-muted'}`}>{cat.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View>
            <Text className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-1">
              Split With · {splitAmong.length} {splitAmong.length === 1 ? 'person' : 'people'}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {state.members.map(member => {
                const selected = splitAmong.includes(member.id);
                return (
                  <TouchableOpacity
                    key={member.id}
                    activeOpacity={0.7}
                    onPress={() => toggleSplit(member.id)}
                    className={`px-4 py-2.5 rounded-xl flex-row items-center border ${
                      selected ? 'bg-primary border-primary' : 'bg-white border-border'
                    }`}
                    style={!selected ? {
                      shadowColor: colors.cardShadow,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                      elevation: 0.5,
                    } : {}}
                  >
                    <View className={`w-6 h-6 rounded-full items-center justify-center mr-2 ${
                      selected ? 'bg-white/20' : 'bg-surface'
                    }`}>
                      <Text className={`text-xs font-bold ${selected ? 'text-white' : 'text-ink'}`}>
                        {member.name.charAt(0)}
                      </Text>
                    </View>
                    <Text className={`text-sm font-medium ${selected ? 'text-white' : 'text-ink'}`}>
                      {member.name}
                    </Text>
                    {selected && (
                      <View className="ml-1"><Icon name="checkmark" size={14} color={colors.white} /></View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View className="bg-white rounded-2xl px-4 py-1 border border-border">
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Add a note (optional)"
              placeholderTextColor={colors.muted}
              className="text-sm text-ink py-3"
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.85}
            disabled={!title.trim() || !amount.trim()}
            className="py-4 rounded-2xl bg-primary items-center"
            style={title.trim() && amount.trim() ? {
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 6,
            } : {}}
          >
            <Text className={`text-base font-bold ${title.trim() && amount.trim() ? 'text-white' : 'text-white/50'}`}>
              {title.trim() && amount.trim()
                ? `Add $${parseFloat(amount || '0').toFixed(0)} · ${splitAmong.length} people`
                : 'Fill in the details'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </View>
  );
}
