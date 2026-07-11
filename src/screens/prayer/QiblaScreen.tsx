import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from '../../components/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { mockLocation, mockQiblaDirection } from '../../constants/mockData';

const COMPASS_SIZE = 260;
const RING_SIZE = 220;
const NEEDLE_HEIGHT = 90;

const QiblaScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="flex-1 px-6 pt-8 items-center" style={{ gap: 24 }}>
        <View className="items-center justify-center" style={{ height: COMPASS_SIZE + 40 }}>
          <View className="rounded-full items-center justify-center"
            style={{ width: COMPASS_SIZE, height: COMPASS_SIZE, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border,
              shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 24, elevation: 8 }}
          >
            <LinearGradient colors={[colors.surface, colors.white]} className="rounded-full items-center justify-center"
              style={{ width: COMPASS_SIZE - 16, height: COMPASS_SIZE - 16 }}
            >
              <View className="rounded-full items-center justify-center"
                style={{ width: RING_SIZE, height: RING_SIZE, borderWidth: 1.5, borderColor: colors.accent + '40' }}
              >
                <Text className="absolute font-bold text-[#111827]" style={{ top: 10, fontSize: 13 }}>N</Text>
                <Text className="absolute font-bold text-[#111827]" style={{ bottom: 10, fontSize: 13 }}>S</Text>
                <Text className="absolute font-bold text-[#111827]" style={{ right: 10, fontSize: 13 }}>E</Text>
                <Text className="absolute font-bold text-[#111827]" style={{ left: 10, fontSize: 13 }}>W</Text>
                {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                  <View key={angle} className="absolute w-[1px]"
                    style={{ height: angle % 90 === 0 ? 14 : 8, backgroundColor: angle % 90 === 0 ? '#11182799' : '#11182750',
                      transform: [{ rotate: `${angle}deg` }], top: RING_SIZE / 2 - (angle % 90 === 0 ? 14 : 8) }}
                  />
                ))}
                <View className="absolute items-center justify-center"
                  style={{ transform: [{ rotate: '42deg' }], top: RING_SIZE / 2 - NEEDLE_HEIGHT - 8 }}
                >
                  <View style={{ width: 4, height: NEEDLE_HEIGHT, backgroundColor: colors.accent, borderRadius: 2 }} />
                  <View style={{ marginTop: -2 }}><Icon name="location" size={20} color={colors.accent} /></View>
                </View>
                <View className="absolute w-4 h-4 rounded-full bg-[#111827] items-center justify-center">
                  <View className="w-2 h-2 rounded-full bg-accent" />
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-6 w-full items-center"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          <Text className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Qibla Direction</Text>
          <Text className="text-primary text-[44px] font-bold tracking-tight">{mockQiblaDirection}</Text>
          <View className="flex-row items-center mt-1">
            <Icon name="location" size={16} color='#9CA3AF' />
            <Text className="text-[#6B7280] text-[14px] font-medium ml-1">{mockLocation}</Text>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-5 w-full"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          <View className="flex-row gap-4">
            <View className="w-10 h-10 rounded-2xl bg-accent/15 items-center justify-center">
              <Icon name="info" size={20} color='#F59E6B' />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-bold text-[#111827] tracking-tight mb-1.5">About Qibla</Text>
              <Text className="text-[12px] text-[#6B7280] leading-6">The Qibla is the direction of the Kaaba in Mecca, Saudi Arabia. Muslims face this direction during prayer and other religious acts.</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => Alert.alert('Location', 'Qibla direction refreshed')} activeOpacity={0.85}
          className="h-[54px] rounded-2xl bg-primary items-center justify-center flex-row w-full"
          style={{ shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
        >
          <Icon name="refresh" size={20} color='#FFFFFF' />
          <Text className="text-white text-[15px] font-bold ml-2">Refresh Direction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QiblaScreen;
