import React from 'react';
import {random, useCurrentFrame} from 'remotion';

/**
 * Reusable particle/FX layer library (storyboard §5.3):
 * steam, smoke, fire flicker, scent waves. All motion is deterministic
 * (Remotion `random()` with seeds) so renders are reproducible.
 */

export const Steam: React.FC<{
  x: number;
  y: number;
  count?: number;
  seed?: string;
  scale?: number;
  rise?: number;
  opacity?: number;
}> = ({x, y, count = 6, seed = 'steam', scale = 1, rise = 220, opacity = 0.55}) => {
  const frame = useCurrentFrame();
  const cycle = 150;
  const puffs = Array.from({length: count}, (_, i) => {
    const off = random(`${seed}-off-${i}`) * cycle;
    const age = ((frame + off) % cycle) / cycle;
    const sway = Math.sin((frame + i * 40) / 22) * 18 * scale;
    const size = (26 + random(`${seed}-size-${i}`) * 30) * scale * (0.6 + age * 0.8);
    const o = Math.sin(Math.min(age, 1) * Math.PI) * opacity;
    return (
      <circle
        key={i}
        cx={x + sway + (random(`${seed}-dx-${i}`) - 0.5) * 30}
        cy={y - age * rise}
        r={size}
        fill="#f5efe4"
        opacity={o}
      />
    );
  });
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{position: 'absolute', inset: 0, filter: 'blur(6px)'}}
    >
      {puffs}
    </svg>
  );
};

export const FireFlicker: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color?: string;
}> = ({x, y, scale = 1, color = '#ff9d3c'}) => {
  const frame = useCurrentFrame();
  const wobble = random(`fire-${Math.floor(frame / 2)}`);
  const h = (34 + wobble * 14) * scale;
  const w = (26 + wobble * 8) * scale;
  return (
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id={`fireGrad-${x}-${y}`}>
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor="rgba(255,120,40,0)" />
        </radialGradient>
      </defs>
      <ellipse cx={x} cy={y} rx={w} ry={h} fill={`url(#fireGrad-${x}-${y})`} opacity={0.85} />
      <ellipse cx={x} cy={y + 6} rx={w * 1.6} ry={h * 0.5} fill="rgba(255,140,60,0.25)" />
    </svg>
  );
};

export const ScentWave: React.FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  opacity?: number;
}> = ({fromX, fromY, toX, toY, opacity = 0.4}) => {
  const frame = useCurrentFrame();
  const progress = (frame % 90) / 90;
  const px = fromX + (toX - fromX) * progress;
  const py = fromY + (toY - fromY) * progress - Math.sin(progress * Math.PI) * 40;
  return (
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${px - 40 + i * 12} ${py - i * 10} q 20 -14 40 0 q 20 14 40 0`}
          stroke="#f0dcb8"
          strokeWidth={3 - i * 0.6}
          fill="none"
          opacity={opacity * (1 - i * 0.25) * Math.sin(progress * Math.PI)}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};
