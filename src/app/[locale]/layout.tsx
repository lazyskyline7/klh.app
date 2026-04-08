import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES, isValidLocale } from '@/lib/i18n';
import SettingsMenu from '@/components/SettingsMenu';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <SettingsMenu locale={locale} />
      {children}
    </>
  );
}
