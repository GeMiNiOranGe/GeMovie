import React from 'react';
import { Text, type ListRenderItemInfo } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import type {
  ContentListScreenState,
  MediaElement,
  RootScreenProps,
} from '@shared/types';
import { isMovieElement, toMediaElement } from '@shared/utils';
import { VideoService } from '@services';
import {
  CompactMovieCard,
  CompactTvShowCard,
  PaginatedResultsList,
} from '@components';
import { layout } from '@shared/themes';
import styles from './style';

class ContentListScreen extends React.PureComponent<
  RootScreenProps<'ContentListScreen'>,
  ContentListScreenState
> {
  private totalResults = 0;

  public constructor(props: RootScreenProps<'ContentListScreen'>) {
    super(props);
    this.state = {
      results: [],
      error: undefined,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    this.props.navigation.setOptions({ title: 'Recommendations' });
    try {
      const [page1, page2] = await Promise.all([
        VideoService.getRecommendationsAsync(
          'movie',
          this.props.route.params.id,
          toMediaElement,
        ),
        VideoService.getRecommendationsAsync(
          'movie',
          this.props.route.params.id,
          toMediaElement,
          2,
        ),
      ]);

      this.totalResults = page1.getTotalResults();

      this.setState({
        results: [...page1.getResults(), ...page2.getResults()],
      });
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
          horizontal
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
        horizontal
        listLength={this.state.results.length}
        onPress={() => {
          this.props.navigation.push('TvShowDetailScreen', {
            tvShowId: item.id,
          });
        }}
      />
    );
  }

  private renderListEmpty(): React.JSX.Element {
    return <ActivityIndicator size='small' />;
  }

  public override render(): React.JSX.Element {
    if (this.state.error) {
      return (
        <SafeAreaView style={[layout.flex1, layout.center]}>
          <Text style={styles.text}>{this.state.error.message}</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={layout.flex1}>
        <PaginatedResultsList
          ListEmptyComponent={this.renderListEmpty}
          totalResults={this.totalResults}
          keyExtractor={item => item.id.toString()}
          data={this.state.results}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

export default ContentListScreen;
