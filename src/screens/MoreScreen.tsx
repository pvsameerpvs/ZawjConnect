import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import GradientHeader from '../components/GradientHeader';
import MoreMenuCard from '../components/MoreMenuCard';
import { colors } from '../constants/colors';

const menuItems = [
  { title: 'Dua', icon: 'hand-left' as const, iconColor: colors.primary, route: 'Dua' },
  { title: 'Tahajjud', icon: 'moon' as const, iconColor: colors.ink, route: 'Tahajjud' },
  { title: 'Sunnah Fasting', icon: 'restaurant' as const, iconColor: colors.primary, route: 'Fasting' },
  { title: 'Zakat', icon: 'calculator' as const, iconColor: colors.accent, route: 'Zakat' },
  { title: 'Spouse', icon: 'people' as const, iconColor: colors.primary, route: 'Spouse' },
  { title: 'Live Location', icon: 'location' as const, iconColor: colors.primary, route: 'Location' },
  { title: 'Hajj & Umrah', icon: 'airplane' as const, iconColor: colors.ink, route: 'HajjUmrah' },
  { title: 'Notifications', icon: 'notifications' as const, iconColor: colors.accent, route: 'Notifications' },
  { title: 'Privacy', icon: 'shield-checkmark' as const, iconColor: colors.primary, route: 'Privacy' },
  { title: 'Settings', icon: 'settings' as const, iconColor: colors.muted, route: 'Settings' },
  { title: 'Profile', icon: 'person' as const, iconColor: colors.primary, route: 'Profile' },
];

const MoreScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="More" subtitle="All features" />
      <ScreenWrapper scroll background="surface" edges={['bottom']}>
        <View className="pt-5" style={{ gap: 0 }}>
          {menuItems.map((item, index) => (
            <MoreMenuCard
              key={index}
              title={item.title}
              icon={item.icon}
              iconColor={item.iconColor}
              onPress={() => navigation.navigate(item.route)}
            />
          ))}
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default MoreScreen;
