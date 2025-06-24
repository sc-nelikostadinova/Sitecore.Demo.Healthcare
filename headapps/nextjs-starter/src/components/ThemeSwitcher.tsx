'use client';

import React, { useEffect, useState } from 'react';

export const Default = (): JSX.Element => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = sessionStorage.getItem('theme');

    if (storedTheme === 'dark') {
      setIsDark(true);
    } else if (storedTheme === 'light') {
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      sessionStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <label className="inline-block leading-0">
      <label htmlFor="theme-switcher" className="sr-only">
        Switch theme
      </label>
      <input
        name="theme-switcher"
        id="theme-switcher"
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark((prev) => !prev)}
        className="peer opacity-0 w-0 h-0"
      />
      <span
        className={`relative inline-block w-12 h-6 rounded-xl bg-foreground border border-foreground cursor-pointer
          after:content-[''] after:absolute after:h-5 after:w-5 after:left-px after:bottom-1/2 after:translate-y-1/2
          after:bg-background after:rounded-full after:transition-transform after:duration-400
          peer-checked:bg-foreground-dark peer-checked:after:translate-x-6 peer-checked:after:bg-background-dark`}
      />
    </label>
  );
};
