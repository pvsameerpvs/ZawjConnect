import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import type { ChatMessage } from '../types';
import { useFamily } from '../stores/FamilyContext';

interface ChatBubbleProps {
  message: ChatMessage;
  onGroceryPress?: (listId: string) => void;
  onExpensePress?: (expenseId: string) => void;
}

export default function ChatBubble({ message, onGroceryPress, onExpensePress }: ChatBubbleProps) {
  const { state, getMember } = useFamily();
  const isOwn = message.senderId === state.currentUserId;
  const sender = getMember(message.senderId);

  const bubbleBg = isOwn ? 'bg-primary' : 'bg-white';
  const textColor = isOwn ? 'text-white' : 'text-ink';
  const timeColor = isOwn ? 'text-white/70' : 'text-muted';

  const timeStr = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View className={`mb-3 ${isOwn ? 'items-end' : 'items-start'}`}>
      {!isOwn && sender && (
        <Text className="text-xs text-muted mb-1 ml-1">{sender.name}</Text>
      )}
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${bubbleBg}`}
        style={!isOwn ? {
          shadowColor: colors.cardShadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 1,
          shadowRadius: 3,
          elevation: 0.5,
        } : {}}
      >
        {message.type === 'grocery_share' && message.groceryListId ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onGroceryPress?.(message.groceryListId!)}
            className="flex-row items-center"
          >
            <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center mr-2">
              <Icon name="shopping-cart-outline" size={16} color={colors.primary} />
            </View>
            <View>
              <Text className={`text-sm font-semibold ${textColor}`}>Grocery List</Text>
              <Text className={`text-xs ${timeColor}`}>Tap to view list</Text>
            </View>
          </TouchableOpacity>
        ) : message.type === 'expense_share' && message.expenseId ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onExpensePress?.(message.expenseId!)}
            className="flex-row items-center"
          >
            <View className="w-8 h-8 rounded-lg bg-accent/10 items-center justify-center mr-2">
              <Icon name="wallet-outline" size={16} color={colors.accent} />
            </View>
            <View>
              <Text className={`text-sm font-semibold ${textColor}`}>Expense Shared</Text>
              <Text className={`text-xs ${timeColor}`}>Tap to view details</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text className={`text-sm ${textColor}`}>{message.text}</Text>
        )}
        <Text className={`text-[10px] ${timeColor} mt-1 self-end`}>{timeStr}</Text>
      </View>
    </View>
  );
}
