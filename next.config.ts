import type { NextConfig } from 'next';
import { FIRMA } from './firma.config';

// İçerik güvenlik politikası: sayfa yalnızca kendi dosyalarını ve onaydan sonra yüklenen
// ölçüm servislerini (Google, Meta) çalıştırabilir. Next.js satır içi script kullandığı için
// 'unsafe-inline' gerekir; geliştirme modu ayrıca 'unsafe-eval' ister.
const GOOGLE = 'https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.google.com.tr';
const META = 'https://connect.facebook.net https://www.facebook.com';
// Uluzon paneli sayacı (components/sayac.tsx) olayları bu adrese yollar
const PANEL = FIRMA.panel ? new URL(FIRMA.panel.adres ?? 'https://uluzon.com').origin : '';
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} ${GOOGLE} ${META}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${GOOGLE} ${META}`,
  "font-src 'self'",
  `connect-src 'self' ${GOOGLE} ${META} ${PANEL}`.trim(),
  'frame-src https://td.doubleclick.net https://www.googletagmanager.com',
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Reklamdan gelen ziyaretçi ilk kez gelir: CSS'i HTML'e gömmek ilk boyamayı hızlandırır.
  experimental: { inlineCss: true },
  async rewrites() {
    if (process.env.NEXT_PUBLIC_DEMO !== '1') return [];
    // Demo: /tesisat/... adresleri kişiselleştirilebilen dinamik demo sayfasına gider.
    // public/ altındaki klasörler (hero fotoğrafları) bu kurala takılmasın diye hariç tutulur. Bakış ileriye doğru tüm yolu
    // gördüğü için bölüm sonu "/" ya da yolun sonu olarak yazılır (yalnızca "$" yazılırsa /hero/... yine yakalanır).
    return {
      beforeFiles: [{ source: '/:sektor((?!(?:demo|_next|icon|hero)(?:/|$))[a-z-]+)/:yol*', destination: '/demo/:sektor/:yol*' }],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: CSP },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
