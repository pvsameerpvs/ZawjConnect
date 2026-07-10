import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from '../../components/Icon';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import DuaCard from '../../components/DuaCard';
import EmptyState from '../../components/EmptyState';
import { mockDuas } from '../../constants/mockData';
import { Dua } from '../../types';
import { colors } from '../../constants/colors';

const DuaScreen: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Personal' | 'Shared'>('Personal');
  const [duas, setDuas] = useState<Dua[]>(mockDuas);

  const filteredDuas = duas.filter((d) =>
    activeTab === 'Shared' ? d.isShared : !d.isShared,
  );

  const handleToggleAnswered = (id: string) => {
    setDuas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, answered: !d.answered } : d)),
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Dua', 'Are you sure you want to delete this dua?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setDuas((prev) => prev.filter((d) => d.id !== id)),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Duas" subtitle="Supplications" />

      <ScreenWrapper scroll background="surface" withPadding edges={['bottom']} contentClassName="pt-0">
        <View className="flex-row bg-surface rounded-full p-1 mx-5 mb-5">
          {(['Personal', 'Shared'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
              className={`flex-1 py-2.5 rounded-full ${
                activeTab === tab ? 'bg-primary' : ''
              }`}
            >
              <Text
                className={`text-center text-sm font-semibold ${
                  activeTab === tab ? 'text-white' : 'text-ink'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredDuas.length === 0 ? (
          <View className="px-5">
            <EmptyState
              title={activeTab === 'Personal' ? 'No personal duas' : 'No shared duas'}
              description={activeTab === 'Personal' ? 'Add your personal supplications' : 'Share a dua with your spouse'}
              icon="book-outline"
            />
          </View>
        ) : (
          <View className="px-5 gap-4 pb-4">
            {filteredDuas.map((dua) => (
              <DuaCard
                key={dua.id}
                dua={dua}
                onToggleAnswered={() => handleToggleAnswered(dua.id)}
                onDelete={() => handleDelete(dua.id)}
              />
            ))}
          </View>
        )}
      </ScreenWrapper>

      <TouchableOpacity
        onPress={() => router.push('/more/adddua')}
        activeOpacity={0.8}
        className="absolute bg-primary w-14 h-14 rounded-full items-center justify-center"
        style={{
          bottom: 20,
          right: 20,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Icon name="add" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default DuaScreen;
