import React from 'react';
import { ListRenderItem } from 'react-native';

import { SearchResultsTopTabBase } from '@base';
import { MovieDetailCard } from '@components';
import { MovieService } from '@services';
import type { SearchResultsTopTabBaseProps, MovieElement } from '@shared/types';

class MovieSearchResultsTopTab extends SearchResultsTopTabBase<MovieElement> {
  public constructor(props: SearchResultsTopTabBaseProps) {
    super(props, MovieService.searchAsync);
  }

  protected override keyExtractor(item: MovieElement): string {
    return item.id.toString();
  }

  protected override get noResultsSubtext(): string | undefined {
    return 'No movies found';
  }

  protected override renderItem: ListRenderItem<MovieElement> = ({
    item,
    index,
  }) => (
    <MovieDetailCard
      showWatchList
      item={item}
      index={index}
      listLength={this.state.results?.length}
      onPress={() => {
        this.props.navigation.navigate('MovieDetailScreen', {
          movieId: item.id,
        });
      }}
    />
  );
}

export default MovieSearchResultsTopTab;
