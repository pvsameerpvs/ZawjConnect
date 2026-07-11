import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@/components/Icon';
import type { ChatMessage } from '../types';
import { useFamily } from '../stores/FamilyContext';

interface ChatBubbleProps {
  message: ChatMessage;
  onGroceryPress?: (listId: string) => void;
  onExpensePress?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onGroceryPress, onExpensePress }) => {
  const { state, getMember } = useFamily();
  const sender = getMember(message.senderId);
  const isMe = message.senderId === state.currentUserId;
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View className={`mb-3 flex-row ${isMe ? 'justify-end' : 'justify-start'}`}>
      <View className={`max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
        {!isMe && <Text className="text-[11px] text-[#6B7280] mb-1 ml-1 font-medium">{sender?.name || 'Unknown'}</Text>}
        <View className={`rounded-2xl px-4 py-3 ${isMe ? 'bg-primary' : 'bg-white'}`}
          style={!isMe ? {
            shadowColor: 'rgba(0,0,0,0.04)',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 0.5,
          } : {}}
        >
          {message.type === 'grocery_share' && message.groceryListId ? (
            <TouchableOpacity onPress={() => onGroceryPress?.(message.groceryListId!)} activeOpacity={0.7}
              className="flex-row items-center"
            >
              <View className="w-8 h-8 rounded-xl bg-white/20 items-center justify-center mr-2.5">
                <Icon name="cart" size={16} color='#FFFFFF' />
              </View>
              <View>
                <Text className={`text-[13px] font-semibold ${isMe ? 'text-white' : 'text-[#111827]'}`}>Grocery List</Text>
                <Text className={`text-[11px] ${isMe ? 'text-white/70' : 'text-[#6B7280]'}`}>{message.text}</Text>
              </View>
            </TouchableOpacity>
          ) : message.type === 'expense_share' ? (
            <TouchableOpacity onPress={() => onExpensePress?.()} activeOpacity={0.7}
              className="flex-row items-center"
            >
              <View className="w-8 h-8 rounded-xl bg-accent/20 items-center justify-center mr-2.5">
                <Icon name="wallet" size={16} color={isMe ? '#FFFFFF' : '#F59E6B'} />
              </View>
              <View>
                <Text className={`text-[13px] font-semibold ${isMe ? 'text-white' : 'text-[#111827]'}`}>New Expense</Text>
                <Text className={`text-[11px] ${isMe ? 'text-white/70' : 'text-[#6B7280]'}`}>{message.text}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Text className={`text-[14px] ${isMe ? 'text-white' : 'text-[#111827]'} leading-5`}>{message.text}</Text>
          )}
        </View>
        <Text className="text-[10px] text-[#9CA3AF] mt-1 mx-1">{time}</Text>
      </View>
    </View>
  );
};

export default ChatBubble;
