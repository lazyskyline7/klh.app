'use client';
import { FC } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { sendGAEvent } from '@next/third-parties/google';
import { useTheme } from '@klh-app/theme';
import Button from './Button';
import clsx from 'clsx';

const ThemeSwitcher: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    sendGAEvent('event', 'theme_toggle', { theme: newTheme });
  };

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
