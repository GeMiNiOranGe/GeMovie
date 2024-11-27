import React from 'react';
import { ListRenderItem } from 'react-native';

import { SearchResultsTopTabBase } from '@base';
import {
  MovieDetailCard,
  PersonDetailCard,
  TvShowDetailCard,
} from '@components';
import {
  APIUtils,
  URLBuilder,
  type PaginationResponseWrapper,
} from '@services';
import type {
  MultiMediaElement,
  SearchResultsTopTabBaseProps,
} from '@shared/types';
import {
  isMovieElement,
  isPersonElement,
  isTvShowElement,
  toMultiMediaElement,
} from '@shared/utils';

async function searchMultiAsync(
  text: string,
  page: number = 1,
): Promise<PaginationResponseWrapper<MultiMediaElement>> {
  const params = new URLSearchParams({
    query: text,
    page: `${page}`,
  });
  const url = URLBuilder.buildSearchURL('multi', params);
  return await APIUtils.fetchPagination(url, toMultiMediaElement);
}

class MultiSearchResultsTopTab extends SearchResultsTopTabBase<MultiMediaElement> {
  public constructor(props: SearchResultsTopTabBaseProps) {
    super(props, searchMultiAsync);
  }

  protected override keyExtractor(item: MultiMediaElement): string {
    return item.id.toString();
  }

  protected override renderItem: ListRenderItem<MultiMediaElement> = ({
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

    if (isPersonElement(item)) {
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
    }

    return null;
  };
}

export default MultiSearchResultsTopTab;
