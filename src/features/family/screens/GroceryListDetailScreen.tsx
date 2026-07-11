import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import GroceryItemRow from '../components/GroceryItemRow';
import { useFamily } from '../stores/FamilyContext';

export default function GroceryListDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, dispatch, getMember } = useFamily();
  const [newItem, setNewItem] = useState('');
  const list = useMemo(() => state.groceryLists.find(l => l.id === id), [state.groceryLists, id]);
  const creator = list ? getMember(list.createdBy) : null;

  if (!list) return (
    <View className="flex-1 bg-[#F8FAFC] items-center justify-center">
      <Icon name="cart" size={40} color='#9CA3AF' />
      <Text className="text-[#6B7280] text-[15px] mt-3">List not found</Text>
    </View>
  );

  const pending = list.items.filter(i => !i.purchased);
  const purchased = list.items.filter(i => i.purchased);
  const allPurchased = list.items.length > 0 && list.items.every(i => i.purchased);

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    dispatch({ type: 'ADD_GROCERY_ITEM', payload: { listId: list.id, item: { id: Date.now().toString(), name: newItem.trim(), quantity: 1, unit: 'pcs', addedBy: state.currentUserId, addedAt: Date.now(), purchased: false } } });
    setNewItem('');
  };

  const handleToggle = (itemId: string) => {
    const item = list.items.find(i => i.id === itemId);
    if (item) dispatch({ type: 'UPDATE_GROCERY_ITEM', payload: { listId: list.id, itemId, purchased: !item.purchased } });
  };

  const handleShareToChat = () => {
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: { id: Date.now().toString(), senderId: state.currentUserId, text: `Grocery list: ${list.title}`, timestamp: Date.now(), type: 'grocery_share', groceryListId: list.id } });
    router.back();
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingTop: insets.top + 16, paddingBottom: 20, paddingHorizontal: 24 }}>
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mr-3">
              <Icon name="chevron-back" size={20} color='#FFFFFF' />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-white text-[18px] font-bold tracking-tight">{list.title}</Text>
              <Text className="text-white/50 text-[12px]">{creator?.name || 'Unknown'} · {list.items.length} items</Text>
            </View>
            <TouchableOpacity onPress={handleShareToChat} className="bg-white/10 rounded-xl px-3.5 py-2 flex-row items-center border border-white/10">
              <Icon name="share" size={16} color={colors.accentLight} />
              <Text className="text-accent-light text-[12px] font-semibold ml-1.5">Share</Text>
            </TouchableOpacity>
          </View>
          {allPurchased && (
            <View className="bg-success/20 rounded-2xl px-5 py-3 border border-success/30 flex-row items-center">
              <Icon name="check-circle" size={20} color='#22C55E' />
              <Text className="text-white text-[14px] font-semibold ml-2.5">All items purchased!</Text>
            </View>
          )}
          <View className="mt-3 bg-white/10 rounded-2xl px-4 py-3 flex-row items-center border border-white/10">
            <Text className="text-white/60 text-[14px]">{pending.length} remaining</Text>
            <View className="flex-1" />
            <View className="bg-white/10 rounded-lg px-2.5 py-1">
              <Text className="text-white text-[12px] font-bold">{purchased.length}/{list.items.length}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <View className="bg-white rounded-2xl px-1 py-1 mb-5"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          <View className="flex-row items-center px-3">
            <TextInput value={newItem} onChangeText={setNewItem} placeholder="Add an item..." placeholderTextColor='#9CA3AF'
              className="flex-1 text-[15px] text-[#111827] py-3.5" onSubmitEditing={handleAddItem} returnKeyType="done"
            />
            <TouchableOpacity onPress={handleAddItem} disabled={!newItem.trim()}
              className={`w-9 h-9 rounded-2xl items-center justify-center ${newItem.trim() ? 'bg-primary' : 'bg-[#F3F4F6]'}`}
            >
              <Icon name="add" size={20} color={newItem.trim() ? '#FFFFFF' : '#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </View>

        {pending.length > 0 && (
          <View className="bg-white rounded-2xl overflow-hidden mb-3"
            style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1, shadowRadius: 4, elevation: 0.5 }}
          >
            <View className="px-4 py-3 border-b border-[#E5E7EB]">
              <Text className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">To Buy · {pending.length}</Text>
            </View>
            {pending.map((item, i) => (
              <React.Fragment key={item.id}>
                <GroceryItemRow item={item} onToggle={() => handleToggle(item.id)} />
                {i < pending.length - 1 && <View className="h-px bg-[#E5E7EB] ml-[52px]" />}
              </React.Fragment>
            ))}
          </View>
        )}

        {purchased.length > 0 && (
          <View className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]"
            style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1, shadowRadius: 4, elevation: 0.5 }}
          >
            <View className="px-4 py-3 border-b border-[#E5E7EB]">
              <Text className="text-[11px] font-bold text-success uppercase tracking-wider">Purchased · {purchased.length}</Text>
            </View>
            {purchased.map((item, i) => (
              <React.Fragment key={item.id}>
                <GroceryItemRow item={item} onToggle={() => handleToggle(item.id)} />
                {i < purchased.length - 1 && <View className="h-px bg-[#E5E7EB] ml-[52px]" />}
              </React.Fragment>
            ))}
          </View>
        )}

        {list.items.length === 0 && (
          <View className="py-16 items-center">
            <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mb-3">
              <Icon name="cart" size={28} color='#9CA3AF' />
            </View>
            <Text className="text-[14px] text-[#6B7280]">Start adding items to your list</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
