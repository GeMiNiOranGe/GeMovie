import React from 'react';
import { type ListRenderItemInfo } from 'react-native';

import type {
  DetailsSectionProps,
  DetailsSectionState,
  MediaElement,
} from '@shared/types';
import { VideoService } from '@services';
import { isMovieElement, toMediaElement } from '@shared/utils';
import { CompactMovieCard, CompactTvShowCard, Section } from '@components';

class Recommendation extends React.PureComponent<
  DetailsSectionProps,
  DetailsSectionState<MediaElement[]>
> {
  public constructor(props: DetailsSectionProps) {
    super(props);
    this.state = {
      results: [],
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

      const results = response.getResults();

      this.setState({ results, isFetching: false });
    } catch (error: unknown) {
      this.setState({ error: error as Error });
    }
  }

  public renderItem({
    item,
    index,
  }: ListRenderItemInfo<MediaElement>): React.JSX.Element {
    if (isMovieElement(item)) {
      return (
        <CompactMovieCard
          item={item}
          index={index}
          listLength={this.state.results.length}
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
        listLength={this.state.results.length}
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
        data={this.state.results}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Recommendation;
