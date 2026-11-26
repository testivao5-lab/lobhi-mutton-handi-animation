import React from 'react';

/*
 * Code-drawn scene art (ZERO bitmap/AI assets).
 * MarketBg: 3-layer parallax market street. ShopBg: sweet-shop interior.
 * CounterFg: foreground counter. HandiEcu: glossy mutton handi close-up.
 * All animation is driven by Remotion frames passed as props.
 */

const OUT = '#3A2414';
const BENGALI = "'Noto Sans Bengali', sans-serif";

/* ============================ MARKET (parallax) ============================ */

const Sky: React.FC = () => (
  <g>
    <rect x={0} y={0} width={3400} height={620} fill="#FFE0A8" />
    <rect x={0} y={430} width={3400} height={650} fill="#F7C268" />
    <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFF6D8" stopOpacity={0.95} />
      <stop offset="100%" stopColor="#FFF6D8" stopOpacity={0} />
    </radialGradient>
    <circle cx={2450} cy={150} r={320} fill="url(#sunG)" />
    <circle cx={2450} cy={150} r={95} fill="#FFF2BC" />
    <ellipse cx={500} cy={130} rx={180} ry={36} fill="#FFEFC9" opacity={0.8} />
    <ellipse cx={640} cy={158} rx={120} ry={26} fill="#FFEFC9" opacity={0.6} />
    <ellipse cx={1800} cy={100} rx={150} ry={28} fill="#FFE9B8" opacity={0.7} />
    <path d="M 900 170 q 14 -16 28 0 q 14 -16 28 0" stroke="#7A5A34" strokeWidth={4} fill="none" opacity={0.65} />
    <path d="M 980 130 q 12 -14 24 0 q 12 -14 24 0" stroke="#7A5A34" strokeWidth={4} fill="none" opacity={0.5} />
    <path d="M 2050 200 q 12 -14 24 0 q 12 -14 24 0" stroke="#7A5A34" strokeWidth={4} fill="none" opacity={0.55} />
  </g>
);

const FarBuildings: React.FC = () => (
  <g opacity={0.92}>
    {[
      {x: 0, w: 260, h: 300, c: '#E2B076'},
      {x: 270, w: 210, h: 360, c: '#D9A468'},
      {x: 900, w: 300, h: 340, c: '#E2B076'},
      {x: 1500, w: 240, h: 300, c: '#D9A468'},
      {x: 2260, w: 300, h: 380, c: '#E2B076'},
      {x: 2900, w: 260, h: 320, c: '#D9A468'},
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={620 - b.h} width={b.w} height={b.h} fill={b.c} />
        <rect x={b.x + 14} y={620 - b.h - 26} width={b.w - 28} height={26} fill="#B67E42" />
        {Array.from({length: Math.floor(b.w / 70)}, (_, k) => (
          <rect key={k} x={b.x + 20 + k * 70} y={620 - b.h + 40} width={34} height={44} fill="#8A5A30" opacity={0.75} rx={4} />
        ))}
        <path d={`M ${b.x} ${620 - b.h} l 40 -34 l 40 34`} fill="#B67E42" opacity={0.8} />
      </g>
    ))}
    {/* water tank + antenna */}
    <g transform="translate(1210 250)">
      <rect x={0} y={0} width={90} height={70} fill="#C08A4E" />
      <path d="M -8 0 L 45 -26 L 98 0" fill="#A8743E" />
      <path d="M 45 -26 L 45 -70 M 30 -50 L 60 -50" stroke="#7A5A34" strokeWidth={5} fill="none" />
    </g>
  </g>
);

const AWNING_COLORS = ['#C6402F', '#F3E4C8'];

const MidShops: React.FC<{frame: number}> = ({frame}) => (
  <g>
    {/* shop 1 — vegetable stall */}
    <g transform="translate(180 380)">
      <rect x={0} y={0} width={420} height={340} fill="#D98F4A" stroke={OUT} strokeWidth={5} />
      <rect x={0} y={0} width={420} height={90} fill="#C67B3C" stroke={OUT} strokeWidth={5} />
      {Array.from({length: 7}, (_, i) => (
        <rect key={i} x={i * 60} y={-34} width={60} height={34} fill={AWNING_COLORS[i % 2]} stroke={OUT} strokeWidth={3.5} />
      ))}
      <rect x={36} y={110} width={200} height={54} rx={8} fill="#7A4A26" stroke={OUT} strokeWidth={4} />
      <text x={136} y={150} textAnchor="middle" fontSize={38} fill="#F6E7D2" fontFamily={BENGALI} fontWeight="bold">
        সবজি বাজার
      </text>
      {/* produce crates */}
      {[0, 1, 2].map((c) => (
        <g key={c} transform={`translate(${20 + c * 130} ${230 - c * 6})`}>
          <rect x={0} y={0} width={110} height={52} fill="#A8743E" stroke={OUT} strokeWidth={4} />
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={24 + k * 30} cy={-8} r={17} fill={['#E8862B', '#C6402F', '#8FAF3E'][c]} stroke={OUT} strokeWidth={3} />
          ))}
        </g>
      ))}
      <rect x={0} y={282} width={420} height={58} fill="#8A5A30" stroke={OUT} strokeWidth={5} />
    </g>
    {/* shop 2 — fish stall with hanging bananas */}
    <g transform="translate(760 360)">
      <rect x={0} y={0} width={460} height={360} fill="#CE8442" stroke={OUT} strokeWidth={5} />
      {Array.from({length: 8}, (_, i) => (
        <rect key={i} x={i * 58} y={-36} width={58} height={36} fill={AWNING_COLORS[(i + 1) % 2]} stroke={OUT} strokeWidth={3.5} />
      ))}
      <rect x={60} y={104} width={240} height={56} rx={8} fill="#7A4A26" stroke={OUT} strokeWidth={4} />
      <text x={180} y={146} textAnchor="middle" fontSize={40} fill="#F6E7D2" fontFamily={BENGALI} fontWeight="bold">
        মাছের দোকান
      </text>
      {/* hanging banana bunches */}
      {[40, 150, 300, 390].map((bx, i) => (
        <g key={i} transform={`translate(${bx} ${170})`}>
          <path d="M 0 0 L 0 40" stroke="#5A3A18" strokeWidth={4} />
          {Array.from({length: 5}, (_, k) => (
            <path
              key={k}
              d={`M 0 ${44 + k * 3} q ${-14 - (k % 2) * 4} 6 ${-16} 30 q 10 8 16 0 q 6 -18 0 -30`}
              fill="#F2C14E"
              stroke={OUT}
              strokeWidth={3}
              transform={`rotate(${-16 + k * 8})`}
            />
          ))}
        </g>
      ))}
      <rect x={0} y={300} width={460} height={60} fill="#8A5A30" stroke={OUT} strokeWidth={5} />
      <ellipse cx={110} cy={298} rx={34} ry={12} fill="#B9C8D6" stroke={OUT} strokeWidth={3.5} />
      <ellipse cx={230} cy={296} rx={40} ry={13} fill="#AEBECF" stroke={OUT} strokeWidth={3.5} />
      <ellipse cx={360} cy={298} rx={34} ry={12} fill="#B9C8D6" stroke={OUT} strokeWidth={3.5} />
    </g>
    {/* shop 3 — sweet / mutton shop */}
    <g transform="translate(1560 375)">
      <rect x={0} y={0} width={480} height={345} fill="#D98F4A" stroke={OUT} strokeWidth={5} />
      {Array.from({length: 8}, (_, i) => (
        <rect key={i} x={i * 60} y={-34} width={60} height={34} fill={AWNING_COLORS[i % 2]} stroke={OUT} strokeWidth={3.5} />
      ))}
      <rect x={90} y={106} width={280} height={58} rx={8} fill="#7A4A26" stroke={OUT} strokeWidth={4} />
      <text x={230} y={148} textAnchor="middle" fontSize={38} fill="#F6E7D2" fontFamily={BENGALI} fontWeight="bold">
        মিষ্টি ও মাংস
      </text>
      {/* hanging handis */}
      {[70, 180, 300, 410].map((hx, i) => (
        <g key={i} transform={`translate(${hx} ${190})`}>
          <path d="M 0 0 L 0 26" stroke="#5A3A18" strokeWidth={4} />
          <path d="M -26 26 Q -20 62 0 66 Q 20 62 26 26 Z" fill="#B5562D" stroke={OUT} strokeWidth={4} />
          <ellipse cx={0} cy={26} rx={26} ry={7} fill="#8A3E1E" />
        </g>
      ))}
      <rect x={0} y={288} width={480} height={57} fill="#8A5A30" stroke={OUT} strokeWidth={5} />
    </g>
    {/* marigold garlands across street */}
    {[600, 1440].map((gx, i) => (
      <g key={i} transform={`translate(${gx} 240)`}>
        <path d={`M 0 0 Q 60 ${40 + Math.sin(frame / 20 + i) * 5} 120 6`} stroke="#5A3A18" strokeWidth={4} fill="none" />
        {Array.from({length: 7}, (_, k) => {
          const t = k / 6;
          const cx = t * 120;
          const cy = 40 * Math.sin(t * Math.PI) * (1 + Math.sin(frame / 20 + i) * 0.06);
          return <circle key={k} cx={cx} cy={cy} r={9} fill="#F2A93B" stroke={OUT} strokeWidth={2.5} />;
        })}
      </g>
    ))}
    {/* crowd silhouettes */}
    {[
      {x: 640, s: 1.0, c: '#6E4526'},
      {x: 1320, s: 1.1, c: '#5E3A20'},
      {x: 2100, s: 0.95, c: '#6E4526'},
    ].map((p, i) => {
      const bob2 = Math.sin(frame / 14 + i * 2) * 4;
      return (
        <g key={i} transform={`translate(${p.x} ${620 - bob2}) scale(${p.s})`} opacity={0.9}>
          <circle cx={0} cy={-158} r={22} fill={p.c} />
          <path d="M -22 -134 Q 0 -144 22 -134 L 30 -40 L -30 -40 Z" fill={p.c} />
          <path d="M -30 -40 L 30 -40 L 36 36 L 20 36 L 12 -10 L 4 36 L -12 36 L -20 -10 L -28 36 L -38 36 Z" fill={p.c} />
        </g>
      );
    })}
  </g>
);

const NearStreet: React.FC = () => (
  <g>
    <rect x={0} y={618} width={3400} height={462} fill="#C09058" />
    <rect x={0} y={618} width={3400} height={26} fill="#A87848" />
    {Array.from({length: 28}, (_, i) => (
      <ellipse key={i} cx={i * 130 + (i % 3) * 40} cy={700 + (i % 4) * 90} rx={38} ry={10} fill="#A87848" opacity={0.6} />
    ))}
    {/* stall post + lamp */}
    <rect x={140} y={330} width={22} height={420} fill="#7A4A26" stroke={OUT} strokeWidth={4} />
    <ellipse cx={151} cy={322} rx={44} ry={16} fill="#C6402F" stroke={OUT} strokeWidth={4} />
    <rect x={3060} y={280} width={24} height={470} fill="#7A4A26" stroke={OUT} strokeWidth={4} />
    <path d="M 3072 280 q 0 -40 50 -40" stroke="#5A3A18" strokeWidth={7} fill="none" />
    <ellipse cx={3128} cy={244} rx={16} ry={12} fill="#F2C14E" stroke={OUT} strokeWidth={3.5} />
    {/* foreground pumpkin cart corner */}
    <g transform="translate(-40 880)">
      <rect x={0} y={40} width={360} height={180} fill="#8A5A30" stroke={OUT} strokeWidth={5} />
      <circle cx={90} cy={20} r={44} fill="#E8862B" stroke={OUT} strokeWidth={4.5} />
      <circle cx={190} cy={10} r={52} fill="#D97F2B" stroke={OUT} strokeWidth={4.5} />
      <path d="M 190 -42 l 0 -16 M 182 -52 q 8 -8 16 0" stroke="#4E7028" strokeWidth={6} fill="none" />
      <circle cx={296} cy={26} r={40} fill="#E8862B" stroke={OUT} strokeWidth={4.5} />
    </g>
  </g>
);

export const MarketBg: React.FC<{pan: number; frame: number}> = ({pan, frame}) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
    <defs>
      <linearGradient id="shaftG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF2C0" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#FFF2C0" stopOpacity={0} />
      </linearGradient>
    </defs>
    <g transform={`translate(${-pan * 0.22} 0)`}>
      <Sky />
    </g>
    <g transform={`translate(${-pan * 0.45} 0)`}>
      <FarBuildings />
    </g>
    <g transform={`translate(${-pan * 0.78} 0)`}>
      <MidShops frame={frame} />
    </g>
    <g transform={`translate(${-pan} 0)`}>
      <NearStreet />
    </g>
    {/* light shafts (screen space) */}
    <g opacity={0.55} style={{mixBlendMode: 'screen'}}>
      <polygon points="1200,0 1500,0 900,1080 640,1080" fill="url(#shaftG)" />
      <polygon points="1700,0 1980,0 1500,1080 1280,1080" fill="url(#shaftG)" opacity={0.7} />
    </g>
    {/* dust */}
    {Array.from({length: 16}, (_, i) => {
      const t = (frame * (0.5 + (i % 5) * 0.13) + i * 73) % 560;
      return (
        <circle
          key={i}
          cx={(i * 223 + t * 0.3) % 1920}
          cy={(140 + t + i * 47) % 1080}
          r={1.8 + (i % 3) * 0.9}
          fill="#FFE9B0"
          opacity={0.18 + (i % 4) * 0.05}
        />
      );
    })}
  </svg>
);

/* ============================ SHOP INTERIOR ============================ */

export const ShopBg: React.FC<{frame: number; dim?: number}> = ({frame, dim = 0}) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
    <defs>
      <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EDC794" />
        <stop offset="100%" stopColor="#D9A96C" />
      </linearGradient>
      <radialGradient id="bulbG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE9A8" stopOpacity={0.85} />
        <stop offset="100%" stopColor="#FFE9A8" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect x={0} y={0} width={1920} height={1080} fill="url(#wallG)" />
    {/* wooden beams */}
    <rect x={0} y={0} width={1920} height={64} fill="#7A4A26" stroke={OUT} strokeWidth={4} />
    {Array.from({length: 12}, (_, i) => (
      <rect key={i} x={i * 170} y={0} width={10} height={64} fill="#5E3A18" opacity={0.6} />
    ))}
    <rect x={560} y={64} width={16} height={856} fill="#7A4A26" stroke={OUT} strokeWidth={3.5} opacity={0.85} />
    {/* window with light */}
    <rect x={1580} y={170} width={260} height={330} rx={10} fill="#FFE9BC" stroke={OUT} strokeWidth={6} />
    <path d="M 1580 335 h 260 M 1710 170 v 330" stroke={OUT} strokeWidth={5} fill="none" />
    <polygon points="1580,500 1840,500 2050,1080 1400,1080" fill="#FFF2C0" opacity={0.3} style={{mixBlendMode: 'screen'}} />
    {/* left shelves with jars + handis */}
    <rect x={60} y={200} width={430} height={22} fill="#8A5A30" stroke={OUT} strokeWidth={4} />
    <rect x={60} y={430} width={430} height={22} fill="#8A5A30" stroke={OUT} strokeWidth={4} />
    {[
      {x: 90, c: '#CFE3E8'},
      {x: 190, c: '#E8D9A8'},
      {x: 290, c: '#CFE3E8'},
    ].map((j, i) => (
      <g key={i} transform={`translate(${j.x} 118)`}>
        <rect x={0} y={0} width={74} height={82} rx={12} fill={j.c} stroke={OUT} strokeWidth={4.5} opacity={0.92} />
        <rect x={-6} y={-14} width={86} height={20} rx={6} fill="#B5562D" stroke={OUT} strokeWidth={4} />
        <rect x={12} y={12} width={16} height={54} fill="#FFFFFF" opacity={0.5} rx={8} />
      </g>
    ))}
    <g transform="translate(96 330)">
      <path d="M -30 0 Q -24 44 0 50 Q 24 44 30 0 L 26 -8 L -26 -8 Z" fill="#B5562D" stroke={OUT} strokeWidth={4.5} />
      <ellipse cx={0} cy={-8} rx={26} ry={8} fill="#8A3E1E" />
    </g>
    <g transform="translate(210 330)">
      <path d="M -34 0 Q -28 52 0 58 Q 28 52 34 0 L 30 -9 L -30 -9 Z" fill="#B5562D" stroke={OUT} strokeWidth={4.5} />
      <ellipse cx={0} cy={-9} rx={30} ry={9} fill="#8A3E1E" />
    </g>
    <g transform="translate(330 330)">
      <path d="M -30 0 Q -24 44 0 50 Q 24 44 30 0 L 26 -8 L -26 -8 Z" fill="#B5562D" stroke={OUT} strokeWidth={4.5} />
      <ellipse cx={0} cy={-8} rx={26} ry={8} fill="#8A3E1E" />
    </g>
    {[
      {x: 110, s: 40},
      {x: 260, s: 58},
      {x: 390, s: 44},
    ].map((j, i) => (
      <g key={`l2-${i}`} transform={`translate(${j.x} ${452 - j.s})`}>
        <rect x={0} y={0} width={j.s + 24} height={j.s} rx={10} fill={i === 1 ? '#E8D9A8' : '#CFE3E8'} stroke={OUT} strokeWidth={4.5} opacity={0.92} />
        <rect x={-5} y={-12} width={j.s + 34} height={16} rx={5} fill="#B5562D" stroke={OUT} strokeWidth={4} />
      </g>
    ))}
    {/* hanging pans */}
    {[660, 760].map((px, i) => (
      <g key={i} transform={`translate(${px} 70)`}>
        <path d="M 0 0 L 0 44" stroke="#5A3A18" strokeWidth={4} />
        <ellipse cx={0} cy={62} rx={34} ry={16} fill="#4E3A28" stroke={OUT} strokeWidth={4.5} />
        <ellipse cx={0} cy={56} rx={34} ry={12} fill="#6E5438" />
      </g>
    ))}
    {/* hanging bulb with flicker */}
    <path d="M 1020 64 L 1020 200" stroke="#5A3A18" strokeWidth={5} />
    <circle cx={1020} cy={214} r={16 + Math.sin(frame / 6) * 1.5} fill="#FFE9A8" stroke={OUT} strokeWidth={3.5} />
    <circle cx={1020} cy={214} r={150 + Math.sin(frame / 6) * 14} fill="url(#bulbG)" opacity={0.75} />
    {/* calendar */}
    <g transform="translate(1240 150)">
      <rect x={0} y={0} width={130} height={170} rx={8} fill="#F6EFDD" stroke={OUT} strokeWidth={4.5} />
      <rect x={0} y={0} width={130} height={40} rx={8} fill="#C6402F" stroke={OUT} strokeWidth={4} />
      <text x={65} y={30} textAnchor="middle" fontSize={24} fill="#F6E7D2" fontFamily={BENGALI} fontWeight="bold">
        নভেম্বর
      </text>
      <text x={65} y={110} textAnchor="middle" fontSize={64} fill="#3A2414" fontFamily={BENGALI} fontWeight="bold">
        ২৬
      </text>
    </g>
    {/* framed picture */}
    <g transform="translate(330 560)">
      <rect x={-14} y={-14} width={188} height={148} fill="#C9982E" stroke={OUT} strokeWidth={5} />
      <rect x={0} y={0} width={160} height={120} fill="#F6ECD2" />
      <path d="M 30 96 Q 80 30 130 96 Q 80 66 30 96 Z" fill="#E88AA0" stroke={OUT} strokeWidth={3.5} />
      <circle cx={80} cy={38} r={16} fill="#F2C14E" stroke={OUT} strokeWidth={3} />
    </g>
    {/* rice sacks bottom-left */}
    {[
      {x: 40, y: 880, r: -4},
      {x: 210, y: 900, r: 3},
    ].map((s, i) => (
      <g key={i} transform={`translate(${s.x} ${s.y}) rotate(${s.r})`}>
        <path d="M 0 0 L 150 0 Q 170 90 140 180 L 10 180 Q -20 90 0 0 Z" fill="#D9C39A" stroke={OUT} strokeWidth={5} />
        <path d="M 10 40 Q 75 60 140 40" stroke="#B99B6E" strokeWidth={4} fill="none" />
        <text x={75} y={120} textAnchor="middle" fontSize={44} fill="#7A5A34" fontFamily={BENGALI} fontWeight="bold">
          চাল
        </text>
      </g>
    ))}
    {/* back stove with pot (right, behind counter) */}
    <g transform="translate(1560 780)">
      <rect x={-120} y={100} width={330} height={200} fill="#6E4526" stroke={OUT} strokeWidth={5} />
      <ellipse cx={45} cy={96} rx={110} ry={30} fill="#3A3A3E" stroke={OUT} strokeWidth={4.5} />
      <path d="M -40 88 Q 45 66 45 68 Q 130 66 45 88 Z" fill="#E8862B" opacity={0.9 + Math.sin(frame / 4) * 0.1} />
      <path d="M -30 90 q 30 -26 60 -6 q 30 16 60 -8" stroke="#F2C14E" strokeWidth={7} fill="none" opacity={0.85 + Math.sin(frame / 3) * 0.15} />
      <path d="M 10 96 q 30 -20 60 2" stroke="#C6402F" strokeWidth={6} fill="none" opacity={0.8} />
      <path d="M -60 120 q 20 -44 60 -50 q 50 -8 70 34" stroke="#5A3A18" strokeWidth={5} fill="none" opacity={0.5} />
    </g>
    {dim > 0 && <rect x={0} y={0} width={1920} height={1080} fill="#1A0E06" opacity={dim} />}
  </svg>
);

/* ============================ COUNTER FOREGROUND ============================ */

export const CounterFg: React.FC = () => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
    <defs>
      <linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8A5A34" />
        <stop offset="16%" stopColor="#6E4526" />
        <stop offset="100%" stopColor="#3A2414" />
      </linearGradient>
    </defs>
    <rect x={0} y={912} width={1920} height={168} fill="url(#woodG)" />
    <rect x={0} y={906} width={1920} height={12} rx={5} fill="#A8743E" />
    {Array.from({length: 9}, (_, i) => (
      <rect key={i} x={i * 220} y={920} width={4} height={160} fill="#2E1C0E" opacity={0.6} />
    ))}
    <path d="M 120 960 q 26 66 0 120 M 360 958 q -22 70 0 122 M 640 962 q 24 64 0 118 M 1240 960 q 26 66 0 120 M 1560 958 q -22 70 0 122" stroke="#4A2E18" strokeWidth={4} fill="none" opacity={0.6} />
    {/* brass bowl */}
    <g transform="translate(400 928)">
      <path d="M -95 0 Q -80 62 0 68 Q 80 62 95 0 Z" fill="#CAA53D" stroke={OUT} strokeWidth={4.5} />
      <ellipse cx={0} cy={0} rx={95} ry={16} fill="#E3C458" />
      <ellipse cx={0} cy={-3} rx={80} ry={12} fill="#B5892E" />
      <ellipse cx={-30} cy={-4} rx={26} ry={6} fill="#F6DF8E" opacity={0.8} />
    </g>
    {/* stacked steel plates */}
    <g transform="translate(760 940)">
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx={0} cy={-i * 14} rx={62 - i * 6} ry={12} fill="#B9C2CC" stroke={OUT} strokeWidth={4} />
      ))}
    </g>
    {/* small handi on counter */}
    <g transform="translate(1720 934)">
      <path d="M -62 0 Q -54 40 0 44 Q 54 40 62 0 L 58 -8 L -58 -8 Z" fill="#B5562D" stroke={OUT} strokeWidth={4.5} />
      <ellipse cx={0} cy={-8} rx={58} ry={11} fill="#D9A527" />
      <ellipse cx={-20} cy={-10} rx={20} ry={5} fill="#F2D06B" opacity={0.8} />
    </g>
  </svg>
);

/* ============================ HANDI ECU ============================ */

export const HandiEcu: React.FC<{frame: number}> = ({frame}) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
    <defs>
      <radialGradient id="hbodyG" cx="42%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#D97F45" />
        <stop offset="55%" stopColor="#B5562D" />
        <stop offset="100%" stopColor="#7E3A1C" />
      </radialGradient>
      <radialGradient id="curryG" cx="45%" cy="35%" r="75%">
        <stop offset="0%" stopColor="#A85C26" />
        <stop offset="60%" stopColor="#8A4A1F" />
        <stop offset="100%" stopColor="#5E3012" />
      </radialGradient>
      <radialGradient id="vignG" cx="50%" cy="50%" r="72%">
        <stop offset="55%" stopColor="#2A1406" stopOpacity={0} />
        <stop offset="100%" stopColor="#2A1406" stopOpacity={0.85} />
      </radialGradient>
      <filter id="steamBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation={14} />
      </filter>
    </defs>
    <rect x={0} y={0} width={1920} height={1080} fill="#2E180A" />
    {/* glow behind handi */}
    <circle cx={960} cy={520} r={430} fill="#FFB25E" opacity={0.16 + Math.sin(frame / 8) * 0.03} />
    {/* steam plumes */}
    <g filter="url(#steamBlur)">
      {Array.from({length: 9}, (_, i) => {
        const cyc = 120;
        const off = (i * 41) % cyc;
        const age = ((frame + off) % cyc) / cyc;
        const sway = Math.sin((frame + i * 43) / 17) * 60;
        const r = (60 + (i % 4) * 30) * (0.5 + age * 1.1);
        const o = Math.sin(age * Math.PI) * 0.5;
        return <circle key={i} cx={860 + sway + ((i % 3) - 1) * 70} cy={470 - age * 480} r={r} fill="#FFF3DE" opacity={o} />;
      })}
    </g>
    {/* handi body */}
    <g transform="translate(960 620)">
      <path d="M -330 -80 Q -300 160 0 200 Q 300 160 330 -80 L 310 -130 L -310 -130 Z" fill="url(#hbodyG)" stroke={OUT} strokeWidth={9} />
      {/* rim */}
      <ellipse cx={0} cy={-130} rx={310} ry={52} fill="#8A3E1E" stroke={OUT} strokeWidth={8} />
      <ellipse cx={0} cy={-130} rx={282} ry={42} fill="#5E2A12" />
      {/* curry surface */}
      <ellipse cx={0} cy={-126} rx={268} ry={38} fill="url(#curryG)" />
      {/* meat chunks */}
      {[
        {x: -170, y: -132, r: 34},
        {x: -60, y: -118, r: 40},
        {x: 80, y: -132, r: 36},
        {x: 190, y: -118, r: 30},
        {x: 10, y: -140, r: 32},
      ].map((m, i) => (
        <g key={i} transform={`translate(${m.x} ${m.y})`}>
          <ellipse cx={0} cy={0} rx={m.r} ry={m.r * 0.72} fill="#6E3316" stroke={OUT} strokeWidth={4} />
          <ellipse cx={-m.r * 0.25} cy={-m.r * 0.22} rx={m.r * 0.4} ry={m.r * 0.24} fill="#8A4A22" />
        </g>
      ))}
      {/* bones */}
      <ellipse cx={-110} cy={-112} rx={26} ry={12} fill="#EFE6D2" stroke={OUT} strokeWidth={3.5} />
      <ellipse cx={140} cy={-112} rx={22} ry={10} fill="#EFE6D2" stroke={OUT} strokeWidth={3.5} />
      {/* coriander + oil gloss */}
      {[[-220, -120], [-90, -146], [30, -112], [150, -140], [230, -122], [-30, -122]].map(([cx2, cy2], i) => (
        <circle key={i} cx={cx2} cy={cy2} r={5} fill="#5E8F2E" />
      ))}
      <ellipse cx={-150} cy={-136} rx={34} ry={9} fill="#D98A2E" opacity={0.75} />
      <ellipse cx={90} cy={-120} rx={26} ry={7} fill="#D98A2E" opacity={0.6} />
      {/* bubbles */}
      {[0, 1, 2, 3].map((i) => {
        const cyc = 46 + i * 9;
        const age = ((frame + i * 15) % cyc) / cyc;
        const bx = [-200, -20, 120, 220][i];
        return (
          <circle key={i} cx={bx} cy={-126 - age * 14} r={7 + age * 9} fill="#C67B28" opacity={Math.sin(age * Math.PI) * 0.85} />
        );
      })}
      {/* body gloss */}
      <ellipse cx={-170} cy={-30} rx={54} ry={110} fill="#F2B26B" opacity={0.3} transform="rotate(14 -170 -30)" />
      <ellipse cx={150} cy={-10} rx={30} ry={70} fill="#F2B26B" opacity={0.16} transform="rotate(-10 150 -10)" />
      {/* handles */}
      <path d="M -330 -60 q -70 10 -60 60" stroke={OUT} strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d="M 330 -60 q 70 10 60 60" stroke={OUT} strokeWidth={12} fill="none" strokeLinecap="round" />
    </g>
    {/* sparkles */}
    {[0, 1, 2].map((i) => {
      const tw = Math.sin(frame / 5 + i * 2.1);
      if (tw < 0.2) return null;
      const sx = [520, 1380, 1180][i];
      const sy = [300, 260, 420][i];
      return (
        <path
          key={i}
          d={`M ${sx} ${sy - 16} L ${sx + 5} ${sy - 5} L ${sx + 16} ${sy} L ${sx + 5} ${sy + 5} L ${sx} ${sy + 16} L ${sx - 5} ${sy + 5} L ${sx - 16} ${sy} L ${sx - 5} ${sy - 5} Z`}
          fill="#FFE9B0"
          opacity={tw}
        />
      );
    })}
    <rect x={0} y={0} width={1920} height={1080} fill="url(#vignG)" />
  </svg>
);
