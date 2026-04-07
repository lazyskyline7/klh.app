import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider, ThemeScript } from '@klh-app/theme';
import './globals.css';
import { getThemeCSSVariables } from '@/theme';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'KL Hsu',
  description: 'Personal site — resume, blog, and experiments',
};

const themeCSSVariables = getThemeCSSVariables();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="print:hidden"
      lang="en"
      style={themeCSSVariables as React.CSSProperties}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript attribute="class" value={{ dark: 'dark' }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" value={{ dark: 'dark' }}>
          {children}
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
