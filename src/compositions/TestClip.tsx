import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {Bolai} from '../components/characters/BolaiV3';
import {MarketBg, ShopBg, CounterFg, HandiEcu} from '../components/scenes/CodeScenes';
import type {Expression} from '../components/characters/BolaiV3';

const {fontFamily} = loadFont();

/*
 * TestClip v4 — 100% code-drawn (STRICT RULES: no generative AI, no bitmap assets).
 * Act 1: parallax market walk · Act 2: expression library · Act 3: 3-cut dialogue
 * with locked owner voice. All art = SVG/React. All motion = Remotion code.
 */

const WALK_FRAMES = 96;
const EXP_FRAMES = 96;
const DIALOG_FRAMES = 384;
export const TEST_CLIP_FRAMES = WALK_FRAMES + EXP_FRAMES + DIALOG_FRAMES;
const SPEECH_START = WALK_FRAMES + EXP_FRAMES;

const CUT_B = 80; // handi ECU begins
const CUT_C = 160; // back to Bolai

const Badge: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark = true}) => (
  <div
    style={{
      position: 'absolute',
      left: 60,
      top: 46,
      fontFamily: 'sans-serif',
      fontSize: 26,
      color: dark ? '#f3e8cf' : '#4a2c14',
      background: dark ? 'rgba(40,20,10,0.72)' : 'rgba(255,245,220,0.85)',
      padding: '8px 18px',
      borderRadius: 10,
      letterSpacing: 1.5,
    }}
  >
    {children}
  </div>
);

const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 70, 90], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity, pointerEvents: 'none'}}>
      <div
        style={{
          fontFamily, fontSize: 58, color: '#f3e8cf',
          background: 'rgba(30,16,8,0.9)', padding: '22px 56px',
          borderRadius: 18, border: '3px solid #e8b34b',
          textShadow: '0 4px 18px rgba(0,0,0,0.6)', textAlign: 'center',
        }}
      >
        লোভী মটন হান্ডি ওয়ালা — টেস্ট ক্লিপ v4
        <div style={{fontSize: 30, marginTop: 10, color: '#e8b34b'}}>
          ১০০% কোড-ড্রন · কোনো AI ছবি নেই
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse at 50% 46%, transparent 58%, rgba(30,12,4,0.42) 100%)',
      pointerEvents: 'none',
    }}
  />
);

const WarmFlicker: React.FC = () => {
  const frame = useCurrentFrame();
  const o = 0.1 + Math.sin(frame / 7) * 0.035 + Math.sin(frame / 3.1) * 0.02;
  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at 62% 38%, rgba(255,190,90,0.3) 0%, transparent 62%)',
        opacity: o * 2.2,
        mixBlendMode: 'screen',
      }}
    />
  );
};

/* ------------------------------- ACT 1 ------------------------------- */

const MarketWalk: React.FC = () => {
  const frame = useCurrentFrame();
  const pan = interpolate(frame, [0, WALK_FRAMES], [0, 620], {easing: Easing.inOut(Easing.ease)});
  const push = 1 + interpolate(frame, [0, WALK_FRAMES], [0, 0.05]);
  return (
    <AbsoluteFill style={{backgroundColor: '#F7C268', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 60%'}}>
        <MarketBg pan={pan} frame={frame} />
      </AbsoluteFill>
      <Bolai
        walking
        walkPhase={frame * 0.24}
        frame={frame}
        width={340}
        expression="happy"
        style={{
          position: 'absolute',
          left: 770,
          top: 415,
          filter: 'drop-shadow(0 16px 10px rgba(80,40,10,0.4))',
        }}
      />
      <Vignette />
      <Badge>v4 · PURE CODE · parallax market walk (3-layer + articulated walk cycle)</Badge>
    </AbsoluteFill>
  );
};

/* ------------------------------- ACT 2 ------------------------------- */

const EXPRESSIONS: Expression[] = ['happy', 'proud', 'greedy', 'shocked', 'regretful', 'closed'];
const LABELS: Record<Expression, string> = {
  happy: 'HAPPY',
  proud: 'PROUD',
  greedy: 'GREEDY SMIRK',
  shocked: 'SHOCKED',
  regretful: 'REGRETFUL (tears)',
  closed: 'GENTLE CLOSED',
};

const ExpressionMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(EXPRESSIONS.length - 1, Math.floor(frame / 16));
  const exp = EXPRESSIONS[idx];
  const pop = interpolate(frame % 16, [0, 5], [0.93, 1], {easing: Easing.out(Easing.ease)});
  return (
    <AbsoluteFill style={{backgroundColor: '#1a120b', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: 'scale(1.12)', filter: 'blur(10px) brightness(0.5)'}}>
        <ShopBg frame={frame} />
      </AbsoluteFill>
      <AbsoluteFill style={{backgroundColor: 'rgba(20,10,5,0.28)'}} />
      <div style={{position: 'absolute', left: '50%', top: 60, transform: `translateX(-50%) scale(${pop})`, transformOrigin: '50% 100%'}}>
        <Bolai
          expression={exp}
          frame={frame}
          width={620}
          style={{filter: 'drop-shadow(0 22px 26px rgba(0,0,0,0.55))'}}
        />
      </div>
      <Vignette />
      <Badge>v4 · EXPRESSION LIBRARY · {LABELS[exp]}</Badge>
    </AbsoluteFill>
  );
};

/* ------------------------------- ACT 3 ------------------------------- */

const FlashCut: React.FC<{at: number; local: number}> = ({at, local}) => {
  if (local < at || local > at + 5) return null;
  const o = interpolate(local, [at, at + 2, at + 5], [0.85, 0.5, 0]);
  return <AbsoluteFill style={{background: '#fff3d8', opacity: o, pointerEvents: 'none'}} />;
};

const DialogueCode: React.FC = () => {
  const frame = useCurrentFrame();
  const global = SPEECH_START + frame;
  const talking = global % 11 < 7;
  const cut = frame < CUT_B ? 'A' : frame < CUT_C ? 'B' : 'C';

  const zoomA = 1 + interpolate(frame, [0, CUT_B], [0, 0.05]);
  const zoomB = 1.05 + interpolate(frame, [CUT_B, CUT_C], [0, 0.08]);
  const zoomC = 1.18 + interpolate(frame - CUT_C, [0, DIALOG_FRAMES - CUT_C], [0, 0.12], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  const cutPop = interpolate(frame - (cut === 'A' ? 0 : cut === 'B' ? CUT_B : CUT_C), [0, 4], [1.02, 1], {
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#1a120b', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${cutPop})`}}>
        {cut !== 'B' && (
          <AbsoluteFill
            style={{
              transform: `scale(${cut === 'A' ? zoomA : zoomC})`,
              transformOrigin: cut === 'A' ? '55% 42%' : '64% 28%',
              overflow: 'hidden',
            }}
          >
            <ShopBg frame={frame} />
            <WarmFlicker />
            {/* steam wisps behind counter */}
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, filter: 'blur(9px)'}}>
              {[0, 1].map((i) => {
                const cyc = 110;
                const age = ((frame + i * 55) % cyc) / cyc;
                const sway = Math.sin((frame + i * 40) / 16) * 30;
                return (
                  <circle
                    key={i}
                    cx={1560 + sway + i * 60}
                    cy={760 - age * 330}
                    r={(34 + i * 14) * (0.6 + age)}
                    fill="#FFF3DE"
                    opacity={Math.sin(age * Math.PI) * 0.4}
                  />
                );
              })}
            </svg>
            <Bolai
              expression={frame >= CUT_C ? 'proud' : 'happy'}
              talking={talking}
              frame={frame}
              width={760}
              style={{
                position: 'absolute',
                left: 850,
                top: 110,
                filter: 'drop-shadow(0 20px 24px rgba(30,12,4,0.5))',
              }}
            />
            <CounterFg />
          </AbsoluteFill>
        )}
        {cut === 'B' && (
          <AbsoluteFill style={{transform: `scale(${zoomB})`, transformOrigin: '50% 52%', overflow: 'hidden'}}>
            <HandiEcu frame={frame} />
          </AbsoluteFill>
        )}
      </AbsoluteFill>
      <FlashCut at={CUT_B} local={frame} />
      <FlashCut at={CUT_C} local={frame} />
      <Vignette />
      <Badge dark>
        v4 · PURE CODE DIALOGUE · CUT {cut} {cut === 'B' ? '· মটন হান্ডি ECU' : ''} · locked VO
      </Badge>
    </AbsoluteFill>
  );
};

/* ------------------------------- ROOT ------------------------------- */

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
        <DialogueCode />
      </Sequence>
      <Sequence from={0} durationInFrames={92}>
        <TitleCard />
      </Sequence>
      <Audio src={staticFile('audio/dialogue/S01_SH03_bolai.mp3')} />
    </AbsoluteFill>
  );
};
