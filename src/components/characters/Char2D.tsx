import React from 'react';
import {INK} from '../../config/style';

/*
 * Char2D — skill house style: 2D flat-shaded cartoon people standing inside
 * the 3D world. Built from flat shapes with a hand-drawn ink band (#351f22)
 * of varying, slightly wobbly thickness. Base: large rounded head, calm
 * half-lidded eyes, small mouth, hair fringe, collar, small pear-shaped
 * two-tone torso with pocket patch, thin tapered limbs, dark disc hands.
 * Adapted per story character (palette/hair/headwear/glasses/moustache/
 * belly/female drape) — base construction never redesigned.
 * Yaw clamp ±0.7 rad so characters never go edge-on.
 */

export type Expression = 'neutral' | 'happy' | 'closed' | 'greedy' | 'shocked' | 'regretful' | 'proud';

export interface CharConfig {
  id: string;
  name: string;
  skin: string;
  skinShade: string;
  hair: string;
  top: string;
  topShade: string;
  bottom: string;
  patch?: string;
  collar?: 'kurta' | 'shirt' | 'saree' | 'none';
  headwear?: 'none' | 'cap' | 'turban' | 'gamcha' | 'tophat';
  headwearColor?: string;
  glasses?: boolean;
  moustache?: 'none' | 'thick' | 'thin';
  belly?: boolean;
  female?: boolean;
  child?: boolean;
  seed: number;
}

const INKW = 4.2;

/** deterministic jitter for hand-drawn wobble */
function jitter(seed: number, i: number, amount = 1.6): number {
  let s = (seed * 7919 + i * 104729) >>> 0;
  s = (s * 1664525 + 1013904223) >>> 0;
  return ((s / 4294967296) * 2 - 1) * amount;
}

/** Cast palette (locked design attributes → code-drawn spec). */
export const CAST: Record<string, CharConfig> = {
  bolai: {
    id: 'C01', name: 'Bolai', skin: '#f2c89b', skinShade: '#d9a06c', hair: '#26190f',
    top: '#e9a63a', topShade: '#c67f1e', bottom: '#f5ecda', patch: '#c6402f',
    collar: 'kurta', headwear: 'gamcha', headwearColor: '#c6402f',
    moustache: 'thick', belly: true, seed: 11,
  },
  champa: {
    id: 'C02', name: 'Champa', skin: '#f0c193', skinShade: '#d69a63', hair: '#1e130c',
    top: '#7fae5a', topShade: '#5e8a3c', bottom: '#c6402f',
    collar: 'saree', female: true, seed: 23,
  },
  subol: {
    id: 'C03', name: 'Subol', skin: '#eab887', skinShade: '#cf9256', hair: '#312012',
    top: '#5a7fb5', topShade: '#40618f', bottom: '#e8dcc4',
    collar: 'kurta', moustache: 'thin', seed: 31,
  },
  tapan: {
    id: 'C04', name: 'Tapan', skin: '#f2c89b', skinShade: '#d9a06c', hair: '#26190f',
    top: '#8a8f96', topShade: '#6e737a', bottom: '#5e5a50',
    collar: 'shirt', glasses: true, seed: 43,
  },
  fatik: {
    id: 'C05', name: 'Fatik', skin: '#e2a870', skinShade: '#c68a4e', hair: '#1e130c',
    top: '#3e6e50', topShade: '#2c5238', bottom: '#e8dcc4',
    collar: 'kurta', headwear: 'gamcha', headwearColor: '#8a3e1e',
    moustache: 'thick', belly: true, seed: 57,
  },
  soumen: {
    id: 'C06', name: 'Soumen', skin: '#f2c89b', skinShade: '#d9a06c', hair: '#26190f',
    top: '#c98a3e', topShade: '#a86c26', bottom: '#e8dcc4',
    collar: 'kurta', child: true, seed: 61,
  },
  bhavesh: {
    id: 'C07', name: 'Bhavesh', skin: '#e8b482', skinShade: '#cd9051', hair: '#4a4238',
    top: '#e8dcc4', topShade: '#c9bda1', bottom: '#e8dcc4',
    collar: 'kurta', headwear: 'turban', headwearColor: '#e8e2d2',
    moustache: 'thick', seed: 71,
  },
  prabhat: {
    id: 'C08', name: 'Prabhat', skin: '#f0c193', skinShade: '#d69a63', hair: '#5e5248',
    top: '#7a6e8e', topShade: '#5e5470', bottom: '#4a4438',
    collar: 'kurta', glasses: true, moustache: 'thin', seed: 83,
  },
  raybabu: {
    id: 'C09', name: 'Raybabu', skin: '#eab887', skinShade: '#cf9256', hair: '#1e130c',
    top: '#f6f2e8', topShade: '#d8d2c2', bottom: '#f6f2e8',
    collar: 'shirt', headwear: 'tophat', headwearColor: '#f6f2e8',
    glasses: true, seed: 97,
  },
  daroga: {
    id: 'C10', name: 'Daroga', skin: '#e2a870', skinShade: '#c68a4e', hair: '#1e130c',
    top: '#5e5a50', topShade: '#46433c', bottom: '#3a3830',
    collar: 'shirt', headwear: 'cap', headwearColor: '#3a3830',
    moustache: 'thick', seed: 103,
  },
  officer: {
    id: 'C11', name: 'Food Officer', skin: '#f2c89b', skinShade: '#d9a06c', hair: '#312012',
    top: '#d8d2c2', topShade: '#b8b2a2', bottom: '#5e5a50',
    collar: 'shirt', headwear: 'cap', headwearColor: '#8a8f96',
    glasses: true, seed: 113,
  },
  narrator: {
    id: 'NAR', name: 'Narrator', skin: '#f2c89b', skinShade: '#d9a06c', hair: '#26190f',
    top: '#4a4438', topShade: '#36322a', bottom: '#e8dcc4',
    collar: 'kurta', moustache: 'thin', seed: 127,
  },
};

function Eye({cx, cy, lid, wide, closed, skin, seed}: {cx: number; cy: number; lid: number; wide: number; closed: boolean; skin: string; seed: number}) {
  const rx = 10 + wide * 3.4;
  const ry = 8.4 + wide * 4;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fdf9f0" stroke={INK} strokeWidth={INKW - 1} />
      <circle cx={cx + 2.4} cy={cy + 1} r={4.6} fill="#4e3018" />
      <circle cx={cx + 1.2} cy={cy - 1.6} r={1.7} fill="#ffffff" />
      {closed || lid > 0 ? (
        <>
          <path
            d={`M ${cx - rx - 1} ${cy} q ${rx + 1} ${ry * (closed ? 0.9 : 0.55 + lid)} ${rx * 2 + 2} 0`}
            stroke={INK}
            strokeWidth={INKW - 0.6}
            fill="none"
            strokeLinecap="round"
          />
          {!closed && (
            <path
              d={`M ${cx - rx} ${cy - ry} h ${rx * 2} v ${lid * ry * 1.7} h ${-rx * 2} Z`}
              fill={skin}
              stroke="none"
            />
          )}
        </>
      ) : null}
      <path
        d={`M ${cx - rx - 2} ${cy - ry - 3.4 + jitter(seed, cx, 1)} q ${rx + 2} -3.6 ${rx * 2 + 4} 0`}
        stroke={INK}
        strokeWidth={INKW - 0.4}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function Mouth({kind, x, y}: {kind: string; x: number; y: number}) {
  if (kind === 'talkWide' || kind === 'happy' || kind === 'proud') {
    const s = kind === 'proud' ? 1.12 : kind === 'talkWide' ? 0.92 : 0.86;
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M -13 -1 Q 0 5 13 -1 Q 10 12 0 13.5 Q -10 12 -13 -1 Z" fill="#6e2f1a" stroke={INK} strokeWidth={3.4} />
        <path d="M -9 1 Q 0 4.5 9 1 L 7.5 5.5 Q 0 7 -7.5 5.5 Z" fill="#fff7ea" />
      </g>
    );
  }
  if (kind === 'talkMid') {
    return (
      <g transform={`translate(${x} ${y}) scale(0.7)`}>
        <path d="M -13 -1 Q 0 5 13 -1 Q 10 12 0 13.5 Q -10 12 -13 -1 Z" fill="#6e2f1a" stroke={INK} strokeWidth={3.4} />
        <ellipse cx={0} cy={9} rx={5.5} ry={3} fill="#b4543b" />
      </g>
    );
  }
  if (kind === 'shocked') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx={0} cy={5} rx={9.5} ry={12} fill="#6e2f1a" stroke={INK} strokeWidth={3.4} />
        <ellipse cx={0} cy={12} rx={5} ry={3.4} fill="#b4543b" />
      </g>
    );
  }
  if (kind === 'smirk') {
    return <path d={`M ${x - 9} ${y + 5} Q ${x + 2} ${y + 8} ${x + 14} ${y - 3}`} stroke={INK} strokeWidth={3.6} fill="none" strokeLinecap="round" />;
  }
  if (kind === 'regret') {
    return <path d={`M ${x - 10} ${y + 8} Q ${x} ${y + 2} ${x + 10} ${y + 8}`} stroke={INK} strokeWidth={3.6} fill="none" strokeLinecap="round" />;
  }
  // closed / neutral tiny smile
  return <path d={`M ${x - 8} ${y + 2} Q ${x} ${y + 7.5} ${x + 8} ${y + 2}`} stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />;
}

const EXP: Record<Expression, {lid: number; wide: number; mouth: string; browY: number; tear?: boolean; headTilt?: number}> = {
  neutral: {lid: 0.42, wide: 0, mouth: 'closed', browY: 0},
  happy: {lid: 0.3, wide: 0.15, mouth: 'happy', browY: -2},
  closed: {lid: 0.42, wide: 0, mouth: 'closed', browY: -1},
  greedy: {lid: 0.62, wide: -0.1, mouth: 'smirk', browY: 2},
  shocked: {lid: 0, wide: 0.55, mouth: 'shocked', browY: -7},
  regretful: {lid: 0.5, wide: -0.15, mouth: 'regret', browY: 5, tear: true},
  proud: {lid: 0.26, wide: 0.2, mouth: 'proud', browY: -5, headTilt: -4},
};

export const Char2D: React.FC<{
  cfg: CharConfig;
  frame?: number;
  expression?: Expression;
  talking?: boolean;
  walking?: boolean;
  walkPhase?: number;
  yaw?: number; // radians, clamped ±0.7
  width?: number;
  style?: React.CSSProperties;
}> = ({cfg, frame = 0, expression = 'neutral', talking = false, walking = false, walkPhase = 0, yaw = 0, width = 240, style}) => {
  const e = EXP[expression];
  const y = Math.max(-0.7, Math.min(0.7, yaw));
  const turn = y / 0.7; // -1..1
  const blink = (frame + cfg.seed * 3) % 103 < 4;

  // walk cycle (thin tapered limbs, knee bend, arm sway)
  const p = walkPhase;
  const legL = walking ? Math.sin(p) * 24 : 2 + Math.sin(frame / 26) * 1.4;
  const legR = walking ? Math.sin(p + Math.PI) * 24 : -2;
  const kneeL = walking ? Math.max(0, Math.sin(p + 2.2)) * 30 : 4;
  const kneeR = walking ? Math.max(0, Math.sin(p + Math.PI + 2.2)) * 30 : 4;
  const armL = walking ? Math.sin(p + Math.PI) * 16 : 3 + Math.sin(frame / 18) * 2;
  const armR = talking ? -26 + Math.sin(frame / 4.6) * 6 : walking ? Math.sin(p) * 16 : -3 + Math.sin(frame / 21) * 2;
  const bob = walking ? Math.abs(Math.sin(p)) * 4.5 : Math.sin(frame / 16) * 1.6;
  const nod = talking ? Math.sin(frame / 9) * 2 : 0;
  const headTilt = (e.headTilt ?? 0) + nod;

  const facing = turn < 0 ? 1 : -1; // feature shift direction
  const fx = turn * 7 * facing; // facial feature offset toward yaw
  const moustache = cfg.moustache ?? 'none';

  let mouth = e.mouth;
  if (talking) {
    const ph = frame % 12;
    mouth = ph < 5 ? 'talkWide' : ph < 8 ? 'talkMid' : 'closed';
  }

  const skin = cfg.skin;
  const sq = 1 - Math.abs(turn) * 0.12; // slight head squash on turn

  return (
    <svg viewBox="0 0 200 330" width={width} height={(width * 330) / 200} style={style} overflow="visible">
      <g transform={`translate(0 ${-bob})`}>
        {/* far leg */}
        <g transform={`rotate(${legL} 92 190)`}>
          <path d="M 87 188 L 84 232 L 92 232 L 94 188 Z" fill={cfg.skinShade} stroke={INK} strokeWidth={INKW - 0.6} strokeLinejoin="round" />
          <g transform={`rotate(${kneeL} 88 232)`}>
            <path d="M 84 230 L 82 276 L 90 276 L 91 230 Z" fill={cfg.skinShade} stroke={INK} strokeWidth={INKW - 0.6} strokeLinejoin="round" />
            <ellipse cx={86} cy={279} rx={9} ry={3.6} fill={INK} />
          </g>
        </g>
        {/* far arm */}
        <g transform={`rotate(${armL} 84 118)`}>
          <path d="M 80 116 L 70 160 L 76 161 L 85 118 Z" fill={cfg.skinShade} stroke={INK} strokeWidth={INKW - 0.6} strokeLinejoin="round" />
          <ellipse cx={72} cy={166} rx={6.4} ry={6.4} fill="#3a2a20" stroke={INK} strokeWidth={2.6} />
        </g>

        {/* torso — pear-shaped two-tone */}
        <g transform={`rotate(${talking ? 1.6 : 0} 100 120)`}>
          <path
            d={`M ${78 + (cfg.belly ? 0 : 2)} 100 Q 70 ${126 + (cfg.belly ? 6 : 0)} ${76 + (cfg.belly ? 4 : 0)} ${cfg.female ? 196 : 178} Q 100 ${cfg.female ? 208 : 188} ${124 - (cfg.belly ? 4 : 0)} ${cfg.female ? 196 : 178} Q ${130 - (cfg.belly ? 0 : 0)} ${126} 122 100 Q 100 ${92 - (cfg.child ? 6 : 0)} ${78} 100 Z`}
            fill={cfg.top}
            stroke={INK}
            strokeWidth={INKW}
            strokeLinejoin="round"
          />
          {/* lower torso band (two-tone) */}
          <path
            d={`M ${76 + (cfg.belly ? 4 : 0)} ${cfg.female ? 158 : 148} Q 100 ${cfg.female ? 172 : 160} ${124 - (cfg.belly ? 4 : 0)} ${cfg.female ? 158 : 148} L ${124 - (cfg.belly ? 4 : 0)} ${cfg.female ? 196 : 178} Q 100 ${cfg.female ? 208 : 188} ${76 + (cfg.belly ? 4 : 0)} ${cfg.female ? 196 : 178} Z`}
            fill={cfg.bottom}
            stroke={INK}
            strokeWidth={INKW - 0.8}
            strokeLinejoin="round"
          />
          {/* pocket patch */}
          {cfg.patch && !cfg.female && (
            <rect x={84 + turn * 4} y={124} width={16} height={13} rx={2} fill={cfg.patch} stroke={INK} strokeWidth={2.6} />
          )}
          {/* belly shading crease */}
          {cfg.belly && <path d="M 82 150 Q 100 162 118 148" stroke={cfg.topShade} strokeWidth={3} fill="none" opacity={0.6} />}
          {/* collar */}
          {cfg.collar === 'kurta' && (
            <path d="M 88 97 L 100 108 L 112 97" stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />
          )}
          {cfg.collar === 'shirt' && (
            <>
              <path d="M 86 96 L 100 106 L 114 96 L 108 90 L 92 90 Z" fill="#fdf9f0" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
              <path d={`M ${100} ${106} L ${96} ${120} M 100 106 L 104 120`} stroke={INK} strokeWidth={3} fill="none" />
            </>
          )}
        </g>

        {/* near leg */}
        <g transform={`rotate(${legR} 108 190)`}>
          <path d="M 104 188 L 108 232 L 116 232 L 112 188 Z" fill={skin} stroke={INK} strokeWidth={INKW - 0.6} strokeLinejoin="round" />
          <g transform={`rotate(${kneeR} 112 232)`}>
            <path d="M 109 230 L 110 276 L 118 276 L 115 230 Z" fill={skin} stroke={INK} strokeWidth={INKW - 0.6} strokeLinejoin="round" />
            <ellipse cx={115} cy={279} rx={9.6} ry={3.8} fill={INK} />
          </g>
        </g>

        {/* female saree drape over shoulder */}
        {cfg.female && (
          <path
            d="M 112 98 Q 126 128 122 168 Q 118 190 108 196 L 100 190 Q 116 160 108 118 Z"
            fill={cfg.bottom}
            stroke={INK}
            strokeWidth={INKW - 1}
            strokeLinejoin="round"
            opacity={0.96}
          />
        )}

        {/* near arm */}
        <g transform={`rotate(${armR} 116 118)`}>
          <path d="M 112 116 L 122 160 L 128 158 L 118 115 Z" fill={skin} stroke={INK} strokeWidth={INKW - 0.6} strokeLinejoin="round" />
          <ellipse cx={126} cy={166} rx={6.8} ry={6.8} fill="#3a2a20" stroke={INK} strokeWidth={2.6} />
        </g>

        {/* head group with yaw clamp + squash */}
        <g transform={`translate(${fx * 0.6} ${headTilt * 0.3}) rotate(${headTilt * 0.4} 100 62)`}>
          <g transform={`translate(100 0) scale(${sq} 1) translate(-100 0)`}>
            {/* neck */}
            <rect x={92} y={78} width={16} height={16} fill={cfg.skinShade} stroke={INK} strokeWidth={3.2} />
            {/* large rounded head */}
            <circle cx={100} cy={56} r={30} fill={skin} stroke={INK} strokeWidth={INKW} />
            {/* hair fringe + back mass (shifts with yaw) */}
            <path
              d={`M 71 ${48 + turn * 2} Q 74 26 100 ${24 + turn * 2} Q ${126 + turn * 2} 26 ${129} ${46 + turn * 2} Q ${120 + turn * 5} 36 ${100 + turn * 6} 37 Q ${80 + turn * 6} 38 ${71} ${48 + turn * 2} Z`}
              fill={cfg.hair}
              stroke={INK}
              strokeWidth={INKW - 0.6}
              strokeLinejoin="round"
            />
            {/* ear (visible side depends on yaw) */}
            {(turn < 0.5 || turn > -0.5) && (
              <ellipse cx={100 - facing * 2 - 29 * (1 - Math.abs(turn) * 0.4) * (turn > 0 ? 1 : -1) * -1} cy={58} rx={5.4} ry={7.4} fill={skin} stroke={INK} strokeWidth={3} />
            )}
            {/* gamcha / headwear */}
            {cfg.headwear === 'gamcha' && (
              <>
                <path
                  d={`M ${72 + turn * 3} 46 Q 100 22 ${126 - turn * 2} 44 L ${122 - turn * 2} 34 Q 100 16 ${76 + turn * 3} 34 Z`}
                  fill={cfg.headwearColor}
                  stroke={INK}
                  strokeWidth={3.2}
                />
                <path d={`M ${124 - turn * 4} 40 Q 132 46 130 58 Q 124 62 120 56 Q 124 48 ${124 - turn * 4} 40 Z`} fill={cfg.headwearColor} stroke={INK} strokeWidth={3} />
                <path d={`M ${74 + turn * 4} 44 Q 70 52 74 62 Q 80 64 82 58 Q 78 50 ${74 + turn * 4} 44 Z`} fill={cfg.headwearColor} stroke={INK} strokeWidth={3} opacity={0.94} />
              </>
            )}
            {cfg.headwear === 'turban' && (
              <path d={`M 70 50 Q 72 24 100 22 Q 128 24 130 50 Q 116 40 100 40 Q 84 40 70 50 Z`} fill={cfg.headwearColor} stroke={INK} strokeWidth={3.6} />
            )}
            {cfg.headwear === 'cap' && (
              <>
                <path d={`M 72 44 Q 74 26 100 25 Q 126 26 128 44 Z`} fill={cfg.headwearColor} stroke={INK} strokeWidth={3.4} />
                <ellipse cx={100} cy={45} rx={34} ry={5.5} fill={cfg.headwearColor} stroke={INK} strokeWidth={3.2} />
              </>
            )}
            {cfg.headwear === 'tophat' && (
              <>
                <rect x={80} y={12} width={40} height={28} rx={4} fill={cfg.headwearColor} stroke={INK} strokeWidth={3.4} />
                <ellipse cx={100} cy={41} rx={30} ry={6.5} fill={cfg.headwearColor} stroke={INK} strokeWidth={3.4} />
                <rect x={80} y={32} width={40} height={5} fill={cfg.bottom === '#f6f2e8' ? '#351f22' : '#c6402f'} opacity={0.85} />
              </>
            )}
            {/* brows */}
            <path
              d={`M ${86 + fx} ${40 + e.browY + jitter(cfg.seed, 1)} q 8 -3.6 16 ${-0.8 + jitter(cfg.seed, 2, 0.8)}`}
              stroke={cfg.hair}
              strokeWidth={3.8}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M ${98 + fx} ${39 + e.browY + jitter(cfg.seed, 3)} q 8 -3 16 0.4`}
              stroke={cfg.hair}
              strokeWidth={3.8}
              fill="none"
              strokeLinecap="round"
            />
            {/* eyes (calm half-lidded default) */}
            <Eye cx={86 + fx} cy={52} lid={blink ? 1 : e.lid} wide={e.wide} closed={blink} skin={skin} seed={cfg.seed} />
            <Eye cx={114 + fx} cy={52} lid={blink ? 1 : e.lid} wide={e.wide} closed={blink} skin={skin} seed={cfg.seed + 1} />
            {/* nose (offset toward yaw) */}
            <path
              d={`M ${100 + fx} 56 q ${3.4 + turn * 2} 7 ${-1 + turn} 11`}
              stroke={INK}
              strokeWidth={3.4}
              fill="none"
              strokeLinecap="round"
            />
            {/* moustache */}
            {moustache !== 'none' && (
              <path
                d={`M ${88 + fx} ${70} Q ${100 + fx} ${64.5} ${112 + fx} ${70} Q ${106 + fx} ${74.5} ${100 + fx} ${73} Q ${94 + fx} ${74.5} ${88 + fx} ${70} Z`}
                fill={moustache === 'thick' ? cfg.hair : '#4a3826'}
                stroke={INK}
                strokeWidth={2.8}
              />
            )}
            {/* mouth */}
            <Mouth kind={mouth} x={100 + fx} y={moustache !== 'none' ? 78 : 76} />
            {/* cheek blush */}
            <ellipse cx={79 + fx} cy={62} rx={7} ry={4.4} fill="#d97f4e" opacity={0.28} />
            <ellipse cx={121 + fx} cy={62} rx={7} ry={4.4} fill="#d97f4e" opacity={0.28} />
            {/* glasses */}
            {cfg.glasses && (
              <g stroke={INK} strokeWidth={2.8} fill="none">
                <circle cx={86 + fx} cy={52} r={11.5} />
                <circle cx={114 + fx} cy={52} r={11.5} />
                <path d={`M ${97.5 + fx} 52 L ${102.5 + fx} 52 M ${74.5 + fx} 49 L ${70 + fx} 47 M ${125.5 + fx} 49 L ${130 + fx} 47`} />
              </g>
            )}
            {/* regret tear */}
            {e.tear && (
              <>
                <path d={`M ${85 + fx} 58 q -3.4 7 0 10 q 4.4 -3 0 -10 Z`} fill="#9fd4e8" stroke={INK} strokeWidth={1.6} />
                <circle cx={84 + fx} cy={74 + ((frame * 1.6) % 20)} r={2.8} fill="#9fd4e8" opacity={0.85} />
              </>
            )}
          </g>
        </g>
      </g>
    </svg>
  );
};
