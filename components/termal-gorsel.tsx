// Termal kamera görüntüsünü temsil eden hafif SVG. Gerçek bir ölçüm değildir.
export default function TermalGorsel() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-label="Termal kamerada duvar içindeki kaçak noktasının temsilî görüntüsü" className="block h-auto w-full">
      <defs>
        <linearGradient id="t-zemin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e1b4b" />
          <stop offset="0.55" stopColor="#312e81" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="t-boru" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="t-sicak">
          <stop offset="0" stopColor="#fef08a" />
          <stop offset="0.25" stopColor="#fb923c" />
          <stop offset="0.55" stopColor="#ef4444" stopOpacity="0.75" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <filter id="t-bulanik" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <pattern id="t-fayans" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" fill="none" stroke="#fff" strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill="url(#t-zemin)" />
      <path d="M-10 200H150Q170 200 170 180V120Q170 100 190 100H410" fill="none" stroke="url(#t-boru)" strokeWidth="16" strokeOpacity="0.55" filter="url(#t-bulanik)" />
      <circle cx="262" cy="104" r="78" fill="url(#t-sicak)" filter="url(#t-bulanik)" />
      <rect width="400" height="260" fill="url(#t-fayans)" />
      <g stroke="#fff" strokeWidth="1.5" fill="none">
        <circle cx="262" cy="104" r="18" />
        <path d="M262 76v14M262 118v14M234 104h14M276 104h14" />
      </g>
      <g>
        <rect x="292" y="132" width="96" height="26" rx="13" fill="#fff" />
        <text x="340" y="149.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Kaçak noktası</text>
      </g>
      <g fontSize="11" fill="#fff" fillOpacity="0.85" fontWeight="600">
        <text x="16" y="24">TERMAL GÖRÜNTÜ</text>
        <text x="384" y="24" textAnchor="end">41.2°</text>
      </g>
      <rect x="16" y="236" width="368" height="6" rx="3" fill="url(#t-boru)" opacity="0.9" />
    </svg>
  );
}
