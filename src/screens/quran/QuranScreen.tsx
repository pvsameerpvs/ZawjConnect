import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import IslamicCard from '../../components/IslamicCard';
import GradientHeader from '../../components/GradientHeader';
import SectionHeader from '../../components/SectionHeader';
import QuranProgressCard from '../../components/QuranProgressCard';
import { colors } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { mockQuranProgress, mockSurahs, mockAyahs } from '../../constants/mockData';
import { QuranStackParamList } from '../../navigation/types';

type QuranNavigationProp = NativeStackNavigationProp<QuranStackParamList, 'Quran'>;

const QuranScreen: React.FC = () => {
  const navigation = useNavigation<QuranNavigationProp>();
  const [search, setSearch] = useState('');

  const filteredSurahs = mockSurahs.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.englishName.toLowerCase().includes(search.toLowerCase())
  );

  const bookmarkedAyahs = [mockAyahs[0], mockAyahs[1]];

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Al-Quran" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5" style={{ gap: 0 }}>
          <QuranProgressCard
            surah={mockQuranProgress.currentSurah}
            ayah={mockQuranProgress.lastAyah}
            completed={mockQuranProgress.completedToday}
            goal={mockQuranProgress.dailyGoal}
            onPress={() => navigation.navigate(ROUTES.QURAN_READER as 'QuranReader', {})}
          />

          <View className="mt-4">
            <AppInput
              icon="search"
              placeholder="Search surah..."
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View className="mt-2">
            <AppButton
              title="Continue Reading"
              variant="primary"
              icon={<Ionicons name="play" size={16} color="white" />}
              onPress={() => navigation.navigate(ROUTES.QURAN_READER as 'QuranReader', {})}
            />
          </View>

          <View className="mt-6">
            <SectionHeader title="Surahs" />
          </View>

          {filteredSurahs.map((surah) => (
            <View key={surah.id} className="mb-3">
              <IslamicCard
                onPress={() => navigation.navigate(ROUTES.QURAN_READER as 'QuranReader', { surahId: surah.id })}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                    <Text className="text-sm font-bold text-primary">{surah.id}</Text>
                  </View>
                  <View className="flex-1 ml-3">
                    <Text className="text-base font-semibold text-ink">{surah.name}</Text>
                    <Text className="text-xs text-muted">{surah.englishName} · {surah.verses} verses · {surah.revealed}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.muted} />
                </View>
              </IslamicCard>
            </View>
          ))}

          <View className="mt-6">
            <SectionHeader
              title="Bookmarks"
              actionLabel="View All"
              onActionPress={() => navigation.navigate(ROUTES.QURAN_BOOKMARKS as 'QuranBookmarks')}
            />
          </View>

          {bookmarkedAyahs.map((ayah) => (
            <View key={ayah.id} className="mb-3">
              <IslamicCard>
                <Text className="text-xs text-accent font-semibold mb-1">
                  {ayah.surah} · Ayah {ayah.ayah}
                </Text>
                <Text className="text-lg text-right font-medium text-ink mb-1" style={{ fontFamily: 'serif' }}>
                  {ayah.arabic}
                </Text>
                <Text className="text-sm text-muted">{ayah.english}</Text>
              </IslamicCard>
            </View>
          ))}
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default QuranScreen;
