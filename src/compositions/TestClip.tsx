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
import {FireFlicker, Steam} from '../components/Fx';
import {Bolai} from '../components/characters/Bolai';
import {Expression, isBlinking, MouthShape, visemeAt} from '../components/CharacterRig';
import {FONT_STACK} from '../config/constants';

const {fontFamily} = loadFont();

const WALK_FRAMES = 96;
const EXP_FRAMES = 96;
const DIALOG_FRAMES = 384;
export const TEST_CLIP_FRAMES = WALK_FRAMES + EXP_FRAMES + DIALOG_FRAMES;
const SPEECH_START = WALK_FRAMES + EXP_FRAMES;
const CUT_B = 150;
const CUT_C = 268;

/* ================= Shop interior v2 (draft final-quality BG02) ================= */

const HandiPot: React.FC<{tx: number; ty: number; s?: number; lit?: boolean}> = ({tx, ty, s = 1, lit}) => (
  <g transform={`translate(${tx} ${ty}) scale(${s})`}>
    <path d="M -40 -44 Q -46 -10 -30 8 Q 0 20 30 8 Q 46 -10 40 -44 Q 0 -58 -40 -44 Z" fill="#b5562d" stroke="#4a2c14" strokeWidth={3} />
    <path d="M -34 -34 Q -30 -6 -18 4 Q 0 10 18 4 Q 30 -6 34 -34 Q 12 -44 -34 -34 Z" fill="#c96a38" opacity={0.55} />
    <ellipse cx={0} cy={-44} rx={36} ry={10} fill="#8a3a1c" stroke="#4a2c14" strokeWidth={3} />
    {lit ? (
      <ellipse cx={0} cy={-44} rx={28} ry={7} fill="#7a4a20" />
    ) : (
      <ellipse cx={0} cy={-44} rx={32} ry={8.5} fill="#d9a527" opacity={0.95} />
    )}
    {lit && <ellipse cx={0} cy={-44} rx={20} ry={5} fill="#5a3218" />}
  </g>
);

const ShopV2: React.FC<{frame: number}> = ({frame}) => {
  const signSwing = Math.sin(frame / 26) * 1.6;
  const lampGlow = 0.75 + Math.sin(frame / 9) * 0.08;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(#5a3a22 0%, #4a2c1a 46%, #33200f 100%)'}} />
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
        {/* brick wall hint */}
        {Array.from({length: 6}, (_, r) => (
          <g key={r} opacity={0.14}>
            {Array.from({length: 16}, (_, c) => (
              <rect
                key={c}
                x={c * 124 + (r % 2 ? 62 : 0)}
                y={140 + r * 58}
                width={112}
                height={46}
                rx={4}
                fill="none"
                stroke="#2a1a0e"
                strokeWidth={2.4}
              />
            ))}
          </g>
        ))}
        {/* light shaft + dust */}
        <path d="M 1080 0 L 1500 0 L 1080 760 L 880 760 Z" fill="#ffd98a" opacity={0.1} />
        {Array.from({length: 14}, (_, i) => {
          const t = (frame * 0.5 + i * 47) % 400;
          return <circle key={i} cx={1120 + ((i * 91) % 340)} cy={200 + ((t + i * 30) % 520)} r={2.6} fill="#ffe9b0" opacity={0.35} />;
        })}
        {/* shelves */}
        {[228, 392].map((sy, row) => (
          <g key={sy}>
            <rect x={70} y={sy + 52} width={600} height={22} rx={5} fill="#7a4a26" stroke="#3a2414" strokeWidth={3} />
            {[110, 225, 340, 455, 570].map((hx) => (
              <HandiPot key={hx} tx={hx} ty={sy} s={0.98} lit={row === 0 && hx === 340} />
            ))}
          </g>
        ))}
        {/* hanging signboard (swinging) */}
        <g transform={`translate(1300 168) rotate(${signSwing})`}>
          <path d="M -190 -108 L -170 -84 M 190 -108 L 170 -84" stroke="#2a1a0e" strokeWidth={5} />
          <rect x={-266} y={-84} width={532} height={116} rx={14} fill="#5a3220" stroke="#caa53d" strokeWidth={6} />
          <rect x={-252} y={-72} width={504} height={92} rx={10} fill="none" stroke="#caa53d" strokeWidth={2} opacity={0.5} />
          <text x={0} y={14} textAnchor="middle" fontFamily={FONT_STACK} fontSize={46} fill="#f3e8cf" fontWeight={700}>
            বলাইয়ের স্পেশাল মটন হান্ডি
          </text>
        </g>
        {/* stove + cauldron */}
        <g transform="translate(1540 705)">
          <rect x={-120} y={-66} width={240} height={86} rx={14} fill="#3a2a1e" stroke="#241810" strokeWidth={4} />
          <ellipse cx={0} cy={-64} rx={104} ry={20} fill="#2a1c12" />
          <HandiPot tx={0} ty={-90} s={1.5} lit />
        </g>
        {/* counter foreground */}
        <g>
          <rect x={560} y={812} width={1360} height={210} rx={12} fill="#6b4226" stroke="#3a2414" strokeWidth={5} />
          <rect x={560} y={812} width={1360} height={26} fill="#8a5a2b" />
          <path d="M 700 840 q 20 90 0 180 M 860 840 q -18 92 0 180 M 1020 840 q 20 90 0 180" stroke="#54321c" strokeWidth={3} fill="none" opacity={0.7} />
          {/* serving bowl on counter */}
          <g transform="translate(1660 806)">
            <path d="M -70 0 Q -60 44 0 48 Q 60 44 70 0 Z" fill="#a8432a" stroke="#4a2c14" strokeWidth={3.4} />
            <ellipse cx={0} cy={0} rx={70} ry={12} fill="#8a3320" />
            <ellipse cx={0} cy={-2} rx={58} ry={9} fill="#c96a38" />
          </g>
        </g>
        {/* floor */}
        <rect x={0} y={1020} width={1920} height={60} fill="#2a1a0e" />
      </svg>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 62% 30%, rgba(255,190,90,${lampGlow * 0.14}) 0%, transparent 55%)`}} />
    </AbsoluteFill>
  );
};

const MarketStrip: React.FC<{shiftFar: number; shiftNear: number}> = ({shiftFar, shiftNear}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: '#f2d9a7'}}>
      <AbsoluteFill style={{background: 'linear-gradient(#ffe9bd 0%, #f2d9a7 55%, #e8c684 100%)'}} />
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
        <g transform={`translate(${-shiftFar} 0)`}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <g key={i} transform={`translate(${i * 320} 430)`}>
              <rect x={-7} y={-44} width={14} height={64} fill="#7a5a34" />
              <circle cx={0} cy={-64} r={44 + (i % 3) * 10} fill="#7f9c5c" opacity={0.9} />
              <circle cx={-22} cy={-46} r={22} fill="#6f8c4e" opacity={0.85} />
            </g>
          ))}
        </g>
      </svg>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
        <g transform={`translate(${-shiftNear} 0)`}>
          {[0, 1, 2, 3, 4].map((i) => {
            const sx = i * 560;
            return (
              <g key={sx} transform={`translate(${sx} 0)`}>
                <rect x={0} y={368} width={550} height={344} fill={i % 2 ? '#c98d4e' : '#b97e42'} stroke="#8a5a2b" strokeWidth={4} />
                <path d="M -10 368 L 275 282 L 560 368 Z" fill={i % 2 ? '#a85632' : '#9c4c2c'} stroke="#8a5a2b" strokeWidth={3} />
                <rect x={52} y={424} width={150} height={118} fill="#5e7d4a" opacity={0.85} />
                <rect x={340} y={424} width={150} height={118} fill="#5e7d4a" opacity={0.85} />
                <rect x={0} y={552} width={550} height={44} fill="#8a5a2b" />
                <rect x={196} y={552} width={158} height={160} fill="#6b4226" stroke="#4a2c14" strokeWidth={3} />
                <g transform={`translate(275 ${470 + Math.sin(frame / 22 + i) * 2})`}>
                  <rect x={-84} y={-44} width={168} height={88} rx={8} fill="#5a3220" stroke="#caa53d" strokeWidth={4} />
                  <text x={0} y={14} textAnchor="middle" fontFamily={FONT_STACK} fontSize={34} fill="#f3e8cf" fontWeight={700}>
                    {i % 2 ? 'ভেজিটেবল' : 'মুদি দোকান'}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
        <rect x={0} y={712} width={1920} height={368} fill="#b98a55" />
        <rect x={0} y={712} width={1920} height={16} fill="#9c744a" />
        {Array.from({length: 20}, (_, i) => (
          <ellipse key={i} cx={i * 104 + 40} cy={790 + (i % 4) * 60} rx={34} ry={5} fill="#a37a4c" opacity={0.7} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

/* ================= sections ================= */

const WalkSection: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <MarketStrip shiftFar={frame * 0.6} shiftNear={frame * 2.6} />
      <Bolai
        x={770}
        y={200}
        scale={0.82}
        walkPhase={frame * 0.24}
        blink={isBlinking(frame, 'bolai-walk')}
        lean={0.15}
      />
      <div
        style={{
          position: 'absolute', left: 60, top: 50,
          fontFamily: 'sans-serif', fontSize: 30, color: '#5a3a1a',
          background: 'rgba(255,245,220,0.82)', padding: '8px 18px', borderRadius: 10, letterSpacing: 2,
        }}
      >
        TEST 1/3 — WALK v2: knee bend · squash-stretch · lean · gamcha follow-through
      </div>
    </AbsoluteFill>
  );
};

const EXPRESSIONS: {exp: Expression; label: string; mouth?: MouthShape; sly?: number}[] = [
  {exp: 'happy', label: 'happy', mouth: 'smile-open'},
  {exp: 'proud', label: 'proud', mouth: 'smile-open'},
  {exp: 'greedy', label: 'greedy', mouth: 'smirk' as MouthShape, sly: 1},
  {exp: 'nervous', label: 'nervous', mouth: 'open-small'},
  {exp: 'shocked', label: 'shocked', mouth: 'open-wide'},
  {exp: 'regretful', label: 'regretful', mouth: 'closed'},
];

const ExpressionSection: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(EXPRESSIONS.length - 1, Math.floor(frame / 16));
  const {exp, label, mouth, sly} = EXPRESSIONS[idx];
  const pop = interpolate(frame % 16, [0, 5], [0.965, 1], {easing: Easing.out(Easing.ease)});
  return (
    <AbsoluteFill>
      <ShopV2 frame={frame} />
      <div style={{transform: `scale(${pop})`, transformOrigin: '50% 78%'}}>
        <Bolai
          x={742}
          y={215}
          scale={0.82}
          blink={isBlinking(frame, 'bolai-exp')}
          expression={exp}
          mouth={(mouth as MouthShape) === ('smirk' as MouthShape) ? 'smile-open' : mouth ?? 'rest'}
          sly={sly ?? 0}
          talking={false}
          walkPhase={frame * 0.06}
        />
      </div>
      <div
        style={{
          position: 'absolute', left: 60, top: 50,
          fontFamily: 'sans-serif', fontSize: 30, color: '#f3e8cf',
          background: 'rgba(40,20,10,0.72)', padding: '8px 18px', borderRadius: 10, letterSpacing: 2,
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
  const mouth: MouthShape = visemeAt(global, SPEECH_START, SPEECH_START + 336, 'bolai-dialog');
  const talking = mouth !== 'rest';

  // wave with anticipation → overshoot → settle → ease down
  const wave =
    frame < 62
      ? interpolate(frame, [0, 9, 20, 30, 48, 62], [0, -0.22, 1.14, 1, 0.97, 0], {
          easing: Easing.inOut(Easing.ease),
        })
      : 0;
  // point gesture during cut C
  const point = frame >= CUT_C + 24 ? interpolate(frame, [CUT_C + 24, CUT_C + 38, CUT_C + 180, CUT_C + 196], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  }) : 0;

  const cut = frame < CUT_B ? 'A' : frame < CUT_C ? 'B' : 'C';
  // camera per cut (A medium / B closer / C wide-ish w/ pot foreground)
  const zoom = cut === 'A' ? 1.02 : cut === 'B' ? 1.3 : 1.0;
  const ox = cut === 'B' ? 120 : 0;
  const oy = cut === 'B' ? -60 : 0;
  const cutPop = interpolate(frame - (cut === 'A' ? 0 : cut === 'B' ? CUT_B : CUT_C), [0, 3], [1.015, 1], {
    easing: Easing.out(Easing.ease),
  });

  const bolai = (
    <Bolai
      x={cut === 'B' ? 700 : 742}
      y={cut === 'B' ? 160 : 215}
      scale={0.82}
      blink={isBlinking(global, 'bolai-dialog')}
      expression={frame < 250 ? 'happy' : 'proud'}
      mouth={mouth}
      talking={talking}
      wave={wave}
      point={point}
      walkPhase={frame * 0.09}
    />
  );

  return (
    <AbsoluteFill style={{backgroundColor: '#221408'}}>
      <AbsoluteFill style={{transform: `scale(${cutPop})`}}>
        <AbsoluteFill style={{transform: `scale(${zoom}) translate(${ox}px ${oy}px)`, transformOrigin: '50% 60%'}}>
          <ShopV2 frame={global} />
          <Steam x={1540} y={560} count={6} seed="shop-steam-v2" scale={1.6} rise={260} opacity={0.5} />
          <FireFlicker x={1540} y={632} scale={1.5} />
          {bolai}
        </AbsoluteFill>
        {/* pot ECU foreground for cut C */}
        {cut === 'C' && (
          <svg
            width="1920" height="1080" viewBox="0 0 1920 1080"
            style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
          >
            <g transform="translate(340 1035) scale(3.1)" opacity={0.98}>
              <path d="M -52 -52 Q -58 -12 -38 10 Q 0 24 38 10 Q 58 -12 52 -52 Q 0 -68 -52 -52 Z" fill="#b5562d" stroke="#3a2210" strokeWidth={4} />
              <ellipse cx={0} cy={-52} rx={46} ry={12} fill="#8a3a1c" stroke="#3a2210" strokeWidth={4} />
              <ellipse cx={0} cy={-52} rx={38} ry={9} fill="#5a3218" />
              <path d="M -34 -34 Q -28 -6 -16 4 Q 0 10 16 4 Q 28 -6 34 -34 Q 10 -44 -34 -34 Z" fill="#c96a38" opacity={0.5} />
            </g>
          </svg>
        )}
        {cut === 'C' && <Steam x={340} y={820} count={5} seed="pot-burst" scale={2.2} rise={330} opacity={0.65} />}
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute', left: 60, top: 50,
          fontFamily: 'sans-serif', fontSize: 30, color: '#f3e8cf',
          background: 'rgba(40,20,10,0.72)', padding: '8px 18px', borderRadius: 10, letterSpacing: 2,
        }}
      >
        TEST 3/3 — DIALOGUE v2 · CUT {cut} · anticipation wave → point → pot reveal
      </div>
      <div
        style={{
          position: 'absolute', bottom: 40, right: 50,
          fontFamily: 'sans-serif', fontSize: 22,
          color: talking ? '#e8b34b' : '#8a7a63',
          background: 'rgba(40,20,10,0.6)', padding: '6px 14px', borderRadius: 8,
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
          fontFamily: FONT_STACK, fontSize: 64, color: '#f3e8cf',
          background: 'rgba(30,16,8,0.85)', padding: '24px 60px',
          borderRadius: 18, border: '3px solid #e8b34b',
        }}
      >
        লোভী মটন হান্ডি ওয়ালা — অ্যানিমেশন টেস্ট ক্লিপ v2
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
