import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {Stage, ProjectedChar, World, useFontReady} from '../three/Stage';
import {buildVillage} from '../three/worlds';
import {Char2D, CAST} from '../components/characters/Char2D';
import {INK} from '../three/ink';

const {fontFamily} = loadFont();

export const STYLE_TEST_FRAMES = 288; // 12s @24fps

/*
 * StyleTest v5 — SKILL.md house style proof:
 * procedural 3D world (market + mutton handi restaurant) with toon shading,
 * ink #351f22, DOF, fog; 2D flat-shaded cast projected inside the 3D world;
 * camera: sideways track -> push -> crane, monotone cubic warp (never static).
 */

const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const title = interpolate(frame, [0, 8, 62, 76], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const badge = interpolate(frame, [80, 90], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <>
      {/* warm grade + vignette (SKILL: light vignette) */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at 22% 12%, rgba(255,214,140,0.16) 0%, transparent 55%)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at 50% 46%, transparent 60%, rgba(53,31,34,0.34) 100%)',
          pointerEvents: 'none',
        }}
      />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: title, pointerEvents: 'none'}}>
        <div
          style={{
            fontFamily, fontSize: 64, color: '#f6ecd2', textAlign: 'center',
            textShadow: '0 3px 0 rgba(53,31,34,0.85), 0 10px 26px rgba(0,0,0,0.35)',
            letterSpacing: 1,
          }}
        >
          লোভী মটন হান্ডি ওয়ালা
          <div style={{fontSize: 26, marginTop: 12, color: '#ffd98e', letterSpacing: 4}}>
            3D ওয়ার্ল্ড স্টাইল টেস্ট v5 · সবকিছু কোডে আঁকা
          </div>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute', left: 44, bottom: 36, opacity: badge,
          fontFamily: 'sans-serif', fontSize: 20, color: '#f3e8cf',
          background: 'rgba(53,31,34,0.78)', padding: '7px 14px', borderRadius: 8, letterSpacing: 1.2,
        }}
      >
        v5 · PROCEDURAL 3D WORLD + 2D CAST · camera: track → push → crane · ink {INK}
      </div>
    </>
  );
};

const CharLayer: React.FC<{chars: ProjectedChar[]}> = ({chars}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {chars.map((c) => {
        const entry = Object.values(CAST).find((k) => k.id === c.id);
        if (!entry) return null;
        return (
          <div
            key={c.id}
            style={{
              position: 'absolute',
              left: c.left,
              top: c.top,
              width: c.width,
              filter: 'drop-shadow(0 2px 1px rgba(53,31,34,0.25))',
            }}
          >
            <Char2D
              cfg={entry}
              frame={frame}
              expression={c.expression}
              talking={c.talking}
              walking={c.walking}
              walkPhase={c.walkPhase}
              yaw={c.yaw}
              width={c.width}
            />
          </div>
        );
      })}
    </>
  );
};

export const StyleTest: React.FC = () => {
  const fontsReady = useFontReady();
  return (
    <AbsoluteFill style={{backgroundColor: '#f7c268'}}>
      <Stage
        worldDeps={fontsReady ? 'ready' : null}
        build={(): World => {
          const w = buildVillage({restaurantSign: 'মটন হান্ডি হাউস'});
          const [bolai, champa, fatik] = w.chars;
          bolai.expression = (f) => (f < 178 ? 'happy' : 'proud');
          bolai.talking = (f) => f >= 216 && f < 288;
          bolai.walking = (f) => f <= 178;
          bolai.walkPhase = (f) => f * 0.27;
          champa.expression = (f) => (f >= 40 && f < 96 ? 'happy' : 'neutral');
          champa.talking = (f) => f >= 40 && f < 96;
          fatik.expression = 'happy';
          return w;
        }}
      >
        {(chars) => <CharLayer chars={chars} />}
      </Stage>
      <Overlay />
      <Audio src={staticFile('audio/dialogue/S01_SH03_bolai.mp3')} startFrom={0} />
    </AbsoluteFill>
  );
};
