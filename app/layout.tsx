import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Fraunces, Inter } from 'next/font/google';

import { GeistSans } from 'geist/font/sans';
import { type Viewport, type Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { dir } from 'i18next';
import i18nConfig from '@/i18config';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-fraunces'
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-inter'
});

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Paramount',
  description: 'Paramount is a platform.'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
  params: { locale = 'en' }
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${inter.variable} ${fraunces.variable} ${GeistSans.className}`}
    >
      <body className="bg-background text-foreground">
        <main className="min-h-screen">{children}</main>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          progressClassName="bg-white"
          pauseOnHover
          className={'w-full sm:max-w-[22rem]'}
        />
      </body>
    </html>
  );
}
