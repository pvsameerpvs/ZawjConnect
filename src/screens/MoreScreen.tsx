import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import MoreMenuCard from '../components/MoreMenuCard';

const menuItems = [
  { title: 'Dua', icon: 'hand', color: '#0F9D8A', route: 'dua' },
  { title: 'Tahajjud', icon: 'moon', color: '#0F9D8A', route: 'tahajjud' },
  { title: 'Sunnah Fasting', icon: 'restaurant', color: '#0F9D8A', route: 'fasting' },
  { title: 'Zakat', icon: 'calculator', color: '#F59E6B', route: 'zakat' },
  { title: 'Spouse', icon: 'users', color: '#0F9D8A', route: 'spouse' },
  { title: 'Live Location', icon: 'location', color: '#0F9D8A', route: 'location' },
  { title: 'Hajj & Umrah', icon: 'airplane', color: '#F59E6B', route: 'hajjumrah' },
  { title: 'Notifications', icon: 'notifications', color: '#F59E6B', route: 'notifications' },
  { title: 'Privacy', icon: 'shield', color: '#0F9D8A', route: 'privacy' },
  { title: 'Settings', icon: 'settings', color: '#6B7280', route: 'settings' },
  { title: 'Profile', icon: 'person', color: '#0F9D8A', route: 'profile' },
];

const MoreScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ padding: 24, paddingTop: 20, paddingBottom: 100 }}>
        <View style={{ gap: 10 }}>
          {menuItems.map((item, index) => (
            <MoreMenuCard key={index} title={item.title} icon={item.icon} iconColor={item.color}
              onPress={() => router.push('/more/' + item.route.toLowerCase())}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;
