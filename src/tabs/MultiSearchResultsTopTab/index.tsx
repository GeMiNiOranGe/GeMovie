import React from 'react';
import { ListRenderItem } from 'react-native';

import { SearchResultsTopTabBase } from '@base';
import {
  MovieDetailCard,
  PersonDetailCard,
  TvShowDetailCard,
} from '@components';
import { SearchService, type PaginationResponseWrapper } from '@services';
import type {
  MultiSearchElement,
  SearchResultsTopTabBaseProps,
} from '@shared/types';
import {
  isMovieElement,
  isTvShowElement,
  toMultiSearchElement,
} from '@shared/utils';

async function searchMultiAsync(
  text: string,
  page: number = 1,
): Promise<PaginationResponseWrapper<MultiSearchElement>> {
  const params = new URLSearchParams({
    query: text,
    page: `${page}`,
  });
  return await SearchService.searchAsync('multi', params, toMultiSearchElement);
}

class MultiSearchResultsTopTab extends SearchResultsTopTabBase<MultiSearchElement> {
  public constructor(props: SearchResultsTopTabBaseProps) {
    super(props, searchMultiAsync);
  }

  protected override keyExtractor(item: MultiSearchElement): string {
    return item.id.toString();
  }

  protected override renderItem: ListRenderItem<MultiSearchElement> = ({
    item,
    index,
  }) => {
    if (isMovieElement(item)) {
      return (
        <MovieDetailCard
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
    if (isTvShowElement(item)) {
      return (
        <TvShowDetailCard
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
    return (
      <PersonDetailCard
        item={item}
        index={index}
        listLength={this.state.results?.length}
        onPress={() => {
          this.props.navigation.navigate('PersonDetailScreen', {
            personId: item.id,
          });
        }}
      />
    );
  };
}

export default MultiSearchResultsTopTab;
