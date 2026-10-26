import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Reklamdan gelen ziyaretçi ilk kez gelir: CSS'i HTML'e gömmek ilk boyamayı hızlandırır.
  experimental: { inlineCss: true },
  async rewrites() {
    if (process.env.NEXT_PUBLIC_DEMO !== '1') return [];
    // Demo: /tesisat/... adresleri kişiselleştirilebilen dinamik demo sayfasına gider.
    return {
      beforeFiles: [{ source: '/:sektor((?!demo$|_next$|icon$)[a-z-]+)/:yol*', destination: '/demo/:sektor/:yol*' }],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
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
