import { VideoDetailCardBase } from '@base';
import type { TvShowElement } from '@shared/types';

class TvShowDetailCard extends VideoDetailCardBase<TvShowElement> {
  protected override get originalName(): string {
    return this.props.item.originalName;
  }

  protected override get name(): string {
    return this.props.item.name;
  }

  protected override get airDate(): Date {
    return this.props.item.firstAirDate;
  }

  protected override get originCountry(): string[] {
    return this.props.item.originCountry;
  }

  protected override get mediaType(): string {
    return 'Tv series';
  }
}

export default TvShowDetailCard;
