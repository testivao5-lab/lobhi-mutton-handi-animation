import React from 'react';
import {CHARACTER_PALETTES, Expression, MouthShape} from '../CharacterRig';

/**
 * Bolai (C01) animation rig — built from the OWNER-APPROVED model sheet v1
 * (public/characters/design/bolai-model-sheet-v1.png). Design lock:
 * mustard-yellow half-sleeve shirt, off-white dhoti, red checked gamcha on the
 * left shoulder, brown sandals, slight belly, thick black moustache, short
 * black hair combed back, warm brown skin.
 */

const P = CHARACTER_PALETTES.C01;

interface BolaiProps {
  expression?: Expression;
  mouth?: MouthShape;
  /** radians; drives the walk cycle (legs/arms swing + body bob) */
  walkPhase?: number;
  /** 0..1 — right-arm waving amount */
  wave?: number;
  blink?: boolean;
  /** 0..1 — amount of greedy eye-narrowing */
  sly?: number;
  scale?: number;
  x?: number;
  y?: number;
}

const mouthPath = (m: MouthShape): React.ReactNode => {
  switch (m) {
    case 'open-wide':
      return <ellipse cx={0} cy={16} rx={13} ry={16} fill="#5a2320" />;
    case 'open-small':
      return <ellipse cx={0} cy={17} rx={9} ry={9} fill="#5a2320" />;
    case 'round':
      return <ellipse cx={0} cy={17} rx={8} ry={12} fill="#5a2320" />;
    case 'smile-open':
      return (
        <path d="M -14 12 Q 0 30 14 12 Q 0 20 -14 12 Z" fill="#5a2320" />
      );
    case 'closed':
      return <path d="M -10 16 Q 0 20 10 16" stroke="#4a2320" strokeWidth={3} fill="none" strokeLinecap="round" />;
    default: // rest
      return <path d="M -8 17 Q 0 19 8 17" stroke="#4a2320" strokeWidth={3} fill="none" strokeLinecap="round" />;
  }
};

const eyeFor = (expression: Expression, blink: boolean, sly: number) => {
  const white = '#f7f3ea';
  const iris = '#2a1c12';
  if (blink) {
    return (
      <g>
        <path d="M -34 -6 q 8 5 16 0" stroke={iris} strokeWidth={3} fill="none" />
        <path d="M 18 -6 q 8 5 16 0" stroke={iris} strokeWidth={3} fill="none" />
      </g>
    );
  }
  const narrow = expression === 'suspicious' || expression === 'greedy' || sly > 0;
  const ry = narrow ? 4.5 : 8;
  const angry = expression === 'angry';
  return (
    <g>
      <ellipse cx={-26} cy={-6} rx={11} ry={ry} fill={white} stroke={iris} strokeWidth={2} />
      <circle cx={-24} cy={-5} r={4.6} fill={iris} />
      <ellipse cx={22} cy={-6} rx={11} ry={ry} fill={white} stroke={iris} strokeWidth={2} />
      <circle cx={24} cy={-5} r={4.6} fill={iris} />
      {angry && (
        <g stroke={P.hair} strokeWidth={5} strokeLinecap="round">
          <path d="M -38 -20 L -14 -14" />
          <path d="M 34 -20 L 10 -14" />
        </g>
      )}
    </g>
  );
};

const browFor = (expression: Expression) => {
  if (expression === 'angry') return null; // drawn in eyeFor
  const y = expression === 'shocked' || expression === 'surprised' ? -26 : -20;
  const tilt = expression === 'sad' || expression === 'regretful' || expression === 'crying' ? 4 : 0;
  return (
    <g stroke={P.hair} strokeWidth={5} strokeLinecap="round" fill="none">
      <path d={`M -38 ${y + tilt} q 12 -7 24 -1`} />
      <path d={`M 14 ${y - 1} q 12 -6 24 ${-7 + tilt}`} />
    </g>
  );
};

export const Bolai: React.FC<BolaiProps> = ({
  expression = 'happy',
  mouth = 'rest',
  walkPhase = 0,
  wave = 0,
  blink = false,
  sly = 0,
  scale = 1,
  x = 0,
  y = 0,
}) => {
  const swing = Math.sin(walkPhase) * 24;
  const bob = Math.abs(Math.cos(walkPhase)) * 5 * (walkPhase === 0 ? 0 : 1);
  const breathe = Math.sin(walkPhase * 0.35) * 1.5;
  const legA = {transform: `rotate(${swing} 170 400)`};
  const legB = {transform: `rotate(${-swing} 230 400)`};
  const armWave = -155 * wave + Math.sin(walkPhase * 1.7) * 10 * wave;
  const armA = {transform: `rotate(${-swing * 0.8} 150 245)`};
  const armB = {transform: `rotate(${swing * 0.8 + armWave} 250 245)`};

  return (
    <svg
      viewBox="0 0 400 620"
      width={400 * scale}
      height={620 * scale}
      style={{position: 'absolute', left: x, top: y, overflow: 'visible'}}
    >
      <defs>
        <pattern id="gamchaCheck" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={P.accent} />
          <rect width="7" height="7" fill="#e8e0d0" opacity={0.85} />
          <rect x={7} y={7} width="7" height="7" fill="#e8e0d0" opacity={0.85} />
        </pattern>
      </defs>

      <g transform={`translate(0 ${-bob + breathe})`}>
        {/* shadow */}
        <ellipse cx={200} cy={596} rx={105} ry={16} fill="rgba(40,20,10,0.22)" />

        {/* legs + sandals */}
        <g {...legA}>
          <rect x={158} y={395} width={34} height={150} rx={16} fill={P.secondary} />
          <rect x={152} y={540} width={52} height={20} rx={9} fill="#7a4a28" />
        </g>
        <g {...legB}>
          <rect x={208} y={395} width={34} height={150} rx={16} fill={P.secondary} />
          <rect x={202} y={540} width={52} height={20} rx={9} fill="#7a4a28" />
        </g>

        {/* dhoti */}
        <path
          d="M 138 380 L 262 380 L 276 520 Q 200 542 124 520 Z"
          fill={P.secondary}
          stroke="#c9bfa4"
          strokeWidth={2}
        />
        <path d="M 168 385 L 162 528 M 200 388 L 200 534 M 232 385 L 238 528" stroke="#dcd3ba" strokeWidth={3} fill="none" />

        {/* torso with belly */}
        <path
          d="M 140 250 Q 134 320 142 360 Q 200 392 258 360 Q 266 320 260 250 Q 200 226 140 250 Z"
          fill={P.primary}
          stroke="#b5830f"
          strokeWidth={2.5}
        />
        <path d="M 152 300 Q 200 330 248 300" stroke="#c99512" strokeWidth={2.5} fill="none" opacity={0.6} />
        {/* shirt placket */}
        <path d="M 200 232 L 200 300" stroke="#b5830f" strokeWidth={3} />
        <circle cx={200} cy={258} r={3.4} fill="#b5830f" />
        <circle cx={200} cy={280} r={3.4} fill="#b5830f" />
        {/* collar */}
        <path d="M 172 236 L 200 252 L 228 236 L 224 226 L 176 226 Z" fill="#caa013" />

        {/* left arm (viewer-left, his right) */}
        <g {...armA}>
          <rect x={128} y={240} width={30} height={130} rx={15} fill={P.primary} />
          <path d="M 128 358 q 16 22 32 0 l -4 -14 l -26 0 Z" fill={P.skin} />
        </g>

        {/* right arm */}
        <g {...armB}>
          <rect x={242} y={240} width={30} height={130} rx={15} fill={P.primary} />
          <path d="M 240 358 q 16 22 32 0 l -4 -14 l -26 0 Z" fill={P.skin} />
        </g>

        {/* gamcha over left shoulder */}
        <path
          d="M 150 234 L 196 234 L 186 330 Q 168 344 154 326 Z"
          fill="url(#gamchaCheck)"
          stroke="#a83228"
          strokeWidth={2}
        />

        {/* neck */}
        <rect x={184} y={206} width={32} height={30} rx={10} fill={P.skinShade} />

        {/* head group */}
        <g transform="translate(200 150)">
          {/* ears */}
          <circle cx={-48} cy={0} r={13} fill={P.skin} stroke="#9a6335" strokeWidth={2} />
          <circle cx={48} cy={0} r={13} fill={P.skin} stroke="#9a6335" strokeWidth={2} />
          {/* face */}
          <path
            d="M -52 -18 Q -54 -52 0 -56 Q 54 -52 52 -18 Q 56 22 24 44 Q 0 56 -24 44 Q -56 22 -52 -18 Z"
            fill={P.skin}
            stroke="#9a6335"
            strokeWidth={2.5}
          />
          {/* hair combed back */}
          <path
            d="M -54 -24 Q -58 -62 0 -66 Q 58 -62 54 -24 Q 52 -44 34 -50 Q 12 -58 -12 -52 Q -38 -48 -48 -30 Q -52 -26 -54 -24 Z"
            fill={P.hair}
          />
          {eyeFor(expression, blink, sly)}
          {browFor(expression)}
          {/* nose */}
          <path d="M 0 -2 q 7 10 -1 14 q -6 2 -8 -3" stroke="#8a5427" strokeWidth={3} fill="none" strokeLinecap="round" />
          {/* moustache */}
          <path
            d="M -26 10 Q -12 4 0 8 Q 12 4 26 10 Q 14 18 0 14 Q -14 18 -26 10 Z"
            fill={P.hair}
          />
          {/* mouth */}
          <g transform="translate(0 6)">{mouthPath(mouth)}</g>
          {/* cheek blush */}
          <ellipse cx={-36} cy={12} rx={9} ry={5} fill="#a05a30" opacity={0.5} />
          <ellipse cx={36} cy={12} rx={9} ry={5} fill="#a05a30" opacity={0.5} />
        </g>
      </g>
    </svg>
  );
};
