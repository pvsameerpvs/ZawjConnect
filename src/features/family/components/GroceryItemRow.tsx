import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
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
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onToggle}
      className="flex-row items-center py-2.5 px-4"
    >
      <View
        className={`w-5 h-5 rounded-md items-center justify-center mr-3 ${
          item.purchased ? 'bg-success' : 'border border-muted'
        }`}
      >
        {item.purchased && <Icon name="checkmark" size={12} color={colors.white} />}
      </View>
      <View className="flex-1">
        <Text className={`text-sm ${item.purchased ? 'line-through text-muted' : 'text-ink'}`}>
          {item.name}
        </Text>
      </View>
      <Text className="text-xs text-muted mr-2">
        {item.quantity} {item.unit}
      </Text>
      {purchasedByName && (
        <Text className="text-[10px] text-success">{purchasedByName}</Text>
      )}
    </TouchableOpacity>
  );
}
