import React from 'react';
import { type ListRenderItem } from 'react-native';

import { SearchResultsTopTabBase } from '@base';
import { TvShowDetailCard } from '@components';
import { TvShowService } from '@services';
import type {
  SearchResultsTopTabBaseProps,
  TvShowElement,
} from '@shared/types';

class TvShowSearchResultsTopTab extends SearchResultsTopTabBase<TvShowElement> {
  public constructor(props: SearchResultsTopTabBaseProps) {
    super(props, TvShowService.searchAsync);
  }

  protected override keyExtractor(item: TvShowElement): string {
    return item.id.toString();
  }

  protected override get noResultsSubtext(): string | undefined {
    return 'No TV shows found';
  }

  protected override renderItem: ListRenderItem<TvShowElement> = ({
    item,
    index,
  }) => (
    <TvShowDetailCard
      showWatchList
      item={item}
      index={index}
      listLength={this.state.results?.length}
      onPress={() => {
        this.props.navigation.navigate('TvShowDetailScreen', {
          tvShowId: item.id,
        });
      }}
    />
  );
}

export default TvShowSearchResultsTopTab;
