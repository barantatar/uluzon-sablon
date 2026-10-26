# Uluzon sektör şablonu

Acil servis işletmeleri (tesisat, elektrik, çilingir…) için tek sayfalık, telefona odaklı site motoru.

- `sektorler/<slug>.ts`: sektörün dili (hizmetler, sorunlar, süreç, SSS, renk).
- `firma.config.ts`: müşteriye özel bilgiler. Gerçek kurulumda yalnızca bu dosya değişir.

## Demo

`NEXT_PUBLIC_DEMO=1` ile yayınlanır (demo.uluzon.com), arama motorlarına kapalıdır:

```
/tesisat?firma=Yıldız Tesisat&tel=05321234567&ilce=Yenişehir
```

## Gerçek müşteri

`firma.config.ts` doldurulur (gerçek Google puanı ve yorumları dahil), `siteUrl` girilir, env olmadan yayınlanır. Site kökte açılır; schema.org verisi, sitemap ve robots otomatik üretilir.
