import React from 'react';

/*
 * Bolai — 100% code-drawn character (ZERO bitmap/AI assets).
 * Locked attributes from approved design spec: mustard shirt, cream knee-length
 * dhoti, red-checked gamcha on left shoulder, round belly, black hair + thick moustache.
 * Parametric: expressions, walk cycle, talk visemes, blink, breath, gesture.
 */

const OUT = '#3A2414';
const SKIN = '#EDB27E';
const SKIN_SH = '#CE8D54';
const SHIRT = '#E9A63A';
const SHIRT_SH = '#C67F1E';
const SHIRT_HI = '#F7C25C';
const DHOTI = '#F5ECDA';
const DHOTI_SH = '#D5C39E';
const RED = '#C6402F';
const HAIR = '#26190F';
const SANDAL = '#7A4A26';

export type Expression =
  | 'happy'
  | 'closed'
  | 'greedy'
  | 'shocked'
  | 'regretful'
  | 'proud';

interface FaceParams {
  browY: number;
  browTilt: number;
  browAsym: number;
  lid: number;
  wide: number;
  mouth: 'happyOpen' | 'closedSmile' | 'smirk' | 'shocked' | 'regret' | 'proud';
  tear: boolean;
  headTilt: number;
}

const FACES: Record<Expression, FaceParams> = {
  happy: {browY: -3, browTilt: 0, browAsym: 0, lid: 0.08, wide: 0, mouth: 'happyOpen', tear: false, headTilt: 0},
  closed: {browY: -2, browTilt: 0, browAsym: 0, lid: 0.14, wide: 0, mouth: 'closedSmile', tear: false, headTilt: 0},
  greedy: {browY: -2, browTilt: 10, browAsym: -10, lid: 0.46, wide: -0.08, mouth: 'smirk', tear: false, headTilt: 3},
  shocked: {browY: -13, browTilt: -6, browAsym: 0, lid: 0, wide: 0.5, mouth: 'shocked', tear: false, headTilt: -3},
  regretful: {browY: -7, browTilt: 17, browAsym: 0, lid: 0.34, wide: -0.12, mouth: 'regret', tear: true, headTilt: 4},
  proud: {browY: -9, browTilt: -4, browAsym: 0, lid: 0.1, wide: 0.12, mouth: 'proud', tear: false, headTilt: -5},
};

const Eye: React.FC<{cx: number; cy: number; lid: number; wide: number; closed: boolean}> = ({
  cx,
  cy,
  lid,
  wide,
  closed,
}) => {
  const rx = 13 + wide * 4;
  const ry = 10 + wide * 5;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#FDF9F0" stroke={OUT} strokeWidth={3.5} />
      <circle cx={cx + 3} cy={cy + 1} r={6} fill="#4E3018" />
      <circle cx={cx + 3} cy={cy + 1} r={3} fill="#1E1208" />
      <circle cx={cx + 1.5} cy={cy - 2} r={2.2} fill="#FFFFFF" />
      {closed ? (
        <path
          d={`M ${cx - rx} ${cy} q ${rx} ${ry * 0.8} ${rx * 2} 0`}
          stroke={OUT}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        lid > 0 && (
          <>
            <path
              d={`M ${cx - rx} ${cy - ry} h ${rx * 2} v ${lid * ry * 2.1} h ${-rx * 2} Z`}
              fill={SKIN}
            />
            <path
              d={`M ${cx - rx} ${cy - ry + lid * ry * 2.1} h ${rx * 2}`}
              stroke={OUT}
              strokeWidth={3}
              fill="none"
            />
          </>
        )
      )}
    </g>
  );
};

const Mouth: React.FC<{kind: string; x: number; y: number}> = ({kind, x, y}) => (
  <g transform={`translate(${x} ${y})`}>
    {kind === 'happyOpen' && (
      <>
        <path d="M -20 -2 Q 0 6 20 -2 Q 15 22 0 24 Q -15 22 -20 -2 Z" fill="#6E2F1A" stroke={OUT} strokeWidth={4} />
        <path d="M -15 0 Q 0 6 15 0 L 13 7 Q 0 10 -13 7 Z" fill="#FFF7EA" />
        <ellipse cx={0} cy={18} rx={9} ry={4.5} fill="#B4543B" />
      </>
    )}
    {kind === 'proud' && (
      <g transform="scale(1.18)">
        <path d="M -20 -2 Q 0 6 20 -2 Q 15 22 0 24 Q -15 22 -20 -2 Z" fill="#6E2F1A" stroke={OUT} strokeWidth={4} />
        <path d="M -15 0 Q 0 6 15 0 L 13 7 Q 0 10 -13 7 Z" fill="#FFF7EA" />
        <ellipse cx={0} cy={18} rx={9} ry={4.5} fill="#B4543B" />
      </g>
    )}
    {kind === 'closedSmile' && (
      <>
        <path d="M -17 3 Q 0 15 17 3" stroke={OUT} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M -12 10 Q 0 16 12 10" stroke={SKIN_SH} strokeWidth={2.5} fill="none" />
      </>
    )}
    {kind === 'smirk' && (
      <>
        <path d="M -13 9 Q 5 13 21 -3" stroke={OUT} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M 12 -1 Q 20 -4 21 -3 Q 22 3 14 3 Z" fill="#6E2F1A" />
      </>
    )}
    {kind === 'shocked' && (
      <>
        <ellipse cx={0} cy={9} rx={14} ry={18} fill="#6E2F1A" stroke={OUT} strokeWidth={4} />
        <path d="M -11 0 Q 0 -5 11 0 L 10 5 Q 0 8 -10 5 Z" fill="#FFF7EA" />
        <ellipse cx={0} cy={21} rx={8} ry={5} fill="#B4543B" />
      </>
    )}
    {(kind === 'talkWide' || kind === 'talkMid') && (
      <g transform={kind === 'talkWide' ? 'scale(1.05)' : 'scale(0.78)'}>
        <path d="M -18 -2 Q 0 5 18 -2 Q 14 20 0 22 Q -14 20 -18 -2 Z" fill="#6E2F1A" stroke={OUT} strokeWidth={4} />
        <path d="M -13 0 Q 0 5 13 0 L 11 6 Q 0 9 -11 6 Z" fill="#FFF7EA" />
        <ellipse cx={0} cy={16} rx={8} ry={4} fill="#B4543B" />
      </g>
    )}
    {kind === 'regret' && (
      <path d="M -15 12 Q 0 3 15 12" stroke={OUT} strokeWidth={5} fill="none" strokeLinecap="round" />
    )}
  </g>
);

const Arm: React.FC<{sx: number; sy: number; swing: number; elbow: number; dark: boolean}> = ({
  sx,
  sy,
  swing,
  elbow,
  dark,
}) => {
  const skin = dark ? SKIN_SH : SKIN;
  return (
    <g transform={`rotate(${swing} ${sx} ${sy})`}>
      {/* upper arm */}
      <path
        d={`M ${sx - 15} ${sy} Q ${sx - 18} ${sy + 45} ${sx - 11} ${sy + 92} L ${sx + 12} ${sy + 92} Q ${sx + 17} ${sy + 45} ${sx + 14} ${sy} Z`}
        fill={skin}
        stroke={OUT}
        strokeWidth={4.5}
      />
      {/* forearm */}
      <g transform={`rotate(${elbow} ${sx} ${sy + 92})`}>
        <path
          d={`M ${sx - 11} ${sy + 92} Q ${sx - 13} ${sy + 130} ${sx - 8} ${sy + 168} L ${sx + 9} ${sy + 168} Q ${sx + 13} ${sy + 130} ${sx + 12} ${sy + 92} Z`}
          fill={skin}
          stroke={OUT}
          strokeWidth={4.5}
        />
        <circle cx={sx} cy={sy + 180} r={13} fill={skin} stroke={OUT} strokeWidth={4.5} />
        <path d={`M ${sx + 6} ${sy + 172} q 12 2 10 14`} stroke={OUT} strokeWidth={3.5} fill="none" />
      </g>
      {/* sleeve cap */}
      <ellipse cx={sx} cy={sy + 6} rx={26} ry={32} fill={dark ? SHIRT_SH : SHIRT} stroke={OUT} strokeWidth={4.5} />
      <path d={`M ${sx - 22} ${sy + 30} q 22 12 44 0`} stroke={OUT} strokeWidth={3.5} fill="none" />
    </g>
  );
};

const Leg: React.FC<{hx: number; hy: number; thigh: number; calf: number; dark: boolean}> = ({
  hx,
  hy,
  thigh,
  calf,
  dark,
}) => {
  const skin = dark ? SKIN_SH : SKIN;
  const kneeY = hy + 110;
  const ankleY = kneeY + 90;
  return (
    <g transform={`rotate(${thigh} ${hx} ${hy})`}>
      <path
        d={`M ${hx - 17} ${hy} Q ${hx - 20} ${hy + 55} ${hx - 13} ${kneeY} L ${hx + 13} ${kneeY} Q ${hx + 18} ${hy + 55} ${hx + 16} ${hy} Z`}
        fill={skin}
        stroke={OUT}
        strokeWidth={4.5}
      />
      <g transform={`rotate(${calf} ${hx} ${kneeY})`}>
        <path
          d={`M ${hx - 13} ${kneeY} Q ${hx - 15} ${kneeY + 45} ${hx - 10} ${ankleY} L ${hx + 10} ${ankleY} Q ${hx + 14} ${kneeY + 45} ${hx + 13} ${kneeY} Z`}
          fill={skin}
          stroke={OUT}
          strokeWidth={4.5}
        />
        {/* sandal */}
        <g transform={`translate(${hx + 2} ${ankleY + 6})`}>
          <ellipse cx={0} cy={12} rx={24} ry={9} fill={SANDAL} stroke={OUT} strokeWidth={4.5} />
          <path d="M -16 8 Q 0 -8 16 8" stroke={OUT} strokeWidth={4} fill="none" />
          <path d="M 0 -6 l 0 16" stroke={OUT} strokeWidth={3.5} fill="none" />
        </g>
      </g>
    </g>
  );
};

export const Bolai: React.FC<{
  expression?: Expression;
  walking?: boolean;
  walkPhase?: number;
  talking?: boolean;
  frame?: number;
  width?: number;
  style?: React.CSSProperties;
}> = ({
  expression = 'happy',
  walking = false,
  walkPhase = 0,
  talking = false,
  frame = 0,
  width = 420,
  style,
}) => {
  const f = FACES[expression];
  const blink = (frame + 31) % 97 < 4;

  // walk cycle
  const p = walkPhase;
  const thighL = walking ? Math.sin(p) * 26 : 0;
  const thighR = walking ? Math.sin(p + Math.PI) * 26 : 0;
  const calfL = walking ? Math.max(0, Math.sin(p + 2.3)) * 44 : 5;
  const calfR = walking ? Math.max(0, Math.sin(p + Math.PI + 2.3)) * 44 : 5;
  const armSwingL = walking ? Math.sin(p + Math.PI) * 22 : 2;
  const armSwingR = talking ? -18 + Math.sin(frame / 5) * 5 : walking ? Math.sin(p) * 22 : 2;
  const armElbowR = talking ? -64 + Math.sin(frame / 5) * 7 : walking ? -12 : -6;

  const bob = walking ? Math.abs(Math.sin(p)) * 9 : Math.sin(frame / 15) * 2.5;
  const lean = walking ? 5 : talking ? 2 : 0;
  const breath = Math.sin(frame / 15) * 0.012;

  // talking viseme: alternate open / mid / closed
  let mouthKind: string = f.mouth;
  if (talking) {
    const ph = frame % 12;
    mouthKind = ph < 5 ? 'talkWide' : ph < 8 ? 'talkMid' : 'closedSmile';
  }

  const HX = 228; // head center x
  const HY = 118; // head center y

  return (
    <svg
      viewBox="0 0 420 790"
      width={width}
      height={(width * 790) / 420}
      style={style}
      overflow="visible"
    >
      <defs>
        <pattern id="gamchaChecks" width={18} height={18} patternUnits="userSpaceOnUse">
          <rect width={18} height={18} fill={RED} />
          <path d="M0 9 h18 M9 0 v18" stroke="#F6E7D2" strokeWidth={5} opacity={0.75} />
        </pattern>
        <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SHIRT_HI} />
          <stop offset="45%" stopColor={SHIRT} />
          <stop offset="100%" stopColor={SHIRT_SH} />
        </linearGradient>
        <linearGradient id="dhotiGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF4E6" />
          <stop offset="100%" stopColor={DHOTI_SH} />
        </linearGradient>
      </defs>

      <g transform={`translate(0 ${-bob})`}>
        {/* far arm (viewer left, behind torso) */}
        <Arm sx={158} sy={238} swing={armSwingL} elbow={-8} dark />
        {/* far leg */}
        <Leg hx={190} hy={520} thigh={thighL} calf={calfL} dark />
        {/* near leg */}
        <Leg hx={256} hy={520} thigh={thighR} calf={calfR} dark={false} />

        <g transform={`rotate(${lean} 228 420)`}>
          {/* dhoti */}
          <path
            d="M 158 404 Q 212 428 266 402 L 280 468 Q 286 542 260 584 L 172 586 Q 148 542 154 468 Z"
            fill="url(#dhotiGrad)"
            stroke={OUT}
            strokeWidth={5}
          />
          <path d="M 196 430 Q 190 500 196 578" stroke={DHOTI_SH} strokeWidth={4} fill="none" />
          <path d="M 236 428 Q 244 500 238 580" stroke={DHOTI_SH} strokeWidth={4} fill="none" />
          <path d="M 160 560 Q 214 576 268 558" stroke={DHOTI_SH} strokeWidth={4} fill="none" />
          <path d="M 172 586 L 260 584" stroke={RED} strokeWidth={6} opacity={0.85} />

          {/* torso / shirt with belly */}
          <g transform={`translate(228 330) scale(${1 + breath}) translate(-228 -330)`}>
            <path
              d="M 162 224 Q 152 262 150 302 Q 148 352 172 396 Q 212 418 254 408 Q 288 384 288 320 Q 290 266 276 228 Q 240 208 200 213 Q 176 215 162 224 Z"
              fill="url(#shirtGrad)"
              stroke={OUT}
              strokeWidth={5}
            />
            {/* belly shading + folds */}
            <path d="M 168 340 Q 200 384 250 380" stroke={SHIRT_SH} strokeWidth={4} fill="none" opacity={0.7} />
            <path d="M 158 300 q 14 20 6 44" stroke={SHIRT_SH} strokeWidth={3.5} fill="none" opacity={0.6} />
            <path d="M 284 300 q -12 22 -6 46" stroke={SHIRT_SH} strokeWidth={3.5} fill="none" opacity={0.6} />
            <ellipse cx={206} cy={262} rx={30} ry={40} fill={SHIRT_HI} opacity={0.35} />
            {/* placket + buttons */}
            <path d="M 232 222 L 236 404" stroke={SHIRT_SH} strokeWidth={3.5} fill="none" />
            <circle cx={234} cy={266} r={5} fill={OUT} />
            <circle cx={236} cy={318} r={5} fill={OUT} />
            {/* collar */}
            <path d="M 206 216 Q 228 236 252 214" stroke={OUT} strokeWidth={4} fill="none" />
          </g>

          {/* gamcha on left shoulder */}
          <path
            d="M 154 222 Q 130 262 134 336 L 172 342 Q 166 266 182 230 Z"
            fill="url(#gamchaChecks)"
            stroke={OUT}
            strokeWidth={4.5}
          />
          <path d="M 136 336 L 172 342 L 168 404 Q 150 410 142 402 Z" fill="url(#gamchaChecks)" stroke={OUT} strokeWidth={4.5} />
          <path d="M 144 404 l -2 14 M 154 406 l -1 14 M 164 406 l 1 13" stroke={OUT} strokeWidth={3} />

          {/* near arm (in front, gestures when talking) */}
          <Arm sx={286} sy={238} swing={armSwingR} elbow={armElbowR} dark={false} />

          {/* head */}
          <g transform={`translate(${HX} ${HY}) rotate(${f.headTilt})`}>
            {/* neck */}
            <rect x={-16} y={60} width={40} height={34} fill={SKIN_SH} stroke={OUT} strokeWidth={4} />
            {/* skull */}
            <ellipse cx={0} cy={-6} rx={64} ry={68} fill={SKIN} stroke={OUT} strokeWidth={5} />
            {/* jaw/chin shade */}
            <path d="M -40 34 Q 0 62 44 30" stroke={SKIN_SH} strokeWidth={4} fill="none" opacity={0.7} />
            {/* ear */}
            <ellipse cx={-56} cy={8} rx={12} ry={16} fill={SKIN} stroke={OUT} strokeWidth={4} />
            <path d="M -58 4 q 6 4 2 10" stroke={OUT} strokeWidth={3} fill="none" />
            {/* hair */}
            <path
              d="M -66 -10 Q -72 -84 0 -88 Q 68 -82 64 -12 Q 42 -40 12 -44 Q -30 -48 -66 -10 Z"
              fill={HAIR}
              stroke={OUT}
              strokeWidth={5}
            />
            <path d="M -40 -70 Q 0 -82 40 -66" stroke="#4A3826" strokeWidth={5} fill="none" opacity={0.9} />
            {/* sideburn */}
            <path d="M -62 -8 q -2 18 4 26 L -50 8 Z" fill={HAIR} />
            {/* brows */}
            <g transform={`translate(0 ${f.browY})`}>
              <path d="M -40 -34 q 20 -10 38 -2" stroke={HAIR} strokeWidth={8} fill="none" strokeLinecap="round" transform={`rotate(${f.browTilt} -21 -36)`} />
              <path d="M 14 -36 q 18 -8 36 0" stroke={HAIR} strokeWidth={8} fill="none" strokeLinecap="round" transform={`rotate(${f.browTilt + f.browAsym} 32 -38)`} />
            </g>
            {/* eyes */}
            <Eye cx={-18} cy={-14} lid={blink ? 1 : f.lid} wide={f.wide} closed={blink} />
            <Eye cx={30} cy={-14} lid={blink ? 1 : f.lid} wide={f.wide} closed={blink} />
            {/* nose */}
            <path d="M 8 -6 Q 18 8 10 16 Q 4 18 2 12" stroke={OUT} strokeWidth={4.5} fill="none" strokeLinecap="round" />
            <ellipse cx={7} cy={17} rx={3} ry={2.2} fill={SKIN_SH} />
            {/* moustache */}
            <path
              d="M -26 28 Q 0 18 32 26 Q 38 36 26 40 Q 0 32 -18 40 Q -32 38 -26 28 Z"
              fill={HAIR}
              stroke={OUT}
              strokeWidth={4}
            />
            {/* mouth */}
            <Mouth kind={mouthKind} x={8} y={44} />
            {/* cheek blush */}
            <ellipse cx={-38} cy={16} rx={12} ry={8} fill="#D97F4E" opacity={0.35} />
            {/* regret tears */}
            {f.tear && (
              <>
                <path d="M -22 -4 q -5 10 0 14 q 6 -4 0 -14 Z" fill="#9FD4E8" stroke={OUT} strokeWidth={2} />
                <circle cx={-23} cy={22 + ((frame * 2) % 26)} r={4} fill="#9FD4E8" opacity={0.85} />
              </>
            )}
          </g>
        </g>
      </g>
    </svg>
  );
};

export const TALK_WIDE = 'talkWide';
export const TALK_MID = 'talkMid';
