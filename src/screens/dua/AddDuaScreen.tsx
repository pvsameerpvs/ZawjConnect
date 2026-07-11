import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';

const CATEGORIES = ['Family', 'Rizq', 'Health', 'Forgiveness', 'Marriage', 'Children', 'Akhirah'];

const AddDuaScreen: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isShared, setIsShared] = useState(false);

  const input = (val: string, set: (v: string) => void, placeholder: string, multi?: boolean) => (
    <View className={`flex-row items-center bg-white rounded-2xl border border-[#E5E7EB] ${multi ? 'min-h-[100px]' : 'h-[54px]'}`}>
      <TextInput className={`flex-1 px-4 text-[15px] text-[#111827] ${multi ? 'py-3' : ''}`} value={val}
        onChangeText={set} placeholder={placeholder} placeholderTextColor='#9CA3AF' multiline={multi} textAlignVertical={multi ? 'top' : 'center'} />
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <Text className="text-[13px] font-semibold text-[#111827] mb-2">Dua Title</Text>
      {input(title, setTitle, 'e.g. Bless our marriage')}
      <Text className="text-[13px] font-semibold text-[#111827] mb-2 mt-4">Dua Content</Text>
      {input(content, setContent, 'Write your supplication...', true)}
      <Text className="text-[13px] font-semibold text-[#111827] mb-3 mt-4">Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
        <View className="flex-row gap-2">
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat} onPress={() => setCategory(cat)} activeOpacity={0.7}
              className={`px-5 py-2.5 rounded-2xl border ${category === cat ? 'bg-primary border-primary' : 'bg-white border-[#E5E7EB]'}`}
              style={category === cat ? { shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 3 } : {}}
            >
              <Text className={`text-[14px] font-semibold tracking-tight ${category === cat ? 'text-white' : 'text-[#111827]'}`}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Text className="text-[13px] font-semibold text-[#111827] mb-3">Visibility</Text>
      <View className="flex-row bg-white rounded-2xl p-1.5 mb-6 border border-[#E5E7EB]">
        {(['Private', 'Shared'] as const).map(opt => (
          <TouchableOpacity key={opt} onPress={() => setIsShared(opt === 'Shared')} activeOpacity={0.7}
            className={`flex-1 py-3 rounded-xl ${(opt === 'Shared' && isShared) || (opt === 'Private' && !isShared) ? 'bg-primary' : ''}`}
          >
            <Text className={`text-center text-[14px] font-semibold tracking-tight ${(opt === 'Shared' && isShared) || (opt === 'Private' && !isShared) ? 'text-white' : 'text-[#6B7280]'}`}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => { if (!title.trim() || !content.trim() || !category) { Alert.alert('Validation', 'Please fill all fields'); return; } Alert.alert('Dua Saved', 'Your dua has been added successfully.', [{ text: 'OK', onPress: () => router.back() }]); }}
        activeOpacity={0.85} className="h-[56px] rounded-3xl bg-primary items-center justify-center"
        style={{ shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 }}
      >
        <Text className="text-white text-[17px] font-bold">Save Dua</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddDuaScreen;
