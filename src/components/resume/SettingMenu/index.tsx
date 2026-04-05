'use client';
import { FC, useState, useRef, useEffect } from 'react';
import { MdSettings, MdClose } from 'react-icons/md';
import ThemeSwitcher from './ThemeSwitcher';
import PrintButton from './PrintButton';
import { sendGAEvent } from '@next/third-parties/google';
import Button from './Button';
import clsx from 'clsx';

const SettingsMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    sendGAEvent('event', 'settings_toggle', { state: newState ? 'open' : 'close' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="fixed top-4 right-4 z-50 print:hidden">
      <div
        className={clsx(
          'absolute top-12 right-0 flex origin-top-right flex-col gap-3 transition-all duration-300',
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-4 scale-95 opacity-0'
        )}
      >
        <ThemeSwitcher />
        <PrintButton />
      </div>

      <Button
        onClick={toggleMenu}
        title="Settings"
        aria-label="Settings"
        aria-expanded={isOpen}
      >
        <div className="relative size-6">
          <MdSettings
            className={clsx(
              'absolute inset-0 size-6 transition-all duration-300',
              isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
            )}
          />
          <MdClose
            className={clsx(
              'absolute inset-0 size-6 transition-all duration-300',
              isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
            )}
          />
        </div>
      </Button>
    </div>
  );
};

export default SettingsMenu;
