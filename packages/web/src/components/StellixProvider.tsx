'use client';

import React, { createContext, useContext } from 'react';

export interface StellixTheme {
  colors?: Record<string, string | Record<string, string>>;
  shadows?: Record<string, string>;
  darkMode?: boolean;
}

const ThemeContext = createContext<StellixTheme>({});

export function useStellixTheme(): StellixTheme {
  return useContext(ThemeContext);
}

export interface StellixProviderProps {
  children: React.ReactNode;
  theme?: StellixTheme;
}

export function StellixProvider({ children, theme = {} }: StellixProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={theme.darkMode ? 'dark' : ''}
        data-theme={theme.darkMode ? 'dark' : 'light'}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
