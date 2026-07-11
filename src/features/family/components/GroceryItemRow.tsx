import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';
import type { GroceryItem } from '../types';
import { useFamily } from '../stores/FamilyContext';

interface GroceryItemRowProps {
  item: GroceryItem;
  onToggle: () => void;
}

export default function GroceryItemRow({ item, onToggle }: GroceryItemRowProps) {
  const { getMember } = useFamily();
  const purchasedByName = item.purchasedBy ? getMember(item.purchasedBy)?.name : null;

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onToggle} className="flex-row items-center py-3 px-4">
      <View className={`w-7 h-7 rounded-xl items-center justify-center mr-3 ${item.purchased ? 'bg-success' : 'border-2 border-[#D1D5DB]'}`}>
        {item.purchased && <Icon name="check" size={15} color='#FFFFFF' />}
      </View>
      <View className="flex-1">
        <Text className={`text-[14px] ${item.purchased ? 'line-through text-[#6B7280]' : 'text-[#111827] font-medium'}`}>
          {item.name}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-[11px] text-[#6B7280] font-medium mr-2">{item.quantity} {item.unit}</Text>
        {purchasedByName && (
          <View className="bg-success/10 rounded-md px-2 py-0.5">
            <Text className="text-[10px] font-semibold text-success">{purchasedByName}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
