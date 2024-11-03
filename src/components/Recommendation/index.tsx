import React from 'react';
import { type ListRenderItemInfo } from 'react-native';

import type {
  MediaElement,
  RecommendationProps,
  RecommendationState,
} from '@shared/types';
import { VideoService } from '@services';
import { isMovieElement, toMediaElement } from '@shared/utils';
import { CompactMovieCard, CompactTvShowCard, Section } from '@components';

class Recommendation extends React.PureComponent<
  RecommendationProps,
  RecommendationState
> {
  public constructor(props: RecommendationProps) {
    super(props);
    this.state = {
      recommendItems: [],
      isFetching: true,
      error: undefined,
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
      this.setState({ error: error as Error });
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

  public override render(): React.JSX.Element {
    if (this.state.error) {
      return (
        <Section.Content>
          <Section.Label
            name={this.state.error.name}
            value={this.state.error.message}
          />
        </Section.Content>
      );
    }

    return (
      <Section.HorizontalList
        loading={this.state.isFetching}
        noResultText='No recommendations available.'
        keyExtractor={item => item.id.toString()}
        data={this.state.recommendItems}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Recommendation;
