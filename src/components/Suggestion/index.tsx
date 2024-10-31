import React from 'react';
import { FlatList, type ListRenderItemInfo, Text } from 'react-native';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import type {
  MediaElement,
  SuggestionProps,
  SuggestionState,
} from '@shared/types';
import { isMovieElement, toMediaElement } from '@shared/utils';
import { CompactMovieCard, CompactTvShowCard } from '@components';
import styles from './styles';

class Suggestion extends React.PureComponent<SuggestionProps, SuggestionState> {
  public constructor(props: SuggestionProps) {
    super(props);
    this.state = {
      recommendItems: [],
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override componentDidMount(): void {
    this.getData();
  }

  protected getData = async () => {
    const { id, type } = this.props;
    if (!id) {
      return;
    }

    const endpoint = type === 'movie' ? 'movie' : 'tv';
    const url = `${TMDB_BASE_URL}/${endpoint}/${id}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (!Array.isArray(data.results)) {
        return;
      }

      const recommendItems = data.results.map((item: any) =>
        toMediaElement(item),
      );

      this.setState({ recommendItems });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  public renderItem({ item, index }: ListRenderItemInfo<MediaElement>) {
    if (isMovieElement(item)) {
      return (
        <CompactMovieCard
          item={item}
          index={index}
          listLength={this.state.recommendItems.length}
          onPress={() => {
            this.props.navigation.push('MovieDetailScreen', {
              movieId: item.id,
            });
          }}
        />
      );
    }

    return (
      <CompactTvShowCard
        item={item}
        index={index}
        listLength={this.state.recommendItems.length}
        onPress={() => {
          this.props.navigation.push('TvShowDetailScreen', {
            tvShowId: item.id,
          });
        }}
      />
    );
  }

  public override render() {
    const { recommendItems: recommendItem } = this.state;
    return (
      <>
        {recommendItem.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.listContent}
            horizontal
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            data={recommendItem}
            renderItem={this.renderItem}
          />
        ) : (
          <Text style={styles.noRecommendationText}>
            No recommendations available.
          </Text>
        )}
      </>
    );
  }
}

export default Suggestion;
