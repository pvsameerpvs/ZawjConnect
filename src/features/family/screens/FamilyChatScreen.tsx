import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import ChatBubble from '../components/ChatBubble';
import { useFamily } from '../stores/FamilyContext';

export default function FamilyChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, dispatch, getMember } = useFamily();
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sortedMessages = [...state.chatMessages].sort((a, b) => a.timestamp - b.timestamp);

  const handleSend = () => {
    if (!text.trim()) return;
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: {
        id: Date.now().toString(),
        senderId: state.currentUserId,
        text: text.trim(),
        timestamp: Date.now(),
        type: 'text',
      },
    });
    setText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-surface"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : insets.bottom}
    >
      <LinearGradient
        colors={[colors.ink, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top + 16, paddingBottom: 12 }}
      >
        <View className="px-5 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mr-3">
            <Icon name="chevron-back" size={20} color={colors.white} />
          </TouchableOpacity>
          <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mr-3 border border-white/20">
            <Icon name="message-circle-outline" size={20} color={colors.accentLight} />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base font-bold">{state.familyName}</Text>
            <Text className="text-white/50 text-xs">{state.members.length} members · {state.chatMessages.length} messages</Text>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        ref={flatListRef}
        data={sortedMessages}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        renderItem={({ item }) => (
          <ChatBubble
            message={item}
            onGroceryPress={(listId) => router.push(`/(tabs)/family/grocerydetail?id=${listId}`)}
            onExpensePress={() => router.push('/(tabs)/family/expenses')}
          />
        )}
        ListEmptyComponent={
          <View className="py-16 items-center">
            <View className="w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-4">
              <Icon name="message-circle-outline" size={32} color={colors.primary} />
            </View>
            <Text className="text-base font-semibold text-ink mb-1">No messages yet</Text>
            <Text className="text-sm text-muted text-center px-10">
              Start your family conversation! Share grocery lists, expenses, and updates.
            </Text>
          </View>
        }
      />

      <View className="px-4 py-3 border-t border-border bg-white"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <View className="flex-row items-center bg-surface rounded-2xl px-4 py-1 border border-border">
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor={colors.muted}
            className="flex-1 text-base text-ink py-2.5"
            multiline={false}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!text.trim()}
            className={`w-10 h-10 rounded-xl items-center justify-center ml-2 ${
              text.trim() ? 'bg-primary' : 'bg-surface'
            }`}
            style={text.trim() ? {
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 3,
            } : {}}
          >
            <Icon name="send-outline" size={18} color={text.trim() ? colors.white : colors.muted} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
