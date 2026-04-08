'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function FooterEasterEgg({
  name,
  quotes,
}: {
  name: string;
  quotes: string[];
}) {
  const [revealed, setRevealed] = useState(false);
  const [quote, setQuote] = useState('');

  const handleClick = () => {
    if (revealed) {
      setRevealed(false);
    } else {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setRevealed(true);
    }
  };

  return (
    <footer className="mt-12 text-center">
      <button
        onClick={handleClick}
        className="cursor-pointer select-none border-none bg-transparent"
      >
        <p className="text-[10px] text-slate-300 transition-colors hover:text-slate-400 dark:text-slate-700 dark:hover:text-slate-600">
          © {new Date().getFullYear()} {name}
        </p>
      </button>
      <p
        className={clsx(
          'mt-2 text-[10px] italic transition-all duration-500',
          revealed
            ? 'translate-y-0 text-slate-400 opacity-100 dark:text-slate-500'
            : 'pointer-events-none -translate-y-1 opacity-0'
        )}
      >
        &ldquo;{quote}&rdquo;
      </p>
    </footer>
  );
}
