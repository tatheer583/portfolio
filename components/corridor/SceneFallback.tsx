export function FallbackHallway() {
  return (
    <svg className="corridor-fallback" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="pencil-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
          <path d="M0 0V12" stroke="#6c6555" strokeOpacity=".08" strokeWidth="1" />
        </pattern>
        <linearGradient id="hall-floor" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f6e8ba" /><stop offset="1" stopColor="#fff6d7" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="#fff4cc" />
      <g stroke="#575249" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M0 0H1440L880 250H560Z" fill="#fff7db" />
        <path d="M0 0L560 250V590L0 900Z" fill="#f2e2af" />
        <path d="M1440 0L880 250V590L1440 900Z" fill="#fff0bf" />
        <path d="M560 250H880V590H560Z" fill="#faedc1" />
        <path d="M0 900L560 590H880L1440 900Z" fill="url(#hall-floor)" />
        <path d="M0 900L560 590H880L1440 900Z" fill="url(#pencil-hatch)" />
        <path d="M175 900L606 590M450 900L659 590M990 900L781 590M1260 900L836 590M180 800H1260M350 706H1090M480 640H960" fill="none" opacity=".35" />
        <path d="M0 65L560 281M1440 65L880 281M0 803L560 568M1440 803L880 568" fill="none" />
        <path d="M138 110L582 287V646L138 850Z" fill="#dfdfd8" />
        <path d="M154 133L570 300V636L154 824Z" fill="url(#pencil-hatch)" />
        <path d="M1302 110L858 287V646L1302 850Z" fill="#d7d9d4" />
        <path d="M1286 133L870 300V636L1286 824Z" fill="url(#pencil-hatch)" />
        <path d="M668 363H778V590H668Z" fill="#d8dad4" />
        <path d="M677 372H769V587H677Z" fill="url(#pencil-hatch)" />
        <path d="M685 472H760M685 488H760M685 504H760" opacity=".35" />
        <circle cx="763" cy="488" r="5" fill="#928c7c" />
        <path d="M514 418L540 410M926 418L900 410" strokeWidth="6" />
      </g>
      <g fill="#fff7db" stroke="#575249" strokeWidth="1.3">
        <ellipse cx="338" cy="378" rx="68" ry="37" transform="rotate(13 338 378)" />
        <ellipse cx="1100" cy="378" rx="68" ry="37" transform="rotate(-13 1100 378)" />
        <ellipse cx="723" cy="418" rx="38" ry="22" />
      </g>
      <g fill="#413d35" fontFamily="Georgia, serif" textAnchor="middle">
        <text x="338" y="385" fontSize="25" transform="rotate(13 338 378)">The studio</text>
        <text x="1100" y="385" fontSize="25" transform="rotate(-13 1100 378)">The gallery</text>
        <text x="723" y="423" fontSize="13">Say hello</text>
      </g>
      <g stroke="#575249" strokeWidth="1.3">
        <path d="M982 661L995 730H1054L1066 661Z" fill="#e7d6ae" />
        <ellipse cx="1024" cy="661" rx="42" ry="12" fill="#a49f81" />
        <path d="M1024 665V533M1024 606Q954 539 965 501Q1022 512 1024 584M1024 571Q1083 500 1103 535Q1068 594 1024 606M1024 626Q980 585 969 585Q964 630 1024 642" fill="#b9bc99" />
      </g>
    </svg>
  )
}



export function FallbackExterior() {
  return <svg className="corridor-fallback" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1440" height="900" fill="#eee7cc" />
    <path d="M0 720H1440V900H0Z" fill="#d9d7c9" />
    <g stroke="#77705b" strokeWidth="2">
      <path d="M300 200H1190V750H300Z" fill="#fff1bd" />
      <path d="M270 180H1220V230H270Z" fill="#dbc59c" />
      <path d="M820 380H1080V750H820Z" fill="#d9dbd7" />
      <path d="M820 380H1080V750H820Z" fill="none" strokeWidth="7" />
      <ellipse cx="950" cy="495" rx="75" ry="37" fill="#fff7dc" />
      <path d="M410 365H675V630H410Z" fill="#fff7dc" />
      <path d="M400 355H685V640H400Z" fill="none" />
      <path d="M300 700H1190M0 800H1440M400 750L320 900M1100 750L1180 900" fill="none" opacity=".4" />
      <ellipse cx="745" cy="300" rx="265" ry="48" fill="#fff7dc" />
      <path d="M850 650H875" strokeWidth="8" />
    </g>
    <g fill="#514a36" textAnchor="middle" fontFamily="Georgia, serif">
      <text x="745" y="311" fontSize="34">Muhammad Tatheer’s studio</text>
      <text x="543" y="443" fontSize="35">Ideas live here.</text>
      <text x="543" y="505" fontSize="18">FULL STACK / AI / SECURITY</text>
      <text x="543" y="570" fontSize="17">Come in. Look around.</text>
      <text x="950" y="502" fontSize="24">Welcome</text>
    </g>
  </svg>
}

