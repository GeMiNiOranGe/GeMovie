import React from 'react';
import {
  SafeAreaView,
  ListRenderItemInfo,
  ScrollView,
  View,
  Text,
} from 'react-native';

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
      topRatedMovies: [],
      topRatedTvShows: [],
      isLoading: true,
    };

    this.renderMovieItem = this.renderMovieItem.bind(this);
    this.renderTvShowItem = this.renderTvShowItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { genre } = this.props.route.params;

    const [
      popularMoviesResponse,
      popularTvShowsResponse,
      topRatedMoviesResponse,
      topRatedTvShowsResponse,
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
    ]);

    this.setState({
      popularMovies: popularMoviesResponse.getResults(),
      popularTvShows: popularTvShowsResponse.getResults(),
      topRatedMovies: topRatedMoviesResponse.getResults(),
      topRatedTvShows: topRatedTvShowsResponse.getResults(),
      isLoading: false,
    });
    this.props.navigation.setOptions({ title: genre.name });
  }

  private renderMovieItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element {
    return (
      <CompactMovieCard
        item={item}
        index={index}
        listLength={this.state.popularMovies.length}
        onPress={() =>
          this.props.navigation.push('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  }

  private renderTvShowItem({
    item,
    index,
  }: ListRenderItemInfo<TvShowElement>): React.JSX.Element {
    return (
      <CompactTvShowCard
        item={item}
        index={index}
        listLength={this.state.popularTvShows.length}
        onPress={() =>
          this.props.navigation.push('TvShowDetailScreen', {
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
          <View style={styles.titleBox}>
            <Text style={styles.subtext}>Genre</Text>
            <Text style={styles.title}>
              {this.props.route.params.genre.name}
            </Text>
          </View>

          {this.state.popularMovies.length !== 0 && (
            <>
              <Section title='Popular movies'>
                <Section.HorizontalList
                  keyExtractor={item => item.id.toString()}
                  data={this.state.popularMovies}
                  renderItem={this.renderMovieItem}
                />
              </Section>

              <Section.Separator />
            </>
          )}

          {this.state.topRatedMovies.length !== 0 && (
            <>
              <Section title='Top rated movies'>
                <Section.HorizontalList
                  keyExtractor={item => item.id.toString()}
                  data={this.state.topRatedMovies}
                  renderItem={this.renderMovieItem}
                />
              </Section>

              <Section.Separator />
            </>
          )}

          {this.state.popularTvShows.length !== 0 && (
            <>
              <Section title='Popular TV series'>
                <Section.HorizontalList
                  keyExtractor={item => item.id.toString()}
                  data={this.state.popularTvShows}
                  renderItem={this.renderTvShowItem}
                />
              </Section>

              <Section.Separator />
            </>
          )}

          {this.state.topRatedTvShows.length !== 0 && (
            <Section title='Popular TV series'>
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.topRatedTvShows}
                renderItem={this.renderTvShowItem}
              />
            </Section>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default GenreDetailScreen;
