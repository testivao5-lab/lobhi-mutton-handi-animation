import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONT_STACK} from '../config/constants';

/**
 * Bengali subtitle overlay — white text, dark outline, bottom-center, max 2 lines.
 *
 * IMPORTANT (master prompt §11): subtitles are NEVER burned into the final MP4.
 * The final video is rendered clean; `subtitles/lobhi-mutton-handi-bengali.srt`
 * is delivered separately. This component exists only for review/preview builds
 * where burned-in subs help the director judge timing.
 */
export const Subtitle: React.FC<{
  text: string;
  maxWidth?: number;
  fontSize?: number;
}> = ({text, maxWidth = 1400, fontSize = 44}) => (
  <AbsoluteFill
    style={{
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 60,
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        fontFamily: FONT_STACK,
        fontSize,
        color: '#ffffff',
        textAlign: 'center',
        maxWidth,
        lineHeight: 1.35,
        textShadow:
          '0 2px 6px rgba(0,0,0,0.92), 0 0 2px rgba(0,0,0,0.92), -1px 0 0 rgba(0,0,0,0.6), 1px 0 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(0,0,0,0.6)',
      }}
    >
      {text}
    </div>
  </AbsoluteFill>
);
