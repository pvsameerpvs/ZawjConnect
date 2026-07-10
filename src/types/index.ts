export interface Dua {
  id: string;
  title: string;
  content: string;
  category: string;
  answered: boolean;
  isShared: boolean;
}

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';

export type CardVariant = 'white' | 'surface' | 'ink' | 'gradient' | 'glass';
