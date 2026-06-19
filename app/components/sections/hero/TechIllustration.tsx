export function TechIllustration() {
  return (
    <svg
      viewBox="0 0 560 610"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden
    >
      <defs>
        {/* Glow filters */}
        <filter id="hero-glow-lg" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hero-glow-sm" x="-55%" y="-55%" width="210%" height="210%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Node gradients */}
        <radialGradient id="g-center" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <radialGradient id="g-magenta" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#9d174d" />
        </radialGradient>
        <radialGradient id="g-orange" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#9a3412" />
        </radialGradient>
        <radialGradient id="g-indigo" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#312e81" />
        </radialGradient>
        <radialGradient id="g-coral" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="g-teal" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#064e3b" />
        </radialGradient>
        <radialGradient id="g-violet" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#5b21b6" />
        </radialGradient>
      </defs>

      {/*
        Center: (280, 305)  r=78
        Satellites at orbital radius 235 — gap ~97px to center, ~115px between adjacent nodes:
          AI/ML      top           (280,  70)
          Database   top-right     (484, 187)
          Frontend   bottom-right  (484, 423)
          Mobile     bottom        (280, 540)
          Cloud      bottom-left   ( 76, 423)
          Auth       top-left      ( 76, 187)
      */}

      {/* ── Connection lines (center → each satellite) ── */}
      <line x1="280" y1="305" x2="280" y2="70"  stroke="#db2777" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="6 5">
        <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.4s" repeatCount="indefinite" />
      </line>
      <line x1="280" y1="305" x2="484" y2="187" stroke="#ea580c" strokeWidth="1.2" strokeOpacity="0.32" strokeDasharray="6 5">
        <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.9s" repeatCount="indefinite" />
      </line>
      <line x1="280" y1="305" x2="484" y2="423" stroke="#6366f1" strokeWidth="1.2" strokeOpacity="0.32" strokeDasharray="6 5">
        <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.7s" repeatCount="indefinite" />
      </line>
      <line x1="280" y1="305" x2="280" y2="540" stroke="#e11d48" strokeWidth="1.2" strokeOpacity="0.32" strokeDasharray="6 5">
        <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="2.1s" repeatCount="indefinite" />
      </line>
      <line x1="280" y1="305" x2="76"  y2="423" stroke="#22c55e" strokeWidth="1.2" strokeOpacity="0.30" strokeDasharray="6 5">
        <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.6s" repeatCount="indefinite" />
      </line>
      <line x1="280" y1="305" x2="76"  y2="187" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.28" strokeDasharray="6 5">
        <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="2.3s" repeatCount="indefinite" />
      </line>

      {/* ── Data packets travelling the lines ── */}
      <circle r="4" fill="#f472b6">
        <animate attributeName="cx" values="280;280;280" dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="305;70;305"  dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle r="3.5" fill="#fb923c">
        <animate attributeName="cx" values="280;484;280" dur="1.9s" repeatCount="indefinite" />
        <animate attributeName="cy" values="305;187;305" dur="1.9s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0;1;0" dur="1.9s" repeatCount="indefinite" />
      </circle>
      <circle r="3.5" fill="#818cf8">
        <animate attributeName="cx" values="280;484;280" dur="1.7s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="cy" values="305;423;305" dur="1.7s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="fill-opacity" values="0;1;0" dur="1.7s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle r="3.5" fill="#fb7185">
        <animate attributeName="cx" values="280;280;280" dur="2.1s" repeatCount="indefinite" begin="0.8s" />
        <animate attributeName="cy" values="305;540;305" dur="2.1s" repeatCount="indefinite" begin="0.8s" />
        <animate attributeName="fill-opacity" values="0;1;0" dur="2.1s" repeatCount="indefinite" begin="0.8s" />
      </circle>
      <circle r="3.5" fill="#34d399">
        <animate attributeName="cx" values="280;76;280"  dur="1.6s" repeatCount="indefinite" begin="0.3s" />
        <animate attributeName="cy" values="305;423;305" dur="1.6s" repeatCount="indefinite" begin="0.3s" />
        <animate attributeName="fill-opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite" begin="0.3s" />
      </circle>

      {/* ── Centre node — pulsing halo rings ── */}
      <circle cx="280" cy="305" r="108" stroke="#7c3aed" strokeWidth="0.6" strokeOpacity="0.10">
        <animate attributeName="r" values="102;114;102" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.10;0.03;0.10" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="280" cy="305" r="92" stroke="#7c3aed" strokeWidth="0.9" strokeOpacity="0.16">
        <animate attributeName="r" values="87;97;87" dur="3s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.16;0.05;0.16" dur="3s" begin="0.6s" repeatCount="indefinite" />
      </circle>

      {/* Centre node — r=78 */}
      <circle cx="280" cy="305" r="78" fill="url(#g-center)" filter="url(#hero-glow-lg)" />
      <circle cx="280" cy="305" r="78" stroke="white" strokeWidth="0.8" strokeOpacity="0.28" />
      <text x="280" y="298" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="monospace" opacity="0.95">CORE</text>
      <text x="280" y="317" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="monospace" opacity="0.95">API</text>

      {/* ── Satellite nodes — all r=60 ── */}

      {/* AI/ML — top (280, 70) */}
      <circle cx="280" cy="70"  r="60" fill="url(#g-magenta)" filter="url(#hero-glow-sm)" />
      <circle cx="280" cy="70"  r="60" stroke="white" strokeWidth="0.7" strokeOpacity="0.22" />
      <text x="280" y="63"  textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">AI /</text>
      <text x="280" y="81"  textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">ML</text>

      {/* Database — top-right (484, 187) */}
      <circle cx="484" cy="187" r="60" fill="url(#g-orange)" filter="url(#hero-glow-sm)" />
      <circle cx="484" cy="187" r="60" stroke="white" strokeWidth="0.7" strokeOpacity="0.22" />
      <text x="484" y="180" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">DATA</text>
      <text x="484" y="198" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">BASE</text>

      {/* Frontend — bottom-right (484, 423) */}
      <circle cx="484" cy="423" r="60" fill="url(#g-indigo)" filter="url(#hero-glow-sm)" />
      <circle cx="484" cy="423" r="60" stroke="white" strokeWidth="0.7" strokeOpacity="0.22" />
      <text x="484" y="416" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">FRONT</text>
      <text x="484" y="434" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">END</text>

      {/* Mobile — bottom (280, 540) */}
      <circle cx="280" cy="540" r="60" fill="url(#g-coral)" filter="url(#hero-glow-sm)" />
      <circle cx="280" cy="540" r="60" stroke="white" strokeWidth="0.7" strokeOpacity="0.22" />
      <text x="280" y="533" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">MOBILE</text>
      <text x="280" y="551" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">APP</text>

      {/* Cloud — bottom-left (76, 423) */}
      <circle cx="76"  cy="423" r="60" fill="url(#g-teal)" filter="url(#hero-glow-sm)" />
      <circle cx="76"  cy="423" r="60" stroke="white" strokeWidth="0.7" strokeOpacity="0.22" />
      <text x="76"  y="416" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">CLOUD</text>
      <text x="76"  y="434" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">INFRA</text>

      {/* Auth — top-left (76, 187) */}
      <circle cx="76"  cy="187" r="60" fill="url(#g-violet)" filter="url(#hero-glow-sm)" />
      <circle cx="76"  cy="187" r="60" stroke="white" strokeWidth="0.7" strokeOpacity="0.22" />
      <text x="76"  y="180" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">AUTH</text>
      <text x="76"  y="198" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="monospace" opacity="0.92">SVC</text>

      {/* ── Floating status chips ── */}
      <g transform="translate(356, 230)">
        <rect width="70" height="19" rx="9.5" fill="#ea580c" fillOpacity="0.15" stroke="#ea580c" strokeWidth="0.6" strokeOpacity="0.35" />
        <text x="35" y="13.5" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="monospace" opacity="0.70">99.9% uptime</text>
      </g>
      <g transform="translate(110, 348)">
        <rect width="60" height="19" rx="9.5" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="0.6" strokeOpacity="0.35" />
        <text x="30" y="13.5" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="monospace" opacity="0.70">&lt; 50ms</text>
      </g>
      <g transform="translate(358, 372)">
        <rect width="66" height="19" rx="9.5" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.35" />
        <text x="33" y="13.5" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="monospace" opacity="0.70">auto-scale</text>
      </g>
      <g transform="translate(288, 170)">
        <rect width="58" height="19" rx="9.5" fill="#db2777" fillOpacity="0.15" stroke="#db2777" strokeWidth="0.6" strokeOpacity="0.35" />
        <text x="29" y="13.5" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="monospace" opacity="0.70">GPT-4o</text>
      </g>
    </svg>
  );
}
