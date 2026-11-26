import React from 'react';

/**
 * Character rig foundations (storyboard §Part 2, §8, §5.4).
 *
 * Every character component shares these types + palettes so that designs stay
 * locked. Rigs are pure SVG components parameterized by expression + mouth
 * shape + action, driven by frame-based deterministic animation.
 */

export type MouthShape =
  | 'rest'
  | 'open-small'
  | 'open-wide'
  | 'round'
  | 'smile-open'
  | 'closed';

export type Expression =
  | 'happy'
  | 'proud'
  | 'greedy'
  | 'angry'
  | 'suspicious'
  | 'nervous'
  | 'shocked'
  | 'crying'
  | 'regretful'
  | 'humble'
  | 'calm'
  | 'curious'
  | 'worried'
  | 'disappointed'
  | 'sad'
  | 'supportive'
  | 'cunning'
  | 'stern'
  | 'frightened'
  | 'determined'
  | 'confused'
  | 'disgusted'
  | 'relieved'
  | 'grateful'
  | 'surprised';

export interface CharPalette {
  skin: string;
  skinShade: string;
  hair: string;
  primary: string; // main clothing
  secondary: string; // trousers/dhoti/saree base
  accent: string; // gamcha / waistcoat / border
}

/** Design-lock palettes (storyboard Part 2). Do NOT change without approval. */
export const CHARACTER_PALETTES: Record<string, CharPalette> = {
  C01: {skin: '#b97a45', skinShade: '#a56a39', hair: '#1c1512', primary: '#e3a81c', secondary: '#f0ead8', accent: '#c0392b'}, // Bolai
  C02: {skin: '#c08a55', skinShade: '#ab7845', hair: '#18120e', primary: '#3f7d4a', secondary: '#3f7d4a', accent: '#c0392b'}, // Champa
  C03: {skin: '#b97f4c', skinShade: '#a46e3e', hair: '#1c1512', primary: '#7fb3d5', secondary: '#4a3524', accent: '#f5f0e6'}, // Subol
  C04: {skin: '#8a5a34', skinShade: '#76492a', hair: '#14100c', primary: '#8fbf6f', secondary: '#3a3a3a', accent: '#e8e0d0'}, // Tapan
  C05: {skin: '#8f5c38', skinShade: '#7b4d2e', hair: '#171310', primary: '#2e4a34', secondary: '#5a4632', accent: '#6b2230'}, // Fatik
  C06: {skin: '#bd8552', skinShade: '#a87446', hair: '#1a1410', primary: '#e8e0cc', secondary: '#3a3a3a', accent: '#d8d0bc'}, // Soumen
  C07: {skin: '#bd9268', skinShade: '#a87f58', hair: '#8f8f8f', primary: '#d8cdb4', secondary: '#f5f0e6', accent: '#c8b896'}, // Bhavesh
  C08: {skin: '#b58454', skinShade: '#9f7244', hair: '#9a9a9a', primary: '#f5f0e6', secondary: '#f5f0e6', accent: '#e0d8c4'}, // Prabhat
  C09: {skin: '#c49164', skinShade: '#b08054', hair: '#171310', primary: '#efe3c8', secondary: '#6b2230', accent: '#caa53d'}, // Raybabu
  C10: {skin: '#a87144', skinShade: '#93613a', hair: '#171310', primary: '#8a7a52', secondary: '#6b5e3e', accent: '#4a3f2a'}, // Daroga
  C11: {skin: '#bd8552', skinShade: '#a87446', hair: '#1a1410', primary: '#e8eef4', secondary: '#3a4a5a', accent: '#cfd8e0'}, // Food Officer
  GUEST: {skin: '#b58454', skinShade: '#9f7244', hair: '#1a1410', primary: '#8a5a7a', secondary: '#e8e0cc', accent: '#caa53d'},
};

/**
 * Deterministic pseudo-viseme driver: maps a frame range of speech to a mouth
 * shape sequence. Real lip-sync uses the recorded Bengali VO as the timing
 * master (storyboard §5.4); this driver provides the fallback rhythm.
 */
export const visemeAt = (
  frame: number,
  speechStart: number,
  speechEnd: number,
  seed: string
): MouthShape => {
  if (frame < speechStart || frame > speechEnd) return 'rest';
  const cycle = 4 + Math.floor(random(`${seed}-cyc`) * 3);
  const idx = Math.floor((frame - speechStart) / cycle);
  const shapes: MouthShape[] = ['open-small', 'open-wide', 'smile-open', 'round', 'open-small', 'closed'];
  return shapes[idx % shapes.length];
};

/** Irregular blink pattern (every ~2.6–4.5s, held 3 frames). */
export const isBlinking = (frame: number, seed: string): boolean => {
  const period = 64 + Math.floor(random(`${seed}-blink`) * 44);
  const phase = frame % period;
  return phase < 3;
};
