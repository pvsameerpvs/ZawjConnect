import React from 'react';
import { View, Text } from 'react-native';
import {
  House, Moon, Book, Heart, Grid3X3, Hand, Settings, User, UserCircle,
  Bell, ShieldCheck, MapPin, Wallet, Utensils, Plane, Calendar, Search,
  CheckCircle, XCircle, PlusCircle, Trash2, Share2, Copy, ChevronRight,
  ChevronLeft, RefreshCw, BarChart3, Info, Link, Clock, Check, Flame,
  Trophy, Play, Star, Users, Eye, EyeOff, Globe, Circle, CheckSquare,
  Square, Plus, ArrowRight, Bookmark, Calculator, Repeat, Palette, Key,
  Mail, Gem, Briefcase, MinusCircle,
} from 'lucide-react-native';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; fill?: string }>> = {
  home: House, 'home-outline': House,
  moon: Moon, 'moon-outline': Moon,
  book: Book, 'book-outline': Book,
  heart: Heart, 'heart-outline': Heart,
  'heart-circle': Heart, 'heart-circle-outline': Heart,
  grid: Grid3X3, 'grid-outline': Grid3X3,
  'hand-left': Hand, 'hand-left-outline': Hand,
  settings: Settings, 'settings-outline': Settings,
  person: User, 'person-outline': User,
  'person-circle': UserCircle, 'person-circle-outline': UserCircle,
  notifications: Bell, 'notifications-outline': Bell,
  'shield-checkmark': ShieldCheck, 'shield-checkmark-outline': ShieldCheck,
  location: MapPin, 'location-outline': MapPin,
  wallet: Wallet, 'wallet-outline': Wallet,
  restaurant: Utensils, 'restaurant-outline': Utensils,
  airplane: Plane, 'airplane-outline': Plane,
  calendar: Calendar, 'calendar-outline': Calendar,
  search: Search,
  'checkmark-circle': CheckCircle, 'checkmark-circle-outline': CheckCircle,
  'close-circle': XCircle, 'close-circle-outline': XCircle,
  'add-circle': PlusCircle, 'add-circle-outline': PlusCircle,
  trash: Trash2, 'trash-outline': Trash2,
  share: Share2, 'share-outline': Share2,
  copy: Copy, 'copy-outline': Copy,
  'chevron-forward': ChevronRight, 'chevron-back': ChevronLeft,
  refresh: RefreshCw,
  'stats-chart': BarChart3,
  'information-circle-outline': Info, 'information-circle': Info,
  link: Link, 'link-outline': Link,
  'time-outline': Clock,
  checkmark: Check,
  flame: Flame,
  'trophy-outline': Trophy,
  play: Play,
  star: Star, 'star-outline': Star,
  'people-outline': Users,
  eye: Eye, 'eye-off': EyeOff,
  'globe-outline': Globe,
  'ellipse-outline': Circle,
  checkbox: CheckSquare, 'square-outline': Square,
  add: Plus, 'arrow-forward': ArrowRight,
  bookmark: Bookmark, 'bookmark-outline': Bookmark,
  'repeat-outline': Repeat,
  info: Info, time: Clock, check: Check,
  delete: Trash2, 'delete-outline': Trash2,
  'color-palette': Palette,
  'key-outline': Key,
  people: Users,
  mail: Mail,
  globe: Globe,
  man: User, 'man-outline': User, woman: User, 'woman-outline': User,
  'diamond-outline': Gem, 'briefcase-outline': Briefcase,
  'remove-circle-outline': MinusCircle,
  calculator: Calculator, 'calculator-outline': Calculator,
  dua: Hand, 'dua-outline': Hand,
  spouse: Heart, 'spouse-outline': Heart,
  privacy: ShieldCheck, 'privacy-outline': ShieldCheck,
  zakat: Wallet, 'zakat-outline': Wallet,
  fasting: Utensils, 'fasting-outline': Utensils,
  tahajjud: Moon, 'tahajjud-outline': Moon,
  hajj: Plane, 'hajj-outline': Plane,
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  fill?: string;
}

const GoogleLogo: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <View
    style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
  >
    <Text style={{ fontSize: size * 0.8, fontWeight: '700', color: '#4285F4' }}>G</Text>
  </View>
);

const DEFAULT_ICON_COLOR = '#0D9488';

const Icon: React.FC<IconProps> = ({ name, size = 20, color, fill }) => {
  if (name === 'logo-google') {
    return <GoogleLogo size={size} />;
  }

  const LucideIcon = iconMap[name];
  if (!LucideIcon) {
    return null;
  }

  const iconColor = color || DEFAULT_ICON_COLOR;
  if (fill) {
    return <LucideIcon size={size} color={iconColor} fill={fill} />;
  }
  return <LucideIcon size={size} color={iconColor} />;
};

export default Icon;
