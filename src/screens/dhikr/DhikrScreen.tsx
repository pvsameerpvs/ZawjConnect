import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import DhikrCounter from '../../components/DhikrCounter';
import IslamicCard from '../../components/IslamicCard';
import ProgressBar from '../../components/ProgressBar';
import { colors } from '../../constants/colors';
import { mockDhikrTypes, mockDhikrCounts } from '../../constants/mockData';

const DhikrScreen: React.FC = () => {
  const [activeDhikrId, setActiveDhikrId] = useState<string>('subhanallah');
  const [counts, setCounts] = useState<Record<string, number>>(mockDhikrCounts);

  const activeDhikr = useMemo(
    () => mockDhikrTypes.find((d) => d.id === activeDhikrId)!,
    [activeDhikrId],
  );

  const totalCount = useMemo(
    () => Object.values(counts).reduce((sum, c) => sum + c, 0),
    [counts],
  );

  const totalGoal = useMemo(
    () => mockDhikrTypes.reduce((sum, d) => sum + d.goal, 0),
    [],
  );

  const totalProgress = totalGoal > 0 ? totalCount / totalGoal : 0;

  const handleIncrement = () => {
    setCounts((prev) => ({
      ...prev,
      [activeDhikrId]: prev[activeDhikrId] + 1,
    }));
  };

  const handleReset = () => {
    setCounts((prev) => ({
      ...prev,
      [activeDhikrId]: 0,
    }));
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Dhikr" subtitle="Remembrance of Allah" />

      <ScreenWrapper scroll background="surface" withPadding edges={['bottom']} contentClassName="pt-0">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View className="flex-row space-x-2">
            {mockDhikrTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setActiveDhikrId(type.id)}
                activeOpacity={0.7}
                className={`px-5 py-2.5 rounded-full ${
                  activeDhikrId === type.id ? 'bg-primary' : 'bg-surface'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    activeDhikrId === type.id ? 'text-white' : 'text-ink'
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View className="items-center mb-6">
          <Text className="text-3xl text-ink text-center leading-relaxed">
            {activeDhikr.arabic}
          </Text>
        </View>

        <DhikrCounter
          count={counts[activeDhikrId]}
          goal={activeDhikr.goal}
          label={activeDhikr.label}
          onIncrement={handleIncrement}
          onReset={handleReset}
        />

        <IslamicCard variant="white" className="mt-8">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Icon name="stats-chart" size={20} color={colors.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-ink">
                Daily Goal Progress
              </Text>
              <Text className="text-xs text-muted">
                Overall dhikr completion
              </Text>
            </View>
            <Text className="text-lg font-bold text-primary">
              {Math.round(totalProgress * 100)}%
            </Text>
          </View>
          <ProgressBar progress={totalProgress} showPercentage={false} />
          <Text className="text-xs text-muted text-center mt-3">
            {totalCount} / {totalGoal} completed
          </Text>
        </IslamicCard>
      </ScreenWrapper>
    </View>
  );
};

export default DhikrScreen;
