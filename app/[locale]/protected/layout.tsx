import TranslationsProvider from '@providers/translations-provider';
import initTranslations from 'app/i18n';
const i18nNamespaces = ['common'];

export default async function RootLayout({
  children,
  params: { locale = 'en' }
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      {children}
    </TranslationsProvider>
  );
}
