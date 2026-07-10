import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import ScreenWrapper from '@/components/ScreenWrapper';
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

  if (!list) {
    return (
      <ScreenWrapper background="surface">
        <View className="flex-1 items-center justify-center">
          <Icon name="shopping-cart-outline" size={48} color={colors.muted} />
          <Text className="text-muted text-base mt-3">List not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const allPurchased = list.items.length > 0 && list.items.every(i => i.purchased);

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    dispatch({
      type: 'ADD_GROCERY_ITEM',
      payload: {
        listId: list.id,
        item: {
          id: Date.now().toString(),
          name: newItem.trim(),
          quantity: 1,
          unit: 'pcs',
          addedBy: state.currentUserId,
          addedAt: Date.now(),
          purchased: false,
        },
      },
    });
    setNewItem('');
  };

  const handleToggle = (itemId: string) => {
    const item = list.items.find(i => i.id === itemId);
    if (item) {
      dispatch({
        type: 'UPDATE_GROCERY_ITEM',
        payload: { listId: list.id, itemId, purchased: !item.purchased },
      });
    }
  };

  const handleShareToChat = () => {
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: {
        id: Date.now().toString(),
        senderId: state.currentUserId,
        text: `Grocery list: ${list.title}`,
        timestamp: Date.now(),
        type: 'grocery_share',
        groceryListId: list.id,
      },
    });
    router.back();
  };

  const pendingItems = list.items.filter(i => !i.purchased);
  const purchasedItems = list.items.filter(i => i.purchased);

  return (
    <View className="flex-1 bg-surface">
      <LinearGradient
        colors={[colors.ink, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-b-[32px]"
        style={{ paddingTop: insets.top + 16, paddingBottom: 20 }}
      >
        <View className="px-5 flex-row items-center mb-3">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mr-3">
            <Icon name="chevron-back" size={20} color={colors.white} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white text-lg font-bold">{list.title}</Text>
            <Text className="text-white/50 text-xs">
              {creator?.name || 'Unknown'} · {list.items.length} items
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleShareToChat}
            className="bg-white/10 rounded-xl px-3.5 py-2 flex-row items-center border border-white/10"
          >
            <Icon name="share-outline" size={16} color={colors.accentLight} />
            <Text className="text-accent-light text-xs font-semibold ml-1.5">Share</Text>
          </TouchableOpacity>
        </View>

        {allPurchased && (
          <View className="mx-5 bg-success/20 rounded-2xl px-5 py-3 border border-success/30 flex-row items-center">
            <Icon name="checkmark-circle" size={20} color={colors.success} />
            <Text className="text-white text-sm font-semibold ml-2.5">All items purchased! 🎉</Text>
          </View>
        )}

        <View className="px-5 mt-3">
          <View className="bg-white/10 rounded-2xl px-4 py-3 flex-row items-center border border-white/10">
            <View className="flex-1 flex-row items-center">
              <Icon name="shopping-cart-outline" size={16} color={colors.white/60} />
              <Text className="text-white/60 text-sm ml-2">
                {pendingItems.length} remaining
              </Text>
            </View>
            <View className="bg-white/10 rounded-lg px-2.5 py-1">
              <Text className="text-white text-xs font-bold">
                {purchasedItems.length}/{list.items.length}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-4 pb-6">
          <View className="bg-white rounded-2xl px-1 py-1 mb-4"
            style={{
              shadowColor: colors.cardShadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 1,
            }}
          >
            <View className="flex-row items-center px-3">
              <TextInput
                value={newItem}
                onChangeText={setNewItem}
                placeholder="Add an item..."
                placeholderTextColor={colors.muted}
                className="flex-1 text-base text-ink py-3.5"
                onSubmitEditing={handleAddItem}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={handleAddItem}
                disabled={!newItem.trim()}
                className={`w-9 h-9 rounded-xl items-center justify-center ${newItem.trim() ? 'bg-primary' : 'bg-surface'}`}
              >
                <Icon name="add" size={20} color={newItem.trim() ? colors.white : colors.muted} />
              </TouchableOpacity>
            </View>
          </View>

          {pendingItems.length > 0 && (
            <View className="bg-white rounded-2xl overflow-hidden mb-3"
              style={{
                shadowColor: colors.cardShadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 4,
                elevation: 0.5,
              }}
            >
              <View className="px-4 py-2.5 border-b border-borderLight">
                <Text className="text-xs font-semibold text-muted uppercase tracking-wider">
                  To Buy · {pendingItems.length}
                </Text>
              </View>
              {pendingItems.map((item, i) => (
                <React.Fragment key={item.id}>
                  <GroceryItemRow item={item} onToggle={() => handleToggle(item.id)} />
                  {i < pendingItems.length - 1 && <View className="h-px bg-borderLight ml-[52px]" />}
                </React.Fragment>
              ))}
            </View>
          )}

          {purchasedItems.length > 0 && (
            <View className="bg-white rounded-2xl overflow-hidden"
              style={{
                shadowColor: colors.cardShadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 4,
                elevation: 0.5,
              }}
            >
              <View className="px-4 py-2.5 border-b border-borderLight">
                <Text className="text-xs font-semibold text-success uppercase tracking-wider">
                  Purchased · {purchasedItems.length}
                </Text>
              </View>
              {purchasedItems.map((item, i) => (
                <React.Fragment key={item.id}>
                  <GroceryItemRow item={item} onToggle={() => handleToggle(item.id)} />
                  {i < purchasedItems.length - 1 && <View className="h-px bg-borderLight ml-[52px]" />}
                </React.Fragment>
              ))}
            </View>
          )}

          {list.items.length === 0 && (
            <View className="py-10 items-center">
              <Icon name="shopping-cart-outline" size={48} color={colors.muted} />
              <Text className="text-sm text-muted mt-3">Start adding items to your list</Text>
            </View>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
}
