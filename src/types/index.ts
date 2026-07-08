export interface User {
  name: string;
  email: string;
  city: string;
  country: string;
  role: 'Husband' | 'Wife';
  spouse: string;
}

export interface Spouse {
  name: string;
  city: string;
  country: string;
  role: 'Husband' | 'Wife';
}

export interface PrayerDay {
  name: string;
  time: string;
  completed: boolean;
}

export interface Surah {
  id: number;
  name: string;
  englishName: string;
  verses: number;
  revealed: string;
}

export interface Ayah {
  id: number;
  surah: string;
  ayah: number;
  arabic: string;
  english: string;
}

export interface DhikrItem {
  id: string;
  label: string;
  arabic: string;
  goal: number;
}

export interface Dua {
  id: string;
  title: string;
  content: string;
  category: string;
  answered: boolean;
  isShared: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface SpouseProgress {
  salah: { completed: number; total: number };
  quran: { ayahsToday: number };
  dhikr: { percentage: number };
  tahajjud: boolean;
  locationSharing: boolean;
}

export type ScreenBackground = 'surface' | 'ink' | 'white' | 'gradient';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';

export type CardVariant = 'white' | 'surface' | 'ink' | 'gradient' | 'glass';
