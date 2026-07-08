import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Icon from '../../components/Icon';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import GradientHeader from '../../components/GradientHeader';
import ProgressBar from '../../components/ProgressBar';
import { colors } from '../../constants/colors';
import { mockAyahs } from '../../constants/mockData';
import { QuranStackParamList } from '../../navigation/types';

type QuranReaderNavigationProp = NativeStackNavigationProp<QuranStackParamList, 'QuranReader'>;
type QuranReaderRouteProp = RouteProp<QuranStackParamList, 'QuranReader'>;

const QuranReaderScreen: React.FC = () => {
  const navigation = useNavigation<QuranReaderNavigationProp>();
  const route = useRoute<QuranReaderRouteProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const ayah = mockAyahs[currentIndex];
  const totalAyahs = mockAyahs.length;
  const progress = totalAyahs > 0 ? (currentIndex + 1) / totalAyahs : 0;

  const goNext = () => {
    if (currentIndex < totalAyahs - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader
        title={ayah.surah}
        subtitle={`Ayah ${currentIndex + 1} of ${totalAyahs}`}
        rightIcon={
          <TouchableOpacity onPress={() => setBookmarked(!bookmarked)} activeOpacity={0.7}>
            <Icon
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        }
      />

      <ScreenWrapper background="surface" edges={['bottom']}>
      <View className="flex-1 px-5 pt-8">
        <View className="flex-1 justify-center">
          <Text className="text-2xl text-right font-medium text-ink leading-relaxed mb-6" style={{ fontFamily: 'serif' }}>
            {ayah.arabic}
          </Text>
          <View className="h-px bg-border mb-4" />
          <Text className="text-sm text-muted leading-relaxed">
            {ayah.english}
          </Text>
        </View>

        <View className="mb-6">
          <ProgressBar
            progress={progress}
            label={`Ayah ${currentIndex + 1} of ${totalAyahs}`}
            showPercentage
            color={colors.primary}
          />
        </View>

        <View className="flex-row items-center justify-between pb-6">
          <AppButton
            title="Previous"
            variant="ghost"
            icon={<Icon name="chevron-back" size={16} color={currentIndex === 0 ? colors.muted : colors.primary} />}
            onPress={goPrev}
            disabled={currentIndex === 0}
            className={currentIndex === 0 ? 'opacity-40' : ''}
            textClassName={currentIndex === 0 ? 'text-mutedLight' : ''}
          />
          <AppButton
            title="Next"
            variant="ghost"
            icon={<Icon name="chevron-forward" size={16} color={currentIndex === totalAyahs - 1 ? colors.muted : colors.primary} />}
            onPress={goNext}
            disabled={currentIndex === totalAyahs - 1}
            className={currentIndex === totalAyahs - 1 ? 'opacity-40' : ''}
            textClassName={currentIndex === totalAyahs - 1 ? 'text-mutedLight' : ''}
          />
        </View>
      </View>
      </ScreenWrapper>
    </View>
  );
};

export default QuranReaderScreen;
