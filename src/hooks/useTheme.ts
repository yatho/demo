import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'theme-preference';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return (raw as Theme) || 'system';
    } catch {
      return 'system';
    }
  });

  useEffect(() => {
    const apply = (t: Theme) => {
      const root = document.documentElement;
      const isDark = t === 'dark' || (t === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) root.classList.add('dark-theme');
      else root.classList.remove('dark-theme');
    };

    apply(theme);

    // Listen for system changes when theme === 'system'
    let mql: MediaQueryList | null = null;
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        if (e.matches) document.documentElement.classList.add('dark-theme');
        else document.documentElement.classList.remove('dark-theme');
      }
    };

    if (window.matchMedia) {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
      // Older browsers use addListener
      if (mql.addEventListener) mql.addEventListener('change', handleChange as any);
      else mql.addListener(handleChange as any);
    }

    return () => {
      if (mql) {
        if (mql.removeEventListener) mql.removeEventListener('change', handleChange as any);
        else mql.removeListener(handleChange as any);
      }
    };
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return {
    theme,
    setTheme: (t: Theme) => setTheme(t),
    toggle: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
  };
}
