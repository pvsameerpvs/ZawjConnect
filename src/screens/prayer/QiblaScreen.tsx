import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { mockLocation, mockQiblaDirection } from '../../constants/mockData';
import ScreenWrapper from '../../components/ScreenWrapper';
import IslamicCard from '../../components/IslamicCard';
import AppButton from '../../components/AppButton';

const COMPASS_SIZE = 260;
const RING_SIZE = 220;
const NEEDLE_HEIGHT = 90;

const QiblaScreen: React.FC = () => {
  const handleRefresh = () => {
    Alert.alert('Location', 'Qibla direction refreshed');
  };

  return (
    <ScreenWrapper background="surface" scroll withPadding>
      <View className="pt-2 items-center">
        <View className="items-center justify-center mb-8" style={{ height: COMPASS_SIZE + 40 }}>
          <View
            className="rounded-full items-center justify-center"
            style={{
              width: COMPASS_SIZE,
              height: COMPASS_SIZE,
              backgroundColor: colors.white,
              borderWidth: 2,
              borderColor: colors.border,
              shadowColor: colors.ink,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 6,
            }}
          >
            <LinearGradient
              colors={[colors.surface, colors.surface]}
              className="rounded-full items-center justify-center"
              style={{ width: COMPASS_SIZE - 16, height: COMPASS_SIZE - 16 }}
            >
              <View
                className="rounded-full items-center justify-center"
                style={{
                  width: RING_SIZE,
                  height: RING_SIZE,
                  borderWidth: 1.5,
                  borderColor: colors.accent + '40',
                }}
              >
                <Text
                  className="absolute font-bold text-ink"
                  style={{ top: 10, fontSize: 13 }}
                >N</Text>
                <Text
                  className="absolute font-bold text-ink"
                  style={{ bottom: 10, fontSize: 13 }}
                >S</Text>
                <Text
                  className="absolute font-bold text-ink"
                  style={{ right: 10, fontSize: 13 }}
                >E</Text>
                <Text
                  className="absolute font-bold text-ink"
                  style={{ left: 10, fontSize: 13 }}
                >W</Text>

                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <View
                    key={angle}
                    className="absolute w-[1px]"
                    style={{
                      height: angle % 90 === 0 ? 14 : 8,
                      backgroundColor: angle % 90 === 0 ? colors.ink + '60' : colors.ink + '30',
                      transform: [{ rotate: `${angle}deg` }],
                      top: RING_SIZE / 2 - (angle % 90 === 0 ? 14 : 8),
                    }}
                  />
                ))}

                <View
                  className="absolute items-center justify-center"
                  style={{
                    transform: [{ rotate: '42deg' }],
                    top: RING_SIZE / 2 - NEEDLE_HEIGHT - 8,
                  }}
                >
                  <View
                    style={{
                      width: 4,
                      height: NEEDLE_HEIGHT,
                      backgroundColor: colors.accent,
                      borderRadius: 2,
                    }}
                  />
                  <Ionicons name="location-sharp" size={20} color={colors.accent} style={{ marginTop: -2 }} />
                </View>

                <View className="absolute w-4 h-4 rounded-full bg-ink items-center justify-center">
                  <View className="w-2 h-2 rounded-full bg-accent" />
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <IslamicCard variant="gradient" className="w-full mb-6">
          <View className="items-center">
            <Text className="text-surface/60 text-xs font-semibold uppercase tracking-wider mb-2">Qibla Direction</Text>
            <Text className="text-accent text-5xl font-bold">{mockQiblaDirection}</Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="location-outline" size={16} color={colors.surface + '80'} />
              <Text className="text-surface/70 text-sm ml-1">{mockLocation}</Text>
            </View>
          </View>
        </IslamicCard>

        <IslamicCard variant="white" className="w-full mb-6">
          <View className="flex-row items-start">
            <View className="w-8 h-8 rounded-full bg-accent/20 items-center justify-center mr-3">
              <Ionicons name="information" size={16} color={colors.accent} />
            </View>
            <View className="flex-1">
              <Text className="text-ink font-semibold text-sm mb-1">About Qibla</Text>
              <Text className="text-muted text-xs leading-5">
                The Qibla is the direction of the Kaaba in Mecca, Saudi Arabia. Muslims face this direction during prayer and other religious acts.
              </Text>
            </View>
          </View>
        </IslamicCard>

        <AppButton
          title="Refresh Direction"
          variant="primary"
          onPress={handleRefresh}
          icon={<Ionicons name="refresh" size={20} color={colors.white} />}
          className="w-full mb-4"
        />
      </View>
    </ScreenWrapper>
  );
};

export default QiblaScreen;
