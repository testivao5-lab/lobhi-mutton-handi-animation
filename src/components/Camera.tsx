import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export interface CameraMove {
  /** Starting scale (1 = no zoom). */
  zoomStart?: number;
  /** Ending scale. */
  zoomEnd?: number;
  /** Total pan distance in px (applied linearly across the eased progress). */
  panX?: number;
  panY?: number;
  /** Duration of the move in frames (defaults to the whole composition). */
  durationInFrames?: number;
}

/**
 * Cinematic camera wrapper: smooth easeInOut zoom/pan over the composition.
 * Storyboard §9 rules: no unmotivated continuous zoom — every Camera use must
 * correspond to a camera movement declared in the shot data.
 */
export const Camera: React.FC<{move: CameraMove; children: React.ReactNode}> = ({
  move,
  children,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const span = move.durationInFrames ?? durationInFrames;
  const p = interpolate(frame, [0, span], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });
  const z0 = move.zoomStart ?? 1;
  const z1 = move.zoomEnd ?? z0;
  const zoom = z0 + (z1 - z0) * p;
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${zoom}) translate(${(move.panX ?? 0) * p}px, ${(move.panY ?? 0) * p}px)`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
