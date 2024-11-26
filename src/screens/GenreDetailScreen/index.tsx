import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { GenreDetailScreenState, RootScreenProps } from '@shared/types';
import { FullScreenLoader, VideoHorizontalListSection } from '@components';
import { MovieService, TvShowService, VideoService } from '@services';
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

    const [
      popularMoviesResponse,
      popularTvShowsResponse,
      topRatedMoviesResponse,
      topRatedTvShowsResponse,
      upcomingMoviesResponse,
      onTheAirTvShowResponse,
    ] = await Promise.all([
      VideoService.getPopularListByGenreAsync(
        'movie',
        toMovieElement,
        genre.id.toString(),
      ),
      VideoService.getPopularListByGenreAsync(
        'tv',
        toTvShowElement,
        genre.id.toString(),
      ),
      VideoService.getTopRatedByGenreAsync(
        'movie',
        toMovieElement,
        genre.id.toString(),
      ),
      VideoService.getTopRatedByGenreAsync(
        'tv',
        toTvShowElement,
        genre.id.toString(),
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
            data={this.state.popularMovies}
            type='movie'
            title='Popular movies'
            navigation={this.props.navigation}
          />

          <VideoHorizontalListSection
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
            data={this.state.popularTvShows}
            type='tv'
            title='Popular TV series'
            navigation={this.props.navigation}
          />

          <VideoHorizontalListSection
            data={this.state.topRatedTvShows}
            type='tv'
            title='Top rated TV series'
            navigation={this.props.navigation}
          />

          <VideoHorizontalListSection
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
