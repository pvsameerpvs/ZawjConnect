import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
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
    dispatch({ type: 'ADD_GROCERY_LIST', payload: { id: Date.now().toString(), title: title.trim(), createdAt: Date.now(), createdBy: state.currentUserId, items: [], status: 'active' } });
    setTitle(''); setShowNew(false);
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <LinearGradient colors={[colors.ink, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingTop: insets.top + 16, paddingBottom: 24, paddingHorizontal: 24 }}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white/50 text-[11px] font-semibold tracking-wide uppercase">Grocery Lists</Text>
              <Text className="text-white text-[22px] font-bold mt-1 tracking-tight">{activeLists.length} Active {activeLists.length === 1 ? 'List' : 'Lists'}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowNew(true)}
              className="bg-white/10 rounded-2xl px-4 py-2.5 flex-row items-center border border-white/10"
            >
              <Icon name="plus-circle" size={16} color={colors.accentLight} />
              <Text className="text-accent-light text-[14px] font-semibold ml-2">New List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <Text className="text-[20px] font-bold text-[#111827] tracking-tight mb-4">Active Lists</Text>
        {activeLists.length === 0 ? (
          <View className="bg-white rounded-3xl p-8 items-center">
            <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mb-3">
              <Icon name="cart" size={28} color='#9CA3AF' />
            </View>
            <Text className="text-[14px] text-[#6B7280] mb-3">No active grocery lists</Text>
            <TouchableOpacity onPress={() => setShowNew(true)} className="bg-primary/10 rounded-xl px-4 py-2">
              <Text className="text-[14px] font-bold text-primary">Create your first list</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {activeLists.map(list => {
              const total = list.items.length;
              const done = list.items.filter(i => i.purchased).length;
              const pct = total > 0 ? (done / total) * 100 : 0;
              const creator = getMember(list.createdBy);
              return (
                <TouchableOpacity key={list.id} activeOpacity={0.7}
                  onPress={() => router.push(`/(tabs)/family/grocerydetail?id=${list.id}`)}
                  className="bg-white rounded-2xl p-4" style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
                >
                  <View className="flex-row items-center mb-3">
                    <View className="w-11 h-11 rounded-2xl bg-success/10 items-center justify-center mr-3.5">
                      <Icon name="cart" size={20} color='#22C55E' />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[15px] font-bold text-[#111827] tracking-tight">{list.title}</Text>
                      <Text className="text-[12px] text-[#6B7280] mt-0.5">{creator?.name || 'Unknown'} · {total} items</Text>
                    </View>
                    <View className="bg-success/10 rounded-lg px-2.5 py-1">
                      <Text className="text-[12px] font-bold text-success">{Math.round(pct)}%</Text>
                    </View>
                  </View>
                  <View className="h-[5px] bg-[#F3F4F6] rounded-full overflow-hidden">
                    <View className="h-full bg-success rounded-full" style={{ width: `${pct}%` }} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {completedLists.length > 0 && (
          <View className="mt-6">
            <Text className="text-[20px] font-bold text-[#111827] tracking-tight mb-4">Completed</Text>
            <View style={{ gap: 8 }}>
              {completedLists.map(list => (
                <TouchableOpacity key={list.id} activeOpacity={0.7}
                  onPress={() => router.push(`/(tabs)/family/grocerydetail?id=${list.id}`)}
                  className="bg-white rounded-2xl px-4 py-3.5 flex-row items-center opacity-60"
                  style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1, shadowRadius: 4, elevation: 0.5 }}
                >
                  <View className="w-10 h-10 rounded-2xl bg-muted/10 items-center justify-center mr-3">
                    <Icon name="check-circle" size={20} color='#9CA3AF' />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[14px] font-semibold text-[#111827] line-through">{list.title}</Text>
                    <Text className="text-[12px] text-[#6B7280] mt-0.5">{list.items.length} items</Text>
                  </View>
                  <Icon name="chevron" size={16} color='#9CA3AF' />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={showNew} transparent animationType="fade">
        <View className="flex-1 justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
          <View className="bg-white rounded-3xl p-6"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 25, elevation: 10 }}
          >
            <View className="w-12 h-[5px] rounded-full bg-[#E5E7EB] mx-auto mb-5" />
            <Text className="text-[22px] font-bold text-[#111827] tracking-tight mb-1">New Grocery List</Text>
            <Text className="text-[14px] text-[#6B7280] mb-5">Give your shopping list a name</Text>
            <View className="flex-row items-center bg-[#F8FAFC] rounded-2xl px-4 border border-[#E5E7EB] mb-6">
              <Icon name="cart" size={20} color='#9CA3AF' />
              <TextInput value={title} onChangeText={setTitle} placeholder="e.g. Weekly Groceries"
                placeholderTextColor='#9CA3AF' className="flex-1 text-[15px] text-[#111827] py-3.5 ml-3" autoFocus
              />
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity onPress={() => setShowNew(false)} className="flex-1 py-3.5 rounded-2xl bg-[#F8FAFC] items-center border border-[#E5E7EB]">
                <Text className="text-[14px] font-bold text-[#111827]">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreate} disabled={!title.trim()}
                className="flex-1 py-3.5 rounded-2xl bg-primary items-center"
                style={title.trim() ? { shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 } : {}}
              >
                <Text className={`text-[14px] font-bold ${title.trim() ? 'text-white' : 'text-white/50'}`}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
