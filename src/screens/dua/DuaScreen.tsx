import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';
import DuaCard from '../../components/DuaCard';
import { mockDuas } from '../../constants/mockData';
import { Dua } from '../../types';

const DuaScreen: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Personal' | 'Shared'>('Personal');
  const [duas, setDuas] = useState<Dua[]>(mockDuas);
  const filtered = duas.filter(d => activeTab === 'Shared' ? d.isShared : !d.isShared);

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <View className="bg-white rounded-2xl p-1.5 mb-6 flex-row"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 }}
        >
          {(['Personal', 'Shared'] as const).map(tab => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} activeOpacity={0.7}
              className={`flex-1 py-3 rounded-xl ${activeTab === tab ? 'bg-primary' : ''}`}
            >
              <Text className={`text-center text-[14px] font-semibold tracking-tight ${activeTab === tab ? 'text-white' : 'text-[#6B7280]'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <View className="w-20 h-20 rounded-3xl bg-[#F3F4F6] items-center justify-center mb-4">
              <Icon name="book" size={32} color='#9CA3AF' />
            </View>
            <Text className="text-[17px] font-semibold text-[#111827] text-center">
              {activeTab === 'Personal' ? 'No personal duas' : 'No shared duas'}
            </Text>
            <Text className="text-[14px] text-[#6B7280] text-center mt-2">
              {activeTab === 'Personal' ? 'Add your personal supplications' : 'Share a dua with your spouse'}
            </Text>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {filtered.map(dua => (
              <DuaCard key={dua.id} dua={dua}
                onToggleAnswered={() => setDuas(prev => prev.map(d => d.id === dua.id ? { ...d, answered: !d.answered } : d))}
                onDelete={() => Alert.alert('Delete Dua', 'Are you sure?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => setDuas(prev => prev.filter(d => d.id !== dua.id)) },
                ])}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity onPress={() => router.push('/more/adddua')} activeOpacity={0.8}
        className="absolute bg-primary w-14 h-14 rounded-full items-center justify-center"
        style={{ bottom: 100, right: 24, shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 }}
      >
        <Icon name="add" size={24} color='#FFFFFF' />
      </TouchableOpacity>
    </View>
  );
};

export default DuaScreen;
