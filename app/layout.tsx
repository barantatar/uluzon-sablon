import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { DEMO } from '@/lib/firma';
import './globals.css';

const govde = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-govde',
  display: 'swap',
});

export const metadata: Metadata = {
  // Demo kurulumu hiçbir zaman arama motorlarına açılmaz.
  robots: DEMO ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={govde.variable}>
      <body>{children}</body>
    </html>
  );
}
