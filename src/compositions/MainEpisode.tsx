import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {FONT_STACK, PALETTE, toFrames} from '../config/constants';
import {SCENES, SHOTS, SceneMeta} from '../data/shots';

const {fontFamily} = loadFont(); // Noto Sans Bengali

const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20, 120, 150], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, 150], [1.0, 1.06], {
    easing: Easing.inOut(Easing.ease),
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a120b',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{fontFamily, fontSize: 112, color: '#e8b34b', fontWeight: 700}}>
          লোভী মটন হান্ডি ওয়ালা
        </div>
        <div style={{fontFamily, fontSize: 36, color: '#d9c3a3', marginTop: 26}}>
          লোভ সাময়িক লাভ দেয়, সততা দীর্ঘস্থায়ী বিশ্বাস গড়ে।
        </div>
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: 22,
            color: '#8a7a63',
            marginTop: 44,
            letterSpacing: 3,
          }}
        >
          PREVIZ BUILD — storyboard cards; animated scenes arrive after asset approvals
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SceneCard: React.FC<{scene: SceneMeta; index: number}> = ({scene, index}) => {
  const frame = useCurrentFrame();
  const duration = toFrames(scene.end - scene.start);
  const fadeIn = interpolate(frame, [0, 14], [0, 1], {extrapolateRight: 'clamp'});
  const drift = interpolate(frame, [0, duration], [0, -22], {
    easing: Easing.inOut(Easing.ease),
  });
  const shots = SHOTS.filter((s) => s.scene === scene.n);
  const accents = [
    PALETTE.market.primary,
    PALETTE.shopOriginal.primary,
    PALETTE.house.amber,
    PALETTE.fraudKitchen.primary,
    PALETTE.fatik.primary,
    PALETTE.ceremony.primary,
    PALETTE.scandal.primary,
    PALETTE.police.primary,
    PALETTE.redemption.primary,
  ];
  const accent = accents[(scene.n - 1) % accents.length];
  const first = shots[0]?.id ?? '';
  const last = shots[shots.length - 1]?.id ?? '';
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#14100b',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${accent}55 0%, transparent 62%)`,
          transform: `translateY(${drift}px)`,
        }}
      />
      <div style={{textAlign: 'center'}}>
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: 26,
            letterSpacing: 8,
            color: accent,
            marginBottom: 18,
          }}
        >
          SCENE {String(scene.n).padStart(2, '0')} / {SCENES.length}
        </div>
        <div style={{fontFamily, fontSize: 66, color: '#f3e8cf', fontWeight: 700}}>
          {scene.titleBn}
        </div>
        <div style={{fontFamily: 'sans-serif', fontSize: 30, color: '#c8b18f', marginTop: 12}}>
          {scene.title}
        </div>
        <div style={{fontFamily: 'sans-serif', fontSize: 24, color: '#8a7a63', marginTop: 28}}>
          {scene.loc} · {scene.start}s–{scene.end}s · {shots.length} shots · mood: {scene.mood}
        </div>
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: 18,
            color: '#6b5b4a',
            marginTop: 64,
            letterSpacing: 2,
          }}
        >
          SHOTS {first} … {last}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MainEpisode: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#14100b'}}>
      <Sequence from={0} durationInFrames={toFrames(60)}>
        <TitleCard />
      </Sequence>
      {SCENES.map((scene, i) => (
        <Sequence
          key={scene.n}
          from={toFrames(scene.start)}
          durationInFrames={toFrames(scene.end - scene.start)}
        >
          <SceneCard scene={scene} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
