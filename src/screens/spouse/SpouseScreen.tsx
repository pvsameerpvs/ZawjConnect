import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { mockUser, mockSpouse, mockSpouseProgress } from '../../constants/mockData';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import IslamicCard from '../../components/IslamicCard';
import GradientHeader from '../../components/GradientHeader';
import SectionHeader from '../../components/SectionHeader';
import ProgressBar from '../../components/ProgressBar';
import ProgressRing from '../../components/ProgressRing';

const SpouseScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Spouse" subtitle={`Connected with ${mockSpouse.name}`} />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5 gap-4">
          <IslamicCard>
            <View className="flex-row items-center">
              <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center border-2 border-accent/30">
                <Text className="text-3xl font-bold text-primary">
                  {mockSpouse.name.charAt(0)}
                </Text>
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-xl font-bold text-ink">{mockSpouse.name}</Text>
                <Text className="text-sm text-muted mt-0.5">
                  {mockSpouse.city}, {mockSpouse.country}
                </Text>
                <View className="flex-row items-center mt-1.5">
                  <View className="bg-primary/10 px-3 py-0.5 rounded-full">
                    <Text className="text-xs font-semibold text-primary">{mockSpouse.role}</Text>
                  </View>
                </View>
              </View>
            </View>
          </IslamicCard>

          <SectionHeader title="Shared Progress" />

          <IslamicCard>
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mr-4">
                <Icon name="moon-outline" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1.5">
                  <Text className="text-sm font-semibold text-ink">Salah</Text>
                  <Text className="text-xs text-muted">
                    {mockSpouseProgress.salah.completed}/{mockSpouseProgress.salah.total} completed
                  </Text>
                </View>
                <ProgressBar
                  progress={mockSpouseProgress.salah.completed / mockSpouseProgress.salah.total}
                />
              </View>
            </View>
          </IslamicCard>

          <IslamicCard>
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-ink/10 items-center justify-center mr-4">
                <Icon name="book-outline" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-ink">Quran</Text>
                <Text className="text-xs text-muted mt-0.5">
                  {mockSpouseProgress.quran.ayahsToday} ayahs today
                </Text>
                <View className="mt-2">
                  <ProgressBar
                    progress={Math.min(mockSpouseProgress.quran.ayahsToday / 20, 1)}
                  />
                </View>
              </View>
            </View>
          </IslamicCard>

          <IslamicCard>
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-accent/10 items-center justify-center mr-4">
                <Icon name="repeat-outline" size={20} color={colors.accent} />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-ink mb-2">Dhikr</Text>
                <ProgressRing
                  progress={mockSpouseProgress.dhikr.percentage / 100}
                  size={64}
                  strokeWidth={5}
                />
              </View>
            </View>
          </IslamicCard>

          <IslamicCard>
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mr-4">
                <Icon
                  name={mockSpouseProgress.tahajjud ? 'checkmark-circle' : 'time-outline'}
                  size={20}
                  color={mockSpouseProgress.tahajjud ? colors.success : colors.muted}
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-ink">Tahajjud</Text>
                <View className="flex-row items-center mt-0.5">
                  <View
                    className={`px-2.5 py-0.5 rounded-full ${
                      mockSpouseProgress.tahajjud ? 'bg-success/10' : 'bg-surface'
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        mockSpouseProgress.tahajjud ? 'text-success' : 'text-muted'
                      }`}
                    >
                      {mockSpouseProgress.tahajjud ? 'Completed' : 'Pending'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </IslamicCard>

          <IslamicCard>
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mr-4">
                <Icon
                  name="location-outline"
                  size={20}
                  color={colors.primary}
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-ink">Location Sharing</Text>
                <View className="flex-row items-center mt-0.5">
                  <View
                    className={`px-2.5 py-0.5 rounded-full ${
                      mockSpouseProgress.locationSharing ? 'bg-success/10' : 'bg-surface'
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        mockSpouseProgress.locationSharing ? 'text-success' : 'text-muted'
                      }`}
                    >
                      {mockSpouseProgress.locationSharing ? 'Enabled' : 'Disabled'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </IslamicCard>

          <AppButton
            title="Generate Invite Card"
            variant="secondary"
            onPress={() => navigation.navigate('InviteCode')}
          />

          <AppButton
            title="Join with Code"
            variant="ghost"
            onPress={() => navigation.navigate('JoinInvite')}
          />
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default SpouseScreen;
