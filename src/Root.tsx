import React from 'react';
import {Composition} from 'remotion';
import {MainEpisode} from './compositions/MainEpisode';
import {TestClip} from './compositions/TestClip';
import {FPS, HEIGHT, WIDTH} from './config/constants';
import {TOTAL_STORYBOARD_FRAMES} from './data/shots';
import {TEST_CLIP_FRAMES} from './compositions/TestClip';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full-length timeline. Currently renders the previz storyboard card build;
          real animated scenes are wired in as they are approved and built. */}
      <Composition
        id="MainEpisode"
        component={MainEpisode}
        durationInFrames={TOTAL_STORYBOARD_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* Animation quality test clip (master prompt §6): walk cycle, expressions,
          dialogue lip-sync with the owner-approved locked Bolai voice. */}
      <Composition
        id="TestClip"
        component={TestClip}
        durationInFrames={TEST_CLIP_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
