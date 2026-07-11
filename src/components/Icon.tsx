import React from 'react';
import { View, Text } from 'react-native';
import {
  House, Moon, Book, Heart, Grid3X3, Hand, Settings, User, UserCircle,
  Bell, ShieldCheck, MapPin, Wallet, Utensils, Plane, Calendar, Search,
  CheckCircle, XCircle, PlusCircle, Trash2, Share2, Copy, ChevronRight,
  ChevronLeft, RefreshCw, BarChart3, Info, Link, Clock, Check, Flame,
  Trophy, Play, Star, Users, Eye, EyeOff, Globe, Circle, CheckSquare,
  Square, Plus, ArrowRight, Bookmark, Calculator, Repeat, Palette, Key,
  Mail, Gem, Briefcase, MinusCircle, ShoppingCart, MessageCircle,
  TrendingUp, List, UserPlus, Send, MoreHorizontal, Pencil, Camera,
  SlidersHorizontal, Receipt, Download, Minus, ShoppingBag, Coins, Zap,
  ArrowLeft, ArrowUpRight, CreditCard, Gift, Leaf, Target,
} from 'lucide-react-native';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  home: House,
  moon: Moon, book: Book, heart: Heart, grid: Grid3X3,
  hand: Hand, settings: Settings, person: User, 'person-circle': UserCircle,
  notifications: Bell, shield: ShieldCheck, location: MapPin,
  wallet: Wallet, restaurant: Utensils, airplane: Plane,
  calendar: Calendar, search: Search,
  'check-circle': CheckCircle, 'x-circle': XCircle, 'plus-circle': PlusCircle,
  trash: Trash2, share: Share2, copy: Copy,
  chevron: ChevronRight, 'chevron-back': ChevronLeft,
  refresh: RefreshCw, chart: BarChart3, info: Info, link: Link, clock: Clock,
  check: Check, flame: Flame, trophy: Trophy, play: Play, star: Star,
  users: Users, eye: Eye, 'eye-off': EyeOff, globe: Globe, circle: Circle,
  checkbox: CheckSquare, square: Square, add: Plus, arrow: ArrowRight,
  bookmark: Bookmark, repeat: Repeat, palette: Palette, key: Key,
  mail: Mail, gem: Gem, briefcase: Briefcase, minus: MinusCircle,
  calculator: Calculator, cart: ShoppingCart, chat: MessageCircle,
  trending: TrendingUp, list: List, 'user-plus': UserPlus, send: Send,
  more: MoreHorizontal, edit: Pencil, camera: Camera,
  filter: SlidersHorizontal, receipt: Receipt, download: Download,
  'shopping-bag': ShoppingBag, coins: Coins, zap: Zap,
  arrow: ArrowLeft, 'arrow-up-right': ArrowUpRight,
  card: CreditCard, gift: Gift, leaf: Leaf, target: Target,
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const GoogleLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: size * 0.7, fontWeight: '800', color: '#4285F4', letterSpacing: -1 }}>G</Text>
  </View>
);

const ICON_COLOR = '#0F9D8A';

const Icon: React.FC<IconProps> = ({ name, size = 20, color }) => {
  if (name === 'google') return <GoogleLogo size={size} />;
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} color={color || ICON_COLOR} />;
};

export default Icon;
