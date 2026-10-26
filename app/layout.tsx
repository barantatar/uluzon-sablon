import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { FIRMA } from '@/firma.config';
import { DEMO } from '@/lib/firma';
import { govde } from './yazitipi';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: FIRMA.siteUrl && !DEMO ? new URL(FIRMA.siteUrl) : undefined,
  // Demo kurulumu hiçbir zaman arama motorlarına açılmaz.
  robots: DEMO ? { index: false, follow: false } : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

// Gerçek kullanıcı hız ölçümü yalnızca Vercel'de çalışır (yerelde script yoktur).
const HIZ_OLCUMU = process.env.VERCEL === '1';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={govde.variable}>
      <body>
        {children}
        {HIZ_OLCUMU && <SpeedInsights />}
      </body>
    </html>
  );
}
