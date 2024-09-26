import { VideoSearchCardBase } from '@base';
import type { MovieElement } from '@shared/types';

class MovieSearchCard extends VideoSearchCardBase<MovieElement> {
  protected override get originalName(): string {
    return this.props.item.originalTitle;
  }

  protected override get name(): string {
    return this.props.item.title;
  }

  protected override get airDate(): Date {
    return this.props.item.releaseDate;
  }

  protected override get mediaType(): string {
    return 'Movie';
  }
}

export default MovieSearchCard;
