import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { mockChecklistItems } from '../../constants/mockData';
import IslamicCard from '../../components/IslamicCard';
import ProgressRing from '../../components/ProgressRing';
import ChecklistCard from '../../components/ChecklistCard';

const HajjUmrahScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Hajj' | 'Umrah'>('Hajj');
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const progress = mockChecklistItems.length > 0 ? completedIds.size / mockChecklistItems.length : 0;

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ gap: 16 }}>
        <IslamicCard variant="elevated">
          <View className="items-center py-3">
            <ProgressRing progress={progress} size={96} strokeWidth={8} label="Overall Progress" />
            <View className="flex-row items-center mt-3">
              <Text className="text-[28px] font-bold text-[#111827] tracking-tight">{completedIds.size}</Text>
              <Text className="text-[14px] text-[#6B7280] ml-1">/ {mockChecklistItems.length} items</Text>
            </View>
          </View>
        </IslamicCard>

        <View className="flex-row bg-white rounded-2xl p-1.5 border border-[#E5E7EB]">
          {(['Hajj', 'Umrah'] as const).map(tab => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} activeOpacity={0.7}
              className={`flex-1 py-3 rounded-xl items-center ${activeTab === tab ? 'bg-primary' : ''}`}
              style={activeTab === tab ? { shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 3 } : {}}
            >
              <Text className={`text-[14px] font-bold tracking-wide ${activeTab === tab ? 'text-white' : 'text-[#6B7280]'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-[20px] font-bold text-[#111827] tracking-tight">{activeTab} Checklist</Text>

        {mockChecklistItems.map(item => (
          <ChecklistCard key={item.id} item={item} completed={completedIds.has(item.id)}
            onToggle={() => setCompletedIds(prev => { const n = new Set(prev); n.has(item.id) ? n.delete(item.id) : n.add(item.id); return n; })}
          />
        ))}

        {completedIds.size > 0 && (
          <TouchableOpacity onPress={() => setCompletedIds(new Set())} activeOpacity={0.7}
            className="py-3 rounded-2xl items-center bg-primary/8"
          >
            <Text className="text-[14px] font-semibold text-primary">Reset Progress</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default HajjUmrahScreen;
