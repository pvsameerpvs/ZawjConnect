import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import IslamicCard from '../../components/IslamicCard';
import GradientHeader from '../../components/GradientHeader';
import EmptyState from '../../components/EmptyState';
import { colors } from '../../constants/colors';
import { mockAyahs } from '../../constants/mockData';
import { Ayah } from '../../types';

const QuranBookmarksScreen: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Ayah[]>([mockAyahs[0], mockAyahs[1]]);

  const removeBookmark = (id: number) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  if (bookmarks.length === 0) {
    return (
      <View className="flex-1 bg-surface">
        <GradientHeader title="Bookmarked Ayahs" />
        <ScreenWrapper background="surface" edges={['bottom']}>
          <EmptyState
            title="No bookmarks yet"
            description="Start reading Quran and bookmark your favorite ayahs."
            icon="bookmark-outline"
          />
        </ScreenWrapper>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Bookmarked Ayahs" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5 pb-4 gap-3">
          {bookmarks.map((ayah) => (
            <IslamicCard key={ayah.id}>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs text-accent font-semibold">
                  {ayah.surah} · Ayah {ayah.ayah}
                </Text>
                <TouchableOpacity onPress={() => removeBookmark(ayah.id)} activeOpacity={0.7}>
                  <Ionicons name="bookmark" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <Text className="text-lg text-right font-medium text-ink mb-1" style={{ fontFamily: 'serif' }}>
                {ayah.arabic}
              </Text>
              <Text className="text-sm text-muted leading-relaxed">{ayah.english}</Text>
            </IslamicCard>
          ))}
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default QuranBookmarksScreen;
