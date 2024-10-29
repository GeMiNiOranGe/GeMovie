import React from 'react';

import type { VideoElement, VideoCardBaseProps } from '@shared/types';
import {
  BronzeMedal,
  GoldMedal,
  NormalMedal,
  SilverMedal,
} from '@assets/icons';
import { colors } from '@shared/themes';

abstract class VideoCardBase<
  E extends VideoElement,
> extends React.PureComponent<VideoCardBaseProps<E>> {
  protected abstract get originalName(): string;
  protected abstract get name(): string;
  protected abstract get airDate(): Date;
  protected abstract get mediaType(): string;

  protected get video(): boolean {
    return false;
  }

  protected get originCountry(): string[] {
    return [];
  }

  protected renderMedalIcon(
    size: number | undefined = undefined,
  ): React.ReactNode {
    const position = this.props.index + 1;

    return (
      <>
        {position === 1 ? (
          <GoldMedal size={size} />
        ) : position === 2 ? (
          <SilverMedal size={size} />
        ) : position === 3 ? (
          <BronzeMedal size={size} />
        ) : (
          <NormalMedal
            size={size}
            color={colors.primary}
            value={position}
            fontColor='black'
          />
        )}
      </>
    );
  }
}

export default VideoCardBase;
