const { hairlineWidth, platformSelect } = require('nativewind/theme');

module.exports = {
  darkMode: 'class',
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0F9D8A',
        'primary-light': '#14B8A6',
        'primary-dark': '#0D7F6E',
        secondary: '#3B82F6',
        accent: '#F59E6B',
        'accent-light': '#FDE6D5',
        'accent-dark': '#D9773E',
        surface: '#F8FAFC',
        'surface-light': '#FFFFFF',
        ink: '#111827',
        'ink-light': '#6B7280',
        muted: '#9CA3AF',
        border: '#E5E7EB',
        'border-light': '#F3F4F6',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        border: withOpacity('border'),
        input: withOpacity('input'),
        ring: withOpacity('ring'),
        background: withOpacity('background'),
        foreground: withOpacity('foreground'),
        destructive: {
          DEFAULT: withOpacity('destructive'),
          foreground: withOpacity('destructive-foreground'),
        },
        muted: {
          DEFAULT: withOpacity('muted'),
          foreground: withOpacity('muted-foreground'),
        },
        accent: {
          DEFAULT: withOpacity('accent'),
          foreground: withOpacity('accent-foreground'),
        },
        card: {
          DEFAULT: withOpacity('card'),
          foreground: withOpacity('card-foreground'),
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '85': '0.85',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'title': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading': ['24px', { lineHeight: '32px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'subheading': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', letterSpacing: '0em', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '20px', letterSpacing: '0.015em', fontWeight: '500' }],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.04)',
        'md': '0 4px 16px rgba(0,0,0,0.06)',
        'lg': '0 8px 32px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return platformSelect({
        ios: `rgb(var(--${variableName}) / ${opacityValue})`,
        android: `rgb(var(--android-${variableName}) / ${opacityValue})`,
      });
    }
    return platformSelect({
      ios: `rgb(var(--${variableName}))`,
      android: `rgb(var(--android-${variableName}))`,
    });
  };
}
