import React from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';

import { VideoService } from '@services';
import type {
  MovieElement,
  RootScreenProps,
  SeeAllMoviesState,
} from '@shared/types';
import { CompactMovieCard, FullScreenLoader } from '@components';
import { toMovieElement } from '@shared/utils';
import styles from './style';

class AllMovies extends React.Component<
  RootScreenProps<'SeeAllMovieScreen'>,
  SeeAllMoviesState
> {
  public constructor(props: RootScreenProps<'SeeAllMovieScreen'>) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  public override componentDidMount() {
    try {
      const getMovies = VideoService.getPopularListAsync(
        'movie',
        toMovieElement,
      );
      getMovies.then(movies => {
        this.setState({ movies: movies.getResults(), isLoading: false });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ isLoading: false });
    }
  }

  private renderPopularMovieItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element {
    return (
      <CompactMovieCard
        showWatchList
        item={item}
        index={index}
        listLength={this.state.movies.length}
        onPress={() =>
          this.props.navigation.navigate('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  }

  public override render() {
    if (this.state.isLoading) {
      return <FullScreenLoader />;
    }
    const { movies } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.movieList}>
          <FlatList
            data={movies}
            renderItem={this.renderPopularMovieItem.bind(this)}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.movieCard}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default AllMovies;
