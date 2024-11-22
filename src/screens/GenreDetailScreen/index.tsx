import React from 'react';
import { SafeAreaView, ListRenderItemInfo, ScrollView } from 'react-native';

import type {
  GenreDetailScreenState,
  MovieElement,
  RootScreenProps,
  TvShowElement,
} from '@shared/types';
import {
  CompactMovieCard,
  CompactTvShowCard,
  FullScreenLoader,
  Section,
} from '@components';
import { VideoService } from '@services';
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
      isLoading: true,
    };

    this.renderPopularMovieItem = this.renderPopularMovieItem.bind(this);
    this.renderPopularTvShowItem = this.renderPopularTvShowItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { genre, type } = this.props.route.params;

    const [popularMoviesResponse, popularTvShowsResponse] = await Promise.all([
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
    ]);

    this.setState({
      popularMovies: popularMoviesResponse.getResults(),
      popularTvShows: popularTvShowsResponse.getResults(),
      isLoading: false,
    });
    this.props.navigation.setOptions({ title: genre.name });
  }

  private renderPopularMovieItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element {
    return (
      <CompactMovieCard
        item={item}
        index={index}
        listLength={this.state.popularMovies.length}
        onPress={() =>
          this.props.navigation.navigate('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  }

  private renderPopularTvShowItem({
    item,
    index,
  }: ListRenderItemInfo<TvShowElement>): React.JSX.Element {
    return (
      <CompactTvShowCard
        item={item}
        index={index}
        listLength={this.state.popularTvShows.length}
        onPress={() =>
          this.props.navigation.navigate('TvShowDetailScreen', {
            tvShowId: item.id,
          })
        }
      />
    );
  }

  public override render(): React.JSX.Element {
    if (this.state.isLoading) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView>
          {this.state.popularMovies.length !== 0 && (
            <Section
              title='Popular movies'
              subtitle={`Trending in ${this.props.route.params.genre.name} movies`}
            >
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.popularMovies}
                renderItem={this.renderPopularMovieItem}
              />
            </Section>
          )}

          {this.state.popularTvShows.length !== 0 && (
            <Section
              title='Popular TV shows'
              subtitle={`Trending in ${this.props.route.params.genre.name} TV shows`}
            >
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.popularTvShows}
                renderItem={this.renderPopularTvShowItem}
              />
            </Section>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default GenreDetailScreen;
