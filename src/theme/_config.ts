import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  primary: '#1E7F5C',
  primaryLight: '#E6F4EF',
  accentGreen: '#2FBF71',
  white: '#FFFFFF',
  background: '#F8FAF9',
  primaryText: '#0F172A',
  secondaryText: '#475569',
  mutedText: '#94A3B8',
  borderLight: '#E2E8F0',
  borderGreen: '#CFEDE3',
  success: '#16A34A',
  error: '#DC2626',
  warning: '#FACC15',
  info: '#0EA5E9'
} as const

const colorsDark = {
  primary: '#1E7F5C',
  primaryLight: '#E6F4EF',
  accentGreen: '#2FBF71',
  white: '#FFFFFF',
  background: '#F8FAF9',
  primaryText: '#0F172A',
  secondaryText: '#475569',
  mutedText: '#94A3B8',
  borderLight: '#E2E8F0',
  borderGreen: '#CFEDE3',
  success: '#16A34A',
  error: '#DC2626',
  warning: '#FACC15',
  info: '#0EA5E9'
} as const;

const sizes = [12, 14, 16, 24, 32, 40, 42, 70, 80] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 16],
    widths: [1, 2],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.background,
    card: colorsLight.background,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
      },
    },
  },
} as const satisfies ThemeConfiguration;
