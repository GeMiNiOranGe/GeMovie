import React from 'react';
import { FlatList, type ListRenderItemInfo, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import type {
  MediaElement,
  SuggestionProps,
  SuggestionState,
} from '@shared/types';
import { VideoService } from '@services';
import { isMovieElement, toMediaElement } from '@shared/utils';
import { CompactMovieCard, CompactTvShowCard } from '@components';
import styles from './styles';

class Suggestion extends React.PureComponent<SuggestionProps, SuggestionState> {
  public constructor(props: SuggestionProps) {
    super(props);
    this.state = {
      recommendItems: [],
      isFetching: true,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    try {
      const response = await VideoService.getRecommendationsAsync(
        this.props.type,
        this.props.id,
        toMediaElement,
      );

      const recommendItems = response.getResults();

      this.setState({ recommendItems, isFetching: false });
    } catch (error: unknown) {
      console.error(`Error: ${error}`);
    }
  }

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

  private renderListEmpty(): React.JSX.Element {
    return (
      <Text style={styles.noRecommendationText}>
        No recommendations available.
      </Text>
    );
  }

  public override render(): React.JSX.Element {
    if (this.state.isFetching) {
      return (
        <ActivityIndicator style={styles.activityIndicator} size='small' />
      );
    }

    return (
      <FlatList
        contentContainerStyle={styles.listContent}
        horizontal
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={this.renderListEmpty}
        data={this.state.recommendItems}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Suggestion;
