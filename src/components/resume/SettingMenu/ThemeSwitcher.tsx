'use client';
import { FC, useEffect, useSyncExternalStore } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { sendGAEvent } from '@next/third-parties/google';
import Button from './Button';
import clsx from 'clsx';

type Theme = 'light' | 'dark';

const store = {
  getSnapshot() {
    return localStorage.getItem('theme');
  },
  getServerSnapshot(): string | null {
    return null;
  },
  subscribe(listener: () => void) {
    window.addEventListener('storage', listener);
    return () => void window.removeEventListener('storage', listener);
  },
  setTheme(theme: Theme) {
    window.localStorage.setItem('theme', theme);
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'theme', newValue: theme })
    );
  },
  toggleTheme() {
    let theme = this.getSnapshot();
    if (!theme) {
      theme = document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    }
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  },
} as const;

const ThemeSwitcher: FC = () => {
  const theme = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const handleToggle = () => {
    store.toggleTheme();
    const currentTheme =
      theme ||
      (typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light');
    sendGAEvent('event', 'theme_toggle', {
      theme: currentTheme === 'light' ? 'dark' : 'light',
    });
  };

  useEffect(() => {
    if (theme) {
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const iconClasses =
    'size-6 transition-all duration-300 group-hover:rotate-12 group-active:scale-90';

  return (
    <Button onClick={handleToggle} title="Toggle theme">
      <MdLightMode className={clsx(iconClasses, 'hidden dark:block')} />
      <MdDarkMode className={clsx(iconClasses, 'block dark:hidden')} />
    </Button>
  );
};

export default ThemeSwitcher;
