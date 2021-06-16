import React, { useState, createContext } from 'react';

export const ThemeContext: any = createContext('theme-amber');
// eslint-disable-next-line react/display-name
export default ({ children }: { children: any }) => {
  const [theme, setTheme] = useState<string>('theme-amber');

  const defaultContext: any = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={defaultContext}>
      {children}
    </ThemeContext.Provider>
  );
};
