export interface Dua {
  id: string;
  title: string;
  content: string;
  category: string;
  answered: boolean;
  isShared: boolean;
}

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'outline';
export type CardVariant = 'white' | 'surface' | 'ink' | 'gradient' | 'glass' | 'elevated';
