export type ThemeId = 'blue' | 'green' | 'white' | 'black';

export interface Theme {
  id: ThemeId;
  label: string;
  swatchColor: string;
  pageBg: string;
  cardBg: string;
  accent: string;
  accentRgb: string;
  text: string;
  textRgb: string;
  globeAccentRgb: string;
  globeBase1: string;
  globeBase2: string;
  globeBase3: string;
}

export const THEMES: Record<ThemeId, Theme> = {
  blue: {
    id: 'blue',
    label: 'Blue',
    swatchColor: '#001538',
    pageBg: '#001538',
    cardBg: 'rgba(0,10,32,0.85)',
    accent: '#5590e8',
    accentRgb: '85,144,232',
    text: '#dad7cd',
    textRgb: '218,215,205',
    globeAccentRgb: '85,144,232',
    globeBase1: '#0a1a3a',
    globeBase2: '#050e28',
    globeBase3: '#010614',
  },
  green: {
    id: 'green',
    label: 'Green',
    swatchColor: '#2d4a3e',
    pageBg: '#2d4a3e',
    cardBg: 'rgba(12,30,22,0.82)',
    accent: '#6BABA0',
    accentRgb: '107,171,160',
    text: '#dad7cd',
    textRgb: '218,215,205',
    globeAccentRgb: '107,171,160',
    globeBase1: '#1c4438',
    globeBase2: '#0e2820',
    globeBase3: '#040f0c',
  },
  white: {
    id: 'white',
    label: 'White',
    swatchColor: '#f0ede8',
    pageBg: '#f0ede8',
    cardBg: 'rgba(255,252,248,0.88)',
    accent: '#00388d',
    accentRgb: '0,56,141',
    text: '#1a1714',
    textRgb: '26,23,20',
    globeAccentRgb: '60,50,40',
    globeBase1: '#c8d4e8',
    globeBase2: '#dce6f4',
    globeBase3: '#eef3fa',
  },
  black: {
    id: 'black',
    label: 'Black',
    swatchColor: '#080808',
    pageBg: '#080808',
    cardBg: 'rgba(14,14,14,0.92)',
    accent: '#a0b8e8',
    accentRgb: '160,184,232',
    text: '#dad7cd',
    textRgb: '218,215,205',
    globeAccentRgb: '218,215,205',
    globeBase1: '#141414',
    globeBase2: '#0a0a0a',
    globeBase3: '#020202',
  },
};

export const THEME_IDS: ThemeId[] = ['blue', 'green', 'white', 'black'];
