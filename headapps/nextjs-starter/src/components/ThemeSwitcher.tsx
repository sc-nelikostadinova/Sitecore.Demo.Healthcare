'use client';

import React, { useEffect, useState } from 'react';

export const Default = (): JSX.Element => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = sessionStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(storedTheme === 'dark' || prefersDark);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="inline-block">
      <button
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        onClick={() => setIsDark(!isDark)}
        className={`
          w-13 h-7 p-0.5 rounded-full text-left
          bg-foreground dark:bg-foreground-dark
          transition-colors duration-300
        `}
      >
        <span
          className={`
            inline-block w-6 h-6 rounded-full
            bg-background dark:bg-background-dark dark:translate-x-6
            transition-all duration-300
          `}
        />
      </button>
    </div>
  );
};
