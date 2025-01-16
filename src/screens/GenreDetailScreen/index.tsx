import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { GenreDetailScreenState, RootScreenProps } from '@shared/types';
import { FullScreenLoader, VideoHorizontalListSection } from '@components';
import { MovieService, TvShowService, VideoDiscoveryService } from '@services';
import { toMovieElement, toTvShowElement } from '@shared/utils';
import { layout } from '@shared/themes';
import styles from './style';

class GenreDetailScreen extends React.PureComponent<
  RootScreenProps<'GenreDetailScreen'>,
  GenreDetailScreenState
> {
  public constructor(props: RootScreenProps<'GenreDetailScreen'>) {
    super(props);
    this.state = {
      popularMovies: [],
      popularTvShows: [],
      topRatedMovies: [],
      topRatedTvShows: [],
      upcomingMovies: [],
      onTheAirTvShow: [],
      isLoading: true,
    };
  }

  public override async componentDidMount(): Promise<void> {
    const { genre } = this.props.route.params;

    // TODO: check genre is for movies, if true get 3 api related to movies, otherwise get tv show
    const [
      popularMoviesResponse,
      popularTvShowsResponse,
      topRatedMoviesResponse,
      topRatedTvShowsResponse,
      upcomingMoviesResponse,
      onTheAirTvShowResponse,
    ] = await Promise.all([
      VideoDiscoveryService.getVideoByGenreAsync(
        'movie',
        genre.id.toString(),
        toMovieElement,
      ),
      VideoDiscoveryService.getVideoByGenreAsync(
        'tv',
        genre.id.toString(),
        toTvShowElement,
      ),
      VideoDiscoveryService.getVideoByGenreAsync(
        'movie',
        genre.id.toString(),
        toMovieElement,
        'vote_average.desc',
      ),
      VideoDiscoveryService.getVideoByGenreAsync(
        'tv',
        genre.id.toString(),
        toTvShowElement,
        'vote_average.desc',
      ),
      MovieService.getUpcomingByGenreAsync(genre.id.toString()),
      TvShowService.getOnTheAirByGenreAsync(genre.id.toString()),
    ]);

    this.setState({
      popularMovies: popularMoviesResponse.getResults(),
      popularTvShows: popularTvShowsResponse.getResults(),
      topRatedMovies: topRatedMoviesResponse.getResults(),
      topRatedTvShows: topRatedTvShowsResponse.getResults(),
      upcomingMovies: upcomingMoviesResponse.getResults(),
      onTheAirTvShow: onTheAirTvShowResponse.getResults(),
      isLoading: false,
    });
    this.props.navigation.setOptions({ title: genre.name });
  }

  public override render(): React.JSX.Element {
    if (this.state.isLoading) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView>
          <View style={styles.titleBox}>
            <Text style={styles.subtext}>Genre</Text>
            <Text style={styles.title}>
              {this.props.route.params.genre.name}
            </Text>
          </View>

          <VideoHorizontalListSection
            WatchList
            data={this.state.popularMovies}
            type='movie'
            title='Popular movies'
            navigation={this.props.navigation}
          />

          <VideoHorizontalListSection
            WatchList
            data={this.state.topRatedMovies}
            type='movie'
            title='Top rated movies'
            navigation={this.props.navigation}
          />

          <VideoHorizontalListSection
            data={this.state.upcomingMovies}
            type='movie'
            title='Coming soon'
            isUpcoming
            navigation={this.props.navigation}
          />

          <VideoHorizontalListSection
            WatchList
            data={this.state.popularTvShows}
            type='tv'
            title='Popular TV series'
            navigation={this.props.navigation}
          />

          <VideoHorizontalListSection
            WatchList
            data={this.state.topRatedTvShows}
            type='tv'
            title='Top rated TV series'
            navigation={this.props.navigation}
          />

          <VideoHorizontalListSection
            WatchList
            data={this.state.onTheAirTvShow}
            type='tv'
            title='Upcoming TV series'
            isUpcoming
            navigation={this.props.navigation}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default GenreDetailScreen;
