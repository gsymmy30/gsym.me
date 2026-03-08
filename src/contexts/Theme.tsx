'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { THEMES, ThemeId, Theme } from '@/lib/themes';

const STORAGE_KEY = 'gs-theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES.blue,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty('--gs-bg', theme.pageBg);
  root.style.setProperty('--gs-card', theme.cardBg);
  root.style.setProperty('--gs-accent', theme.accent);
  root.style.setProperty('--gs-accent-rgb', theme.accentRgb);
  root.style.setProperty('--gs-text', theme.text);
  root.style.setProperty('--gs-text-rgb', theme.textRgb);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('blue');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    const id = saved && THEMES[saved] ? saved : 'blue';
    setThemeId(id);
    applyTheme(THEMES[id]);
  }, []);

  useEffect(() => {
    applyTheme(THEMES[themeId]);
  }, [themeId]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeId], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
