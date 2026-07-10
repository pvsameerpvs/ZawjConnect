import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import ScreenWrapper from '@/components/ScreenWrapper';
import IslamicCard from '@/components/IslamicCard';
import SectionHeader from '@/components/SectionHeader';
import { useFamily } from '../stores/FamilyContext';

export default function GroceryListsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, dispatch, getMember } = useFamily();
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState('');

  const activeLists = state.groceryLists.filter(l => l.status === 'active');
  const completedLists = state.groceryLists.filter(l => l.status === 'completed');

  const handleCreate = () => {
    if (!title.trim()) return;
    dispatch({
      type: 'ADD_GROCERY_LIST',
      payload: {
        id: Date.now().toString(),
        title: title.trim(),
        createdAt: Date.now(),
        createdBy: state.currentUserId,
        items: [],
        status: 'active',
      },
    });
    setTitle('');
    setShowNew(false);
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
        <View className="px-5 flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-white/50 text-xs font-medium tracking-wide uppercase">Grocery Lists</Text>
            <Text className="text-white text-xl font-bold mt-1">
              {activeLists.length} Active {activeLists.length === 1 ? 'List' : 'Lists'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowNew(true)}
            className="bg-white/10 rounded-xl px-4 py-2.5 flex-row items-center border border-white/10"
          >
            <Icon name="add-circle-outline" size={16} color={colors.accentLight} />
            <Text className="text-accent-light text-sm font-semibold ml-2">New List</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-4 pb-6" style={{ gap: 14 }}>
          <SectionHeader title="Active Lists" />
          {activeLists.length === 0 ? (
            <IslamicCard>
              <View className="py-6 items-center">
                <Icon name="shopping-cart-outline" size={40} color={colors.muted} />
                <Text className="text-sm text-muted mt-3">No active grocery lists</Text>
                <TouchableOpacity onPress={() => setShowNew(true)} className="mt-3 bg-primary/10 rounded-xl px-4 py-2">
                  <Text className="text-sm font-semibold text-primary">Create your first list</Text>
                </TouchableOpacity>
              </View>
            </IslamicCard>
          ) : (
            <View style={{ gap: 8 }}>
              {activeLists.map(list => {
                const total = list.items.length;
                const done = list.items.filter(i => i.purchased).length;
                const pct = total > 0 ? (done / total) * 100 : 0;
                const creator = getMember(list.createdBy);
                return (
                  <TouchableOpacity
                    key={list.id}
                    activeOpacity={0.7}
                    onPress={() => router.push(`/(tabs)/family/grocerydetail?id=${list.id}`)}
                    className="bg-white rounded-2xl px-4 py-4"
                    style={{
                      shadowColor: colors.cardShadow,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 1,
                      shadowRadius: 8,
                      elevation: 1,
                    }}
                  >
                    <View className="flex-row items-center">
                      <View className="w-11 h-11 rounded-2xl bg-success/10 items-center justify-center mr-3.5">
                        <Icon name="shopping-cart-outline" size={22} color={colors.success} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-ink">{list.title}</Text>
                        <Text className="text-xs text-muted mt-0.5">
                          {creator?.name || 'Unknown'} · {total} items
                        </Text>
                      </View>
                      <View className="items-end">
                        <View className="bg-success/10 rounded-lg px-2.5 py-1">
                          <Text className="text-xs font-bold text-success">{Math.round(pct)}%</Text>
                        </View>
                      </View>
                    </View>
                    <View className="mt-3 h-1.5 bg-surface rounded-full overflow-hidden">
                      <View className="h-full bg-success rounded-full" style={{ width: `${pct}%` }} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {completedLists.length > 0 && (
            <View className="mt-4">
              <SectionHeader title="Completed" />
              <View style={{ gap: 8 }}>
                {completedLists.map(list => (
                  <TouchableOpacity
                    key={list.id}
                    activeOpacity={0.7}
                    onPress={() => router.push(`/(tabs)/family/grocerydetail?id=${list.id}`)}
                    className="bg-white rounded-2xl px-4 py-3.5 flex-row items-center opacity-60"
                    style={{
                      shadowColor: colors.cardShadow,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      elevation: 0.5,
                    }}
                  >
                    <View className="w-10 h-10 rounded-xl bg-muted/10 items-center justify-center mr-3">
                      <Icon name="checkmark-circle" size={20} color={colors.muted} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-ink line-through">{list.title}</Text>
                      <Text className="text-xs text-muted">{list.items.length} items</Text>
                    </View>
                    <Icon name="chevron-forward" size={16} color={colors.muted} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScreenWrapper>

      <Modal visible={showNew} transparent animationType="fade">
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
            <Text className="text-xl font-bold text-ink mb-1">New Grocery List</Text>
            <Text className="text-sm text-muted mb-5">Give your shopping list a name</Text>

            <View className="flex-row items-center bg-surface rounded-2xl px-4 border border-border mb-6">
              <Icon name="shopping-cart-outline" size={18} color={colors.muted} />
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Weekly Groceries"
                placeholderTextColor={colors.muted}
                className="flex-1 text-base text-ink py-3.5 ml-3"
                autoFocus
              />
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowNew(false)}
                className="flex-1 py-3.5 rounded-xl bg-surface items-center border border-border"
              >
                <Text className="text-sm font-semibold text-ink">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreate}
                disabled={!title.trim()}
                className="flex-1 py-3.5 rounded-xl bg-primary items-center"
                style={title.trim() ? {
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                } : {}}
              >
                <Text className={`text-sm font-semibold ${title.trim() ? 'text-white' : 'text-white/50'}`}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
