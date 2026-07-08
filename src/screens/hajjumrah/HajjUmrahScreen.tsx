import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { mockChecklistItems } from '../../constants/mockData';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import IslamicCard from '../../components/IslamicCard';
import GradientHeader from '../../components/GradientHeader';
import SectionHeader from '../../components/SectionHeader';
import ProgressRing from '../../components/ProgressRing';
import ChecklistCard from '../../components/ChecklistCard';

type Tab = 'Hajj' | 'Umrah';

const HajjUmrahScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Hajj');
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const totalItems = mockChecklistItems.length;
  const completedCount = completedIds.size;
  const progress = totalItems > 0 ? completedCount / totalItems : 0;

  const handleToggle = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleReset = () => {
    setCompletedIds(new Set());
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Hajj & Umrah" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5 gap-4">
          <IslamicCard>
            <View className="items-center py-2">
              <ProgressRing progress={progress} size={96} strokeWidth={8} label="Overall Progress" />
              <Text className="text-sm text-muted mt-2">
                {completedCount}/{totalItems} items completed
              </Text>
            </View>
          </IslamicCard>

          <View className="flex-row bg-surface rounded-2xl p-1">
            {(['Hajj', 'Umrah'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
                className={`flex-1 py-3 rounded-xl items-center ${
                  activeTab === tab ? 'bg-white' : ''
                }`}
                style={
                  activeTab === tab
                    ? { shadowColor: colors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 4, elevation: 2 }
                    : {}
                }
              >
                <Text
                  className={`text-sm font-semibold ${
                    activeTab === tab ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <SectionHeader title={`${activeTab} Checklist`} />

          {mockChecklistItems.map((item) => (
            <ChecklistCard
              key={item.id}
              item={item}
              completed={completedIds.has(item.id)}
              onToggle={() => handleToggle(item.id)}
            />
          ))}

          {completedCount > 0 && (
            <AppButton
              title="Reset Progress"
              variant="ghost"
              onPress={handleReset}
            />
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default HajjUmrahScreen;
