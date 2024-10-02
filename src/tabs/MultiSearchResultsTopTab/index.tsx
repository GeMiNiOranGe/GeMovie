import React from 'react';
import { ListRenderItem } from 'react-native';

import { SearchResultsTopTabBase } from '@base';
import {
  MovieSearchCard,
  PersonSearchCard,
  TvShowSearchCard,
} from '@components';
import { SearchService, type SearchResponseWrapper } from '@services';
import type {
  MultiSearchElement,
  SearchResultsTopTabBaseProps,
} from '@shared/types';
import {
  isMovieElement,
  isTvShowElement,
  toMultiSearchElement,
} from '@shared/utils';

async function searchAsync(
  text: string,
  page: number = 1,
): Promise<SearchResponseWrapper<MultiSearchElement>> {
  const params = new URLSearchParams({
    query: text,
    page: `${page}`,
  });
  return await SearchService.searchAsync('multi', params, toMultiSearchElement);
}

class MultiSearchResultsTopTab extends SearchResultsTopTabBase<MultiSearchElement> {
  public constructor(props: SearchResultsTopTabBaseProps) {
    super(props, searchAsync);
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
        <MovieSearchCard
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
        <TvShowSearchCard
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
      <PersonSearchCard
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
