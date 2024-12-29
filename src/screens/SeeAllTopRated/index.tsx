import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type {
  MovieElement,
  RootScreenProps,
  TopRatedState,
} from '@shared/types';
import { GenreService, VideoService } from '@services';
import { FullScreenLoader, MovieDetailCard } from '@components';
import { toMovieElement } from '@shared/utils';
import { layout } from '@shared/themes';
import styles from './style';

class TopRated extends React.Component<
  RootScreenProps<'SeeAllTopRated'>,
  TopRatedState
> {
  public constructor(props: RootScreenProps<'SeeAllTopRated'>) {
    super(props);
    this.state = {
      movies: [],
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const [moviesResponse] = await Promise.all([
      VideoService.getTopRatedAsync('movie', toMovieElement),
      GenreService.instance.fetchGenres(),
    ]);

    this.setState({ movies: moviesResponse.getResults() });
  }

  private renderItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element {
    return (
      <MovieDetailCard
        showRank
        item={item}
        index={index}
        listLength={this.state.movies.length}
        onPress={() => {
          this.props.navigation.navigate('MovieDetailScreen', {
            movieId: item.id,
          });
        }}
      />
    );
  }

  public override render(): React.JSX.Element {
    if (this.state.movies.length === 0) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={layout.flex1}>
        <FlatList
          contentContainerStyle={styles.contentList}
          data={this.state.movies}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

export default TopRated;
