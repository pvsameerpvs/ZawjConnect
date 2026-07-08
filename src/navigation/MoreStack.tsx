import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoreStackParamList } from './types';
import MoreScreen from '../screens/MoreScreen';
import DuaScreen from '../screens/dua/DuaScreen';
import AddDuaScreen from '../screens/dua/AddDuaScreen';
import TahajjudScreen from '../screens/tahajjud/TahajjudScreen';
import FastingScreen from '../screens/fasting/FastingScreen';
import ZakatScreen from '../screens/zakat/ZakatScreen';
import SpouseScreen from '../screens/spouse/SpouseScreen';
import InviteCodeScreen from '../screens/spouse/InviteCodeScreen';
import JoinInviteScreen from '../screens/spouse/JoinInviteScreen';
import LocationScreen from '../screens/location/LocationScreen';
import HajjUmrahScreen from '../screens/hajjumrah/HajjUmrahScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import PrivacyScreen from '../screens/settings/PrivacyScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';

const Stack = createNativeStackNavigator<MoreStackParamList>();

const MoreStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen name="Dua" component={DuaScreen} />
      <Stack.Screen name="AddDua" component={AddDuaScreen} />
      <Stack.Screen name="Tahajjud" component={TahajjudScreen} />
      <Stack.Screen name="Fasting" component={FastingScreen} />
      <Stack.Screen name="Zakat" component={ZakatScreen} />
      <Stack.Screen name="Spouse" component={SpouseScreen} />
      <Stack.Screen name="InviteCode" component={InviteCodeScreen} />
      <Stack.Screen name="JoinInvite" component={JoinInviteScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="HajjUmrah" component={HajjUmrahScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MoreStack;
