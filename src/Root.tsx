import React from 'react';
import {Composition} from 'remotion';
import {MainEpisode} from './compositions/MainEpisode';
import {FPS, HEIGHT, WIDTH} from './config/constants';
import {TOTAL_STORYBOARD_FRAMES} from './data/shots';

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
      {/* TestClip (first animation quality test) is registered in a follow-up commit
          once the character designs and voices are approved — approval gate #3/#4. */}
    </>
  );
};
