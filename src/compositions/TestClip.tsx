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
import {Camera} from '../components/Camera';
import {FireFlicker, ScentWave, Steam} from '../components/Fx';
import {Bolai} from '../components/characters/Bolai';
import {Expression, isBlinking, MouthShape, visemeAt} from '../components/CharacterRig';
import {FONT_STACK} from '../config/constants';

const {fontFamily} = loadFont();

const WALK_FRAMES = 96;
const EXP_FRAMES = 96;
const DIALOG_FRAMES = 384;
export const TEST_CLIP_FRAMES = WALK_FRAMES + EXP_FRAMES + DIALOG_FRAMES;
const SPEECH_START = WALK_FRAMES + EXP_FRAMES;

/* ---------------- Draft market strip (BG01 draft — replaced by final art later) --- */

const MarketStrip: React.FC<{shiftFar: number; shiftNear: number}> = ({
  shiftFar,
  shiftNear,
}) => {
  const shops = Array.from({length: 8}, (_, i) => i * 480);
  return (
    <AbsoluteFill style={{backgroundColor: '#f2d9a7'}}>
      {/* sky */}
      <AbsoluteFill style={{background: 'linear-gradient(#ffe9bd 0%, #f2d9a7 55%, #e8c684 100%)'}} />
      {/* distant trees */}
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
        <g transform={`translate(${-shiftFar} 0)`}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <g key={i} transform={`translate(${i * 320} 430)`}>
              <rect x={-6} y={-40} width={12} height={60} fill="#7a5a34" />
              <circle cx={0} cy={-60} r={42 + (i % 3) * 10} fill="#7f9c5c" opacity={0.9} />
            </g>
          ))}
        </g>
      </svg>
      {/* shop row */}
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
        <g transform={`translate(${-shiftNear} 0)`}>
          {shops.map((sx) => (
            <g key={sx} transform={`translate(${sx} 0)`}>
              <rect x={0} y={380} width={470} height={330} fill="#c98d4e" stroke="#8a5a2b" strokeWidth={4} />
              <path d="M -8 380 L 235 300 L 478 380 Z" fill="#a85632" />
              <rect x={40} y={430} width={130} height={110} fill="#5e7d4a" opacity={0.8} />
              <rect x={300} y={430} width={130} height={110} fill="#5e7d4a" opacity={0.8} />
              <rect x={0} y={560} width={470} height={40} fill="#8a5a2b" />
              <rect x={150} y={560} width={170} height={150} fill="#6b4226" />
            </g>
          ))}
        </g>
      </svg>
      {/* ground */}
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
        <rect x={0} y={710} width={1920} height={370} fill="#b98a55" />
        <rect x={0} y={710} width={1920} height={14} fill="#9c744a" />
      </svg>
    </AbsoluteFill>
  );
};

/* ---------------- Draft shop interior (BG02 draft) --- */

const ShopInterior: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#3a2417'}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 35%, #7a4a26 0%, #4a2c1a 55%, #2a1a10 100%)'}} />
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
      {/* shelves with handis */}
      <rect x={90} y={210} width={560} height={26} fill="#8a5a2b" />
      <rect x={90} y={380} width={560} height={26} fill="#8a5a2b" />
      {[130, 250, 370, 490, 610].map((hx, i) => (
        <g key={hx} transform={`translate(${hx} ${i % 2 ? 210 : 380})`}>
          <path d="M -34 -42 Q 0 -58 34 -42 L 26 0 Q 0 10 -26 0 Z" fill="#b5562d" stroke="#7a3618" strokeWidth={3} />
          <ellipse cx={0} cy={-42} rx={30} ry={8} fill="#d9a527" opacity={0.9} />
        </g>
      ))}
      {/* counter */}
      <rect x={640} y={700} width={1280} height={120} rx={10} fill="#6b4226" stroke="#4a2c1a" strokeWidth={5} />
      <rect x={640} y={700} width={1280} height={18} fill="#8a5a2b" />
      {/* stove glow */}
      <ellipse cx={1580} cy={690} rx={130} ry={30} fill="#5a3220" />
      {/* signboard */}
      <g transform="translate(1180 190)">
        <rect x={-260} y={-64} width={520} height={110} rx={12} fill="#5a3220" stroke="#caa53d" strokeWidth={5} />
        <text x={0} y={8} textAnchor="middle" fontFamily={FONT_STACK} fontSize={44} fill="#f3e8cf" fontWeight={700}>
          বলাইয়ের স্পেশাল মটন হান্ডি
        </text>
      </g>
    </svg>
  </AbsoluteFill>
);

/* ---------------- expression test labels --- */

const EXPRESSIONS: {exp: Expression; label: string}[] = [
  {exp: 'happy', label: 'happy'},
  {exp: 'proud', label: 'proud'},
  {exp: 'greedy', label: 'greedy'},
  {exp: 'nervous', label: 'nervous'},
  {exp: 'shocked', label: 'shocked'},
  {exp: 'regretful', label: 'regretful'},
];

/* ---------------- sections --- */

const WalkSection: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <MarketStrip shiftFar={frame * 0.6} shiftNear={frame * 2.4} />
      <Bolai
        x={760}
        y={190}
        scale={0.85}
        walkPhase={frame * 0.24}
        blink={isBlinking(frame, 'bolai-walk')}
        mouth="rest"
      />
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 50,
          fontFamily: 'sans-serif',
          fontSize: 30,
          color: '#5a3a1a',
          background: 'rgba(255,245,220,0.8)',
          padding: '8px 18px',
          borderRadius: 10,
          letterSpacing: 2,
        }}
      >
        TEST 1/3 — WALK CYCLE + PARALLAX (draft market BG)
      </div>
    </AbsoluteFill>
  );
};

const ExpressionSection: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(EXPRESSIONS.length - 1, Math.floor(frame / 16));
  const {exp, label} = EXPRESSIONS[idx];
  const pop = interpolate(frame % 16, [0, 5], [0.97, 1], {easing: Easing.out(Easing.ease)});
  return (
    <AbsoluteFill>
      <ShopInterior />
      <div style={{transform: `scale(${pop})`, transformOrigin: '50% 80%'}}>
        <Bolai
          x={760}
          y={210}
          scale={0.85}
          blink={isBlinking(frame, 'bolai-exp')}
          expression={exp}
          mouth={exp === 'shocked' ? 'open-wide' : exp === 'happy' || exp === 'proud' ? 'smile-open' : 'rest'}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 50,
          fontFamily: 'sans-serif',
          fontSize: 30,
          color: '#f3e8cf',
          background: 'rgba(40,20,10,0.7)',
          padding: '8px 18px',
          borderRadius: 10,
          letterSpacing: 2,
        }}
      >
        TEST 2/3 — EXPRESSIONS · now: {label.toUpperCase()}
      </div>
    </AbsoluteFill>
  );
};

const DialogueSection: React.FC = () => {
  const frame = useCurrentFrame();
  const global = SPEECH_START + frame;
  const mouth: MouthShape = visemeAt(global, SPEECH_START, SPEECH_START + 330, 'bolai-dialog');
  const wave = frame < 40 ? interpolate(frame, [0, 12, 30, 40], [0, 1, 1, 0]) : 0;
  return (
    <AbsoluteFill>
      <Camera move={{zoomStart: 1, zoomEnd: 1.12, durationInFrames: DIALOG_FRAMES}}>
        <ShopInterior />
        <Steam x={1580} y={660} count={5} seed="shop-steam" scale={1.3} />
        <FireFlicker x={1580} y={685} scale={1.2} />
        <ScentWave fromX={1580} fromY={620} toX={1150} toY={520} />
        <Bolai
          x={730}
          y={215}
          scale={0.85}
          blink={isBlinking(global, 'bolai-dialog')}
          expression={frame < 300 ? 'happy' : 'proud'}
          mouth={mouth}
          wave={wave}
          walkPhase={frame * 0.08}
        />
      </Camera>
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 50,
          fontFamily: 'sans-serif',
          fontSize: 30,
          color: '#f3e8cf',
          background: 'rgba(40,20,10,0.7)',
          padding: '8px 18px',
          borderRadius: 10,
          letterSpacing: 2,
        }}
      >
        TEST 3/3 — DIALOGUE + LIP-SYNC (owner-approved locked voice)
      </div>
      {/* waveform-style sync indicator (test-only, not in final cuts) */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          right: 50,
          fontFamily: 'sans-serif',
          fontSize: 22,
          color: mouth === 'rest' ? '#8a7a63' : '#e8b34b',
          background: 'rgba(40,20,10,0.6)',
          padding: '6px 14px',
          borderRadius: 8,
        }}
      >
        mouth: {mouth}
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
          fontFamily: FONT_STACK,
          fontSize: 64,
          color: '#f3e8cf',
          background: 'rgba(30,16,8,0.85)',
          padding: '24px 60px',
          borderRadius: 18,
          border: '3px solid #e8b34b',
        }}
      >
        লোভী মটন হান্ডি ওয়ালা — অ্যানিমেশন টেস্ট ক্লিপ v1
      </div>
    </AbsoluteFill>
  );
};

export const TestClip: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#1a120b'}}>
      <Sequence from={0} durationInFrames={WALK_FRAMES}>
        <WalkSection />
      </Sequence>
      <Sequence from={WALK_FRAMES} durationInFrames={EXP_FRAMES}>
        <ExpressionSection />
      </Sequence>
      <Sequence from={SPEECH_START} durationInFrames={DIALOG_FRAMES}>
        <DialogueSection />
      </Sequence>
      <Sequence from={0} durationInFrames={90}>
        <TestBadge />
      </Sequence>
      <Audio src={staticFile('audio/dialogue/S01_SH03_bolai.mp3')} startFrom={0} />
    </AbsoluteFill>
  );
};
