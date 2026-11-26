import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {FONT_STACK} from '../config/constants';

const {fontFamily} = loadFont();

const WALK_FRAMES = 96;
const EXP_FRAMES = 96;
const DIALOG_FRAMES = 384;
export const TEST_CLIP_FRAMES = WALK_FRAMES + EXP_FRAMES + DIALOG_FRAMES;
const SPEECH_START = WALK_FRAMES + EXP_FRAMES;

// painted-asset pipeline v3 (level-up after owner feedback + reference stills)
const CUT_B = 76; // handi ECU begins
const CUT_C = 160; // back to Bolai

const hero = (n: string) => staticFile(`characters/cut/${n}.png`);

/* ---------------- overlays ---------------- */

const DustMotes: React.FC<{seed?: number; count?: number; area?: [number, number]}> = ({
  seed = 3,
  count = 18,
  area = [1920, 1080],
}) => {
  const frame = useCurrentFrame();
  return (
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
      {Array.from({length: count}, (_, i) => {
        const t = (frame * (0.4 + ((i * seed) % 5) * 0.14) + i * 71) % 560;
        return (
          <circle
            key={i}
            cx={(i * 197 + t * 0.3) % area[0]}
            cy={(160 + t + i * 43) % area[1]}
            r={1.8 + (i % 3) * 0.9}
            fill="#ffe9b0"
            opacity={0.16 + (i % 4) * 0.05}
          />
        );
      })}
    </svg>
  );
};

const WarmFlicker: React.FC = () => {
  const frame = useCurrentFrame();
  const o = 0.1 + Math.sin(frame / 7) * 0.035 + Math.sin(frame / 3.1) * 0.02;
  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at 68% 42%, rgba(255,180,80,0.28) 0%, transparent 60%)',
        opacity: o * 2.2,
        mixBlendMode: 'screen',
      }}
    />
  );
};

const SteamPaint: React.FC<{x: number; y: number; scale?: number; seed?: string; strength?: number}> = ({
  x,
  y,
  scale = 1,
  seed = 'p',
  strength = 0.5,
}) => {
  const frame = useCurrentFrame();
  const cycle = 130;
  return (
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, filter: 'blur(10px)'}}>
      {Array.from({length: 7}, (_, i) => {
        const off = ((i * 53 + seed.length * 17) % cycle);
        const age = ((frame + off) % cycle) / cycle;
        const sway = Math.sin((frame + i * 37) / 19) * 26 * scale;
        const r = (30 + (i % 4) * 18) * scale * (0.55 + age * 0.95);
        const o = Math.sin(Math.min(age, 1) * Math.PI) * strength;
        return <circle key={i} cx={x + sway + ((i % 3) - 1) * 18 * scale} cy={y - age * 250 * scale} r={r} fill="#fff7e8" opacity={o} />;
      })}
    </svg>
  );
};

const CounterFg: React.FC = () => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
    <defs>
      <linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a5a34" />
        <stop offset="14%" stopColor="#6e4526" />
        <stop offset="100%" stopColor="#3a2414" />
      </linearGradient>
    </defs>
    <rect x={0} y={912} width={1920} height={168} fill="url(#woodG)" />
    <rect x={0} y={906} width={1920} height={12} rx={5} fill="#a8743e" />
    <path d="M 120 960 q 26 66 0 120 M 360 958 q -22 70 0 122 M 640 962 q 24 64 0 118 M 1240 960 q 26 66 0 120 M 1560 958 q -22 70 0 122" stroke="#4a2e18" strokeWidth={4} fill="none" opacity={0.6} />
    {/* brass bowl + stack of handis on counter */}
    <g transform="translate(420 928)">
      <path d="M -95 0 Q -80 62 0 68 Q 80 62 95 0 Z" fill="#caa53d" stroke="#5a3a12" strokeWidth={4} />
      <ellipse cx={0} cy={0} rx={95} ry={16} fill="#e3c458" />
      <ellipse cx={0} cy={-3} rx={80} ry={12} fill="#b5892e" />
    </g>
    <g transform="translate(1760 930)">
      <path d="M -62 0 Q -54 40 0 44 Q 54 40 62 0 L 58 -8 L -58 -8 Z" fill="#b5562d" stroke="#4a2c14" strokeWidth={4} />
      <ellipse cx={0} cy={-8} rx={58} ry={11} fill="#d9a527" />
    </g>
  </svg>
);

const FlashCut: React.FC<{at: number; local: number}> = ({at, local}) => {
  if (local < at || local > at + 5) return null;
  const o = interpolate(local, [at, at + 2, at + 5], [0.85, 0.5, 0]);
  return <AbsoluteFill style={{background: '#fff3d8', opacity: o, pointerEvents: 'none'}} />;
};

/* ---------------- sections ---------------- */

const MarketWalk: React.FC = () => {
  const frame = useCurrentFrame();
  const pan = interpolate(frame, [0, WALK_FRAMES], [0, -170], {easing: Easing.inOut(Easing.ease)});
  const bob = Math.abs(Math.sin(frame * 0.26)) * 9;
  const rock = Math.sin(frame * 0.26) * 1.3;
  const push = 1 + interpolate(frame, [0, WALK_FRAMES], [0, 0.06]);
  return (
    <AbsoluteFill style={{backgroundColor: '#f2d9a7', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <Img
          src={staticFile('backgrounds/bg01-market.png')}
          style={{
            position: 'absolute',
            width: 1985,
            height: 1108,
            left: pan,
            top: -14,
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>
      <Img
        src={hero('bolai-walk-a')}
        style={{
          position: 'absolute',
          height: 640,
          left: 830,
          top: 320 - bob,
          transform: `rotate(${rock}deg)`,
          filter: 'drop-shadow(0 18px 12px rgba(60,30,10,0.35))',
        }}
      />
      <DustMotes count={14} />
      <div
        style={{
          position: 'absolute', left: 60, top: 46,
          fontFamily: 'sans-serif', fontSize: 28, color: '#4a2c14',
          background: 'rgba(255,245,220,0.85)', padding: '8px 18px', borderRadius: 10, letterSpacing: 1.5,
        }}
      >
        v3 · PAINTED ASSETS — market walk (bg painting + chroma-cut sprite, 2-frame cycle pending walk-b)
      </div>
    </AbsoluteFill>
  );
};

const EXPRESSIONS: {img: string; label: string}[] = [
  {img: 'bolai-hero-proud', label: 'PROUD'},
  {img: 'bolai-hero-greedy', label: 'GREEDY'},
  {img: 'bolai-hero-shocked', label: 'SHOCKED'},
  {img: 'bolai-hero-regretful', label: 'REGRETFUL'},
];

const ExpressionMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(EXPRESSIONS.length - 1, Math.floor(frame / 24));
  const {img, label} = EXPRESSIONS[idx];
  const pop = interpolate(frame % 24, [0, 6], [0.94, 1], {easing: Easing.out(Easing.ease)});
  const shadow = Math.sin(frame / 5) * 6;
  return (
    <AbsoluteFill>
      <Img src={staticFile('backgrounds/bg02-shop.png')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(9px) brightness(0.62)'}} />
      <AbsoluteFill style={{backgroundColor: 'rgba(20,10,5,0.25)'}} />
      <div style={{position: 'absolute', left: '50%', top: 110, transform: `translateX(-50%) scale(${pop})`, transformOrigin: '50% 100%'}}>
        <Img
          src={hero(img)}
          style={{height: 780, filter: `drop-shadow(0 ${24 + shadow}px 26px rgba(0,0,0,0.55))`}}
        />
      </div>
      <div
        style={{
          position: 'absolute', left: 60, top: 46,
          fontFamily: 'sans-serif', fontSize: 28, color: '#f3e8cf',
          background: 'rgba(40,20,10,0.72)', padding: '8px 18px', borderRadius: 10, letterSpacing: 1.5,
        }}
      >
        v3 · EXPRESSION LIBRARY · {label}
      </div>
    </AbsoluteFill>
  );
};

const DialoguePainted: React.FC = () => {
  const frame = useCurrentFrame();
  const global = SPEECH_START + frame;
  const talking = global % 11 < 7; // viseme rhythm — waveform-sync pass comes with full VO
  const cut = frame < CUT_B ? 'A' : frame < CUT_C ? 'B' : 'C';

  const zoomA = 1 + interpolate(frame, [0, CUT_B], [0, 0.05]);
  const zoomB = 1.06 + interpolate(frame, [CUT_B, CUT_C], [0, 0.1]);
  const zoomC = 1.16 + interpolate(frame - CUT_C, [0, DIALOG_FRAMES - CUT_C], [0, 0.05], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  const sprite =
    cut === 'A' || cut === 'C'
      ? talking
        ? 'bolai-hero'
        : frame >= CUT_C
        ? 'bolai-hero-proud'
        : 'bolai-hero-closed'
      : null;
  const expNow = frame >= CUT_C ? 'bolai-hero-proud' : sprite;
  // proud-closed sprite pending (image budget) — closed fallback for now
  const expClosed = 'bolai-hero-closed';
  const mouthImg = talking ? expNow : expClosed;

  const cutPop = interpolate(frame - (cut === 'A' ? 0 : cut === 'B' ? CUT_B : CUT_C), [0, 4], [1.02, 1], {
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#1a120b'}}>
      <AbsoluteFill style={{transform: `scale(${cutPop})`}}>
        {cut !== 'B' && (
          <AbsoluteFill style={{transform: `scale(${cut === 'A' ? zoomA : zoomC})`, transformOrigin: cut === 'A' ? '52% 55%' : '58% 34%', overflow: 'hidden'}}>
            <Img src={staticFile('backgrounds/bg02-shop.png')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
            <WarmFlicker />
            <SteamPaint x={300} y={520} scale={1.1} seed="shelf" strength={0.4} />
            <SteamPaint x={1520} y={600} scale={1.4} seed="stove" strength={0.5} />
            <DustMotes count={16} />
            {mouthImg && (
              <Img
                src={hero(mouthImg)}
                style={{
                  position: 'absolute',
                  height: 830,
                  left: 1000,
                  top: 130,
                  filter: 'drop-shadow(0 22px 26px rgba(30,12,4,0.5))',
                }}
              />
            )}
            <CounterFg />
          </AbsoluteFill>
        )}
        {cut === 'B' && (
          <AbsoluteFill style={{transform: `scale(${zoomB})`, transformOrigin: '50% 50%', overflow: 'hidden'}}>
            <Img src={staticFile('props/render/handi-ecu.png')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
            <SteamPaint x={760} y={430} scale={1.7} seed="ecu" strength={0.62} />
            <SteamPaint x={1120} y={500} scale={1.2} seed="ecu2" strength={0.5} />
            <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 55%, transparent 52%, rgba(40,16,4,0.5) 100%)'}} />
          </AbsoluteFill>
        )}
      </AbsoluteFill>
      <FlashCut at={CUT_B} local={frame} />
      <FlashCut at={CUT_C} local={frame} />
      <div
        style={{
          position: 'absolute', left: 60, top: 46,
          fontFamily: 'sans-serif', fontSize: 28, color: '#f3e8cf',
          background: 'rgba(40,20,10,0.72)', padding: '8px 18px', borderRadius: 10, letterSpacing: 1.5,
        }}
      >
        v3 · PAINTED DIALOGUE · CUT {cut} {cut === 'B' ? '· HANDI ECU' : ''} · locked VO
      </div>
      <div
        style={{
          position: 'absolute', bottom: 40, right: 50,
          fontFamily: 'sans-serif', fontSize: 22,
          color: talking ? '#e8b34b' : '#8a7a63',
          background: 'rgba(40,20,10,0.6)', padding: '6px 14px', borderRadius: 8,
        }}
      >
        mouth: {talking ? 'open' : 'closed'}
      </div>
    </AbsoluteFill>
  );
};

const TestBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 70, 90], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity, pointerEvents: 'none'}}>
      <div
        style={{
          fontFamily, fontSize: 60, color: '#f3e8cf',
          background: 'rgba(30,16,8,0.88)', padding: '22px 56px',
          borderRadius: 18, border: '3px solid #e8b34b',
          textShadow: '0 4px 18px rgba(0,0,0,0.6)',
        }}
      >
        লোভী মটন হান্ডি ওয়ালা — টেস্ট ক্লিপ v3 (পেইন্টেড অ্যাসেট পাইপলাইন)
      </div>
    </AbsoluteFill>
  );
};

export const TestClip: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#1a120b'}}>
      <Sequence from={0} durationInFrames={WALK_FRAMES}>
        <MarketWalk />
      </Sequence>
      <Sequence from={WALK_FRAMES} durationInFrames={EXP_FRAMES}>
        <ExpressionMontage />
      </Sequence>
      <Sequence from={SPEECH_START} durationInFrames={DIALOG_FRAMES}>
        <DialoguePainted />
      </Sequence>
      <Sequence from={0} durationInFrames={90}>
        <TestBadge />
      </Sequence>
      <Audio src={staticFile('audio/dialogue/S01_SH03_bolai.mp3')} startFrom={0} />
    </AbsoluteFill>
  );
};
