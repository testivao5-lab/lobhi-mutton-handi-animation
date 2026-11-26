import React from 'react';
import {CHARACTER_PALETTES, Expression, MouthShape} from '../CharacterRig';

/**
 * Bolai (C01) rig v2 — rebuilt after the owner REJECTED test clip v1.
 * Upgrades vs v1: pear torso w/ shading, two-segment arms (elbow joint),
 * knee-bend legs, moustache talk-bounce, head tilt + nod, gamcha spring
 * follow-through, bold outlines matching the APPROVED model sheet v1,
 * squash & stretch + body lean in the walk, anticipation-ready wave/point props.
 */

const P = CHARACTER_PALETTES.C01;
const OUT = '#4a2c14'; // bold outline color (matches approved sheet)

export interface BolaiProps {
  expression?: Expression;
  mouth?: MouthShape;
  /** walk cycle phase (radians). 0 = standing idle */
  walkPhase?: number;
  /** 0..1 (+ anticipation handled by caller via negative values) — right arm raise */
  wave?: number;
  /** 0..1 — right arm extended pointing toward frame-left (his right) */
  point?: number;
  blink?: boolean;
  /** 0..1 greedy eye narrowing */
  sly?: number;
  /** 0..1..-0.2 — body lean (positive = forward) */
  lean?: number;
  scale?: number;
  x?: number;
  y?: number;
  /** speaking flag: drives moustache bounce */
  talking?: boolean;
}

const mouthPath = (m: MouthShape): React.ReactNode => {
  switch (m) {
    case 'open-wide':
      return (
        <g>
          <path d="M -13 8 Q 0 34 13 8 Q 0 14 -13 8 Z" fill="#4a1e1a" stroke={OUT} strokeWidth={2} />
          <path d="M -7 20 Q 0 26 7 20 Q 0 30 -7 20 Z" fill="#a8453a" />
        </g>
      );
    case 'open-small':
      return <ellipse cx={0} cy={16} rx={9} ry={8} fill="#4a1e1a" stroke={OUT} strokeWidth={2} />;
    case 'round':
      return <ellipse cx={0} cy={17} rx={7.5} ry={11} fill="#4a1e1a" stroke={OUT} strokeWidth={2} />;
    case 'smile-open':
      return (
        <g>
          <path d="M -15 10 Q 0 32 15 10 Q 0 18 -15 10 Z" fill="#4a1e1a" stroke={OUT} strokeWidth={2} />
          <path d="M -10 12 Q 0 17 10 12 L 10 10 Q 0 14 -10 10 Z" fill="#f7f3ea" />
        </g>
      );
    case 'closed':
      return <path d="M -11 15 Q 0 21 11 15" stroke={OUT} strokeWidth={3.4} fill="none" strokeLinecap="round" />;
    default: // rest
      return <path d="M -9 16 Q 0 19 9 16" stroke={OUT} strokeWidth={3.2} fill="none" strokeLinecap="round" />;
  }
};

const BrowSet: React.FC<{exp: Expression}> = ({exp}) => {
  // per-expression brow geometry: [leftDy, rightDy, innerDrop]
  const cfg: Record<string, [number, number, number]> = {
    angry: [4, 4, 10],
    greedy: [2, 2, 6],
    suspicious: [1, 1, 5],
    nervous: [-4, -2, 2],
    shocked: [-10, -10, -2],
    surprised: [-10, -10, -2],
    sad: [-2, -2, 8],
    regretful: [-2, -2, 8],
    crying: [-3, -3, 9],
    proud: [-4, -4, 0],
    happy: [-3, -3, 0],
    cunning: [1, 1, 6],
    calm: [0, 0, 0],
  };
  const [ldy, rdy, inner] = cfg[exp] ?? [0, 0, 0];
  return (
    <g stroke={P.hair} strokeWidth={6} strokeLinecap="round" fill="none">
      <path d={`M -40 ${-22 + ldy} Q -26 ${-30 + ldy + inner * 0.5} -14 ${-24 + ldy + inner}`} />
      <path d={`M 14 ${-24 + rdy + inner} Q 26 ${-30 + rdy + inner * 0.5} 40 ${-22 + rdy}`} />
    </g>
  );
};

const EyeSet: React.FC<{blink: boolean; exp: Expression; sly: number}> = ({blink, exp, sly}) => {
  const narrow = exp === 'suspicious' || exp === 'greedy' || exp === 'cunning' || sly > 0;
  const ry = narrow ? 4.2 : 8.2;
  const wide = exp === 'shocked' || exp === 'surprised';
  const r = wide ? 5.4 : 4.6;
  if (blink) {
    return (
      <g stroke={OUT} strokeWidth={3.2} fill="none" strokeLinecap="round">
        <path d="M -36 -6 q 10 6 20 0" />
        <path d="M 16 -6 q 10 6 20 0" />
      </g>
    );
  }
  return (
    <g>
      {[[-26], [22]].map(([cx], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={-6} rx={11} ry={ry} fill="#f7f3ea" stroke={OUT} strokeWidth={2.4} />
          <circle cx={cx + 2} cy={-5} r={r} fill="#2a1c12" />
          <circle cx={cx + 4} cy={-7.5} r={1.5} fill="#fff" />
        </g>
      ))}
    </g>
  );
};

export const Bolai: React.FC<BolaiProps> = ({
  expression = 'happy',
  mouth = 'rest',
  walkPhase = 0,
  wave = 0,
  point = 0,
  blink = false,
  sly = 0,
  lean = 0,
  scale = 1,
  x = 0,
  y = 0,
  talking = false,
}) => {
  const walking = walkPhase !== 0;
  const swing = Math.sin(walkPhase) * 26;
  // vertical bounce (2 beats per cycle) + squash/stretch
  const bob = walking ? Math.abs(Math.cos(walkPhase)) * 7 : Math.sin(walkPhase * 0.4) * 1.6;
  const sq = walking ? 1 + Math.sin(walkPhase * 2) * 0.02 : 1;
  const bodyLean = (walking ? 3 : 0) + lean * 8;

  const kneeL = Math.max(0, Math.sin(walkPhase + 0.9)) * 26;
  const kneeR = Math.max(0, Math.sin(walkPhase + Math.PI + 0.9)) * 26;
  const hipSwingL = walking ? swing * 0.9 : 0;
  const hipSwingR = walking ? -swing * 0.9 : 0;

  // arm geometry: wave raises right arm; point extends it forward-left
  const shoulderY = 246;
  const raiseR = wave * 118 + point * 66; // degrees
  const elbowR = -28 * wave - 52 * point + (wave > 0.4 ? Math.sin(walkPhase * 1.6) * 8 * wave : 0);
  const armSwingL = walking ? swing * 0.75 : Math.sin(walkPhase * 0.4) * 2;
  const armSwingR = walking ? -swing * 0.5 : 0;

  // gamcha follow-through: lagged derivative of body bob (spring feel)
  const gamchaLag = walking ? Math.sin(walkPhase - 1.1) * 7 : Math.sin(walkPhase * 0.4 - 0.8) * 2;
  // moustache talk bounce
  const moBounce = talking && mouth !== 'rest' ? Math.sin(walkPhase * 3.1) * 0.6 : 0;
  // head tilt + occasional nod driven by phase
  const headTilt = Math.sin(walkPhase * 0.5) * 2 + (talking ? Math.sin(walkPhase * 0.9) * 1.4 : 0);
  const headNod = talking ? Math.abs(Math.sin(walkPhase * 0.45)) * 2.2 : 0;

  return (
    <svg
      viewBox="0 0 400 620"
      width={400 * scale}
      height={620 * scale}
      style={{position: 'absolute', left: x, top: y, overflow: 'visible'}}
    >
      <defs>
        <pattern id="gamchaCheckV2" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill={P.accent} />
          <rect width="8" height="8" fill="#eee6d6" opacity={0.9} />
          <rect x={8} y={8} width="8" height="8" fill="#eee6d6" opacity={0.9} />
        </pattern>
      </defs>

      <ellipse cx={200} cy={598} rx={108} ry={15} fill="rgba(40,20,10,0.25)" />

      <g transform={`translate(200 596) scale(1 ${sq}) translate(-200 -596)`}>
        <g transform={`translate(0 ${-bob}) rotate(${bodyLean} 200 560)`}>
          {/* ---- legs (thigh + shin with knee) ---- */}
          <g transform={`rotate(${hipSwingL} 180 400)`}>
            <path d="M 165 396 L 197 396 L 193 468 L 169 468 Z" fill={P.secondary} stroke={OUT} strokeWidth={2.5} />
            <g transform={`rotate(${kneeL} 181 468)`}>
              <path d="M 168 466 L 194 466 L 191 545 L 171 545 Z" fill={P.secondary} stroke={OUT} strokeWidth={2.5} />
              <path d="M 160 543 Q 182 536 204 543 L 200 560 Q 182 566 164 560 Z" fill="#7a4a28" stroke={OUT} strokeWidth={2.5} />
            </g>
          </g>
          <g transform={`rotate(${hipSwingR} 222 400)`}>
            <path d="M 207 396 L 239 396 L 235 468 L 211 468 Z" fill={P.secondary} stroke={OUT} strokeWidth={2.5} />
            <g transform={`rotate(${kneeR} 223 468)`}>
              <path d="M 210 466 L 236 466 L 233 545 L 213 545 Z" fill={P.secondary} stroke={OUT} strokeWidth={2.5} />
              <path d="M 202 543 Q 224 536 246 543 L 242 560 Q 224 566 206 560 Z" fill="#7a4a28" stroke={OUT} strokeWidth={2.5} />
            </g>
          </g>

          {/* ---- dhoti with hem sway ---- */}
          <path
            d={`M 136 378 L 264 378 L ${272 + gamchaLag * 0.4} 512 Q 200 536 ${128 - gamchaLag * 0.4} 512 Z`}
            fill={P.secondary}
            stroke={OUT}
            strokeWidth={3}
          />
          <path d="M 170 386 L 165 518 M 200 390 L 200 524 M 230 386 L 236 518" stroke="#d6cbb0" strokeWidth={3} fill="none" opacity={0.85} />
          <path d="M 136 378 L 264 378 L 262 396 L 138 396 Z" fill="#e4dbc2" opacity={0.55} />

          {/* ---- torso: pear + belly, shaded ---- */}
          <path
            d="M 142 248 Q 130 316 144 362 Q 200 396 256 362 Q 270 316 258 248 Q 200 224 142 248 Z"
            fill={P.primary}
            stroke={OUT}
            strokeWidth={3}
          />
          <path
            d="M 158 268 Q 148 316 158 352 Q 186 368 210 364 Q 178 336 176 296 Q 172 276 158 268 Z"
            fill="#c9950f"
            opacity={0.45}
          />
          <path d="M 200 236 L 200 304" stroke={OUT} strokeWidth={3} opacity={0.8} />
          <circle cx={200} cy={260} r={3.6} fill={OUT} />
          <circle cx={200} cy={284} r={3.6} fill={OUT} />
          <path d="M 170 236 L 200 254 L 230 236 L 226 224 L 174 224 Z" fill="#caa013" stroke={OUT} strokeWidth={2.5} />

          {/* ---- left arm (his right; viewer-left) ---- */}
          <g transform={`rotate(${armSwingL} 146 252)`}>
            <path d="M 132 244 Q 122 300 128 342 L 156 342 Q 162 300 158 248 Z" fill={P.primary} stroke={OUT} strokeWidth={2.8} />
            <g transform={`rotate(${-14 - armSwingL * 0.4} 142 342)`}>
              <path d="M 130 340 Q 126 372 134 396 L 156 394 Q 160 368 156 340 Z" fill={P.primary} stroke={OUT} strokeWidth={2.8} />
              <circle cx={145} cy={402} r={11} fill={P.skin} stroke={OUT} strokeWidth={2.5} />
            </g>
          </g>

          {/* ---- right arm (wave / point) ---- */}
          <g transform={`rotate(${-armSwingR - raiseR} 254 252)`}>
            <path d="M 244 244 Q 254 300 250 342 L 276 340 Q 280 298 272 248 Z" fill={P.primary} stroke={OUT} strokeWidth={2.8} />
            <g transform={`rotate(${elbowR} 262 340)`}>
              <path d="M 250 338 Q 254 372 248 396 L 270 398 Q 278 368 274 340 Z" fill={P.primary} stroke={OUT} strokeWidth={2.8} />
              <circle cx={258} cy={404} r={11} fill={P.skin} stroke={OUT} strokeWidth={2.5} />
              {point > 0.3 && (
                <path d="M 252 402 L 220 412" stroke={P.skin} strokeWidth={9} strokeLinecap="round" opacity={point} />
              )}
            </g>
          </g>

          {/* ---- gamcha with spring follow-through ---- */}
          <g transform={`rotate(${gamchaLag} 172 236)`}>
            <path d="M 148 232 L 196 232 L 184 336 Q 166 350 150 330 Z" fill="url(#gamchaCheckV2)" stroke="#a83228" strokeWidth={2.5} />
            <path d="M 188 300 Q 200 330 190 356" stroke="#a83228" strokeWidth={2.5} fill="none" />
          </g>

          {/* ---- neck ---- */}
          <path d="M 182 206 L 218 206 L 214 240 L 186 240 Z" fill={P.skinShade} stroke={OUT} strokeWidth={2.2} />

          {/* ---- head ---- */}
          <g transform={`translate(200 150) rotate(${headTilt}) translate(0 ${headNod})`}>
            <circle cx={-50} cy={2} r={12} fill={P.skin} stroke={OUT} strokeWidth={2.4} />
            <circle cx={50} cy={2} r={12} fill={P.skin} stroke={OUT} strokeWidth={2.4} />
            <path
              d="M -54 -16 Q -58 -56 0 -62 Q 58 -56 54 -16 Q 60 24 26 46 Q 0 60 -26 46 Q -60 24 -54 -16 Z"
              fill={P.skin}
              stroke={OUT}
              strokeWidth={3}
            />
            <path d="M -50 6 Q -30 52 0 54 Q 30 52 50 6 Q 44 40 22 50 Q 0 58 -22 50 Q -44 40 -50 6 Z" fill={P.skinShade} opacity={0.35} />
            {/* hair combed back, side part */}
            <path
              d="M -56 -22 Q -62 -66 0 -72 Q 62 -66 56 -22 Q 54 -46 38 -54 Q 16 -62 -8 -56 Q -34 -52 -46 -32 Q -52 -26 -56 -22 Z"
              fill={P.hair}
            />
            <path d="M 8 -70 Q 2 -58 -4 -54" stroke="#3a2a20" strokeWidth={2} fill="none" />
            <EyeSet blink={blink} exp={expression} sly={sly} />
            <BrowSet exp={expression} />
            <path d="M 0 -2 q 8 11 -1 15 q -7 3 -9 -2" stroke="#8a5427" strokeWidth={3.2} fill="none" strokeLinecap="round" />
            {/* moustache w/ talk bounce */}
            <g transform={`translate(0 ${moBounce})`}>
              <path
                d="M -28 12 Q -14 4 0 9 Q 14 4 28 12 Q 15 21 0 16 Q -15 21 -28 12 Z"
                fill={P.hair}
                stroke={OUT}
                strokeWidth={1.6}
              />
            </g>
            <g transform="translate(0 8)">{mouthPath(mouth)}</g>
            <ellipse cx={-38} cy={14} rx={9} ry={5} fill="#a05a30" opacity={0.45} />
            <ellipse cx={38} cy={14} rx={9} ry={5} fill="#a05a30" opacity={0.45} />
          </g>
        </g>
      </g>
    </svg>
  );
};
