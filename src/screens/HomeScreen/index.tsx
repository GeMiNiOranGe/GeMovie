import React from 'react';
import { type ListRenderItemInfo, ScrollView, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import {
  MediaService,
  MovieService,
  PersonService,
  URLBuilder,
  VideoService,
} from '@services';
import {
  CompactMovieCard,
  CompactPersonCard,
  CompactPersonRankCard,
  CompactTvShowCard,
  Section,
  Slideshow,
} from '@components';
import type {
  RootScreenProps,
  HomeScreenState,
  MovieElement,
  TvShowElement,
  MultiMediaElement,
  PersonElement,
} from '@shared/types';
import { layout } from '@shared/themes';
import {
  getFormattedDate,
  isMovieElement,
  isPersonElement,
  isTvShowElement,
  toMovieElement,
  toMultiMediaElement,
  toTvShowElement,
} from '@shared/utils';
import styles from './style';

class HomeScreen extends React.Component<
  RootScreenProps<'HomeScreen'>,
  HomeScreenState
> {
  public constructor(props: RootScreenProps<'HomeScreen'>) {
    super(props);

    this.state = {
      movies: [],
      people: [],
      upcomingMovies: [],
      tvShows: [],
      topRated: [],
      trend: [],
      isLoading: true,
    };

    this.renderPopularMovieItem = this.renderPopularMovieItem.bind(this);
    this.renderPopularTvShowItem = this.renderPopularTvShowItem.bind(this);
    this.renderPopularPersonItem = this.renderPopularPersonItem.bind(this);
    this.renderTrendingItem = this.renderTrendingItem.bind(this);
    this.renderTopRatedItem = this.renderTopRatedItem.bind(this);
  }

  public override async componentDidMount() {
    try {
      const [movies, tvShows, people, topRated, trend, upcomingMovies] =
        await Promise.all([
          VideoService.getPopularListAsync('movie', toMovieElement),
          VideoService.getPopularListAsync('tv', toTvShowElement),
          PersonService.getPopularListAsync(),
          VideoService.getTopRatedAsync('movie', toMovieElement),
          MediaService.getTrendingAsync('all', 'day', toMultiMediaElement),
          MovieService.getUpcomingAsync(),
        ]);

      this.setState({
        movies: movies.getResults(),
        tvShows: tvShows.getResults(),
        people: people.getResults(),
        topRated: topRated.getResults(),
        trend: trend.getResults(),
        upcomingMovies: upcomingMovies.getResults(),
        isLoading: false,
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

  private renderPopularTvShowItem({
    item,
    index,
  }: ListRenderItemInfo<TvShowElement>): React.JSX.Element {
    return (
      <CompactTvShowCard
        item={item}
        index={index}
        listLength={this.state.tvShows.length}
        onPress={() =>
          this.props.navigation.navigate('TvShowDetailScreen', {
            tvShowId: item.id,
          })
        }
      />
    );
  }

  private renderPopularPersonItem({
    item,
    index,
  }: ListRenderItemInfo<PersonElement>): React.JSX.Element {
    return (
      <CompactPersonCard
        item={item}
        index={index}
        listLength={this.state.people.length}
        onPress={() =>
          this.props.navigation.navigate('PersonDetailScreen', {
            personId: item.id,
          })
        }
      />
    );
  }

  private renderTrendingItem({
    item,
    index,
  }: ListRenderItemInfo<MultiMediaElement>): React.JSX.Element {
    if (isMovieElement(item)) {
      return (
        <CompactMovieCard
          showRank
          showMediaType
          item={item}
          index={index}
          listLength={this.state.trend.length}
          onPress={() =>
            this.props.navigation.navigate('MovieDetailScreen', {
              movieId: item.id,
            })
          }
        />
      );
    }

    if (isTvShowElement(item)) {
      return (
        <CompactTvShowCard
          showRank
          showMediaType
          item={item}
          index={index}
          listLength={this.state.trend.length}
          onPress={() =>
            this.props.navigation.navigate('TvShowDetailScreen', {
              tvShowId: item.id,
            })
          }
        />
      );
    }

    if (isPersonElement(item)) {
      return (
        <CompactPersonRankCard
          item={item}
          index={index}
          listLength={this.state.trend.length}
          onPress={() =>
            this.props.navigation.navigate('PersonDetailScreen', {
              personId: item.id,
            })
          }
        />
      );
    }

    return <Text style={styles.text}>No matching element</Text>;
  }

  private renderTopRatedItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element {
    return (
      <CompactMovieCard
        item={item}
        index={index}
        listLength={this.state.topRated.length}
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
      return (
        <ActivityIndicator
          style={[layout.flex1, layout.center, styles.activityIndicator]}
          size='large'
        />
      );
    }

    const upcomingMoviesImages = this.state.upcomingMovies.map(movie =>
      URLBuilder.buildImageURL('w780', movie.backdropPath),
    );
    const upcomingMoviesTitles = this.state.upcomingMovies.map(
      movie => movie.title,
    );
    const upcomingMoviesReleaseDates = this.state.upcomingMovies.map(movie =>
      getFormattedDate(movie.releaseDate),
    );
    const upcomingMoviesIds = this.state.upcomingMovies.map(movie => movie.id);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.slideshow}>
          <Slideshow
            images={upcomingMoviesImages}
            titles={upcomingMoviesTitles}
            releaseDates={upcomingMoviesReleaseDates}
            movieIds={upcomingMoviesIds}
            navigateToMovieDetail={movieId =>
              this.props.navigation.navigate('MovieDetailScreen', {
                movieId,
              })
            }
          />
        </View>

        <Section
          title='Trending'
          moreButtonText='See all'
          onMoreButtonPress={() => {
            this.props.navigation.navigate('TrendingScreen');
          }}
        >
          <Section.HorizontalList
            keyExtractor={item => item.id.toString()}
            data={this.state.trend}
            renderItem={this.renderTrendingItem}
          />
        </Section>

        <Section.Separator />

        <Section
          title='What movies are popular'
          moreButtonText='See all'
          onMoreButtonPress={() => {
            this.props.navigation.navigate('SeeAllMovieScreen');
          }}
        >
          <Section.HorizontalList
            keyExtractor={item => item.id.toString()}
            data={this.state.movies}
            renderItem={this.renderPopularMovieItem}
          />
        </Section>

        <Section.Separator />

        <Section
          title='What TV shows are popular'
          moreButtonText='See all'
          onMoreButtonPress={() => {
            this.props.navigation.navigate('SeeAllTV');
          }}
        >
          <Section.HorizontalList
            keyExtractor={item => item.id.toString()}
            data={this.state.tvShows}
            renderItem={this.renderPopularTvShowItem}
          />
        </Section>

        <Section.Separator />

        <Section
          title='Most popular celebrities'
          moreButtonText='See all'
          onMoreButtonPress={() => {
            this.props.navigation.navigate('SeeAllPersonScreen');
          }}
        >
          <Section.HorizontalList
            keyExtractor={item => item.id.toString()}
            data={this.state.people}
            renderItem={this.renderPopularPersonItem}
          />
        </Section>

        <Section.Separator />

        <Section
          title='Top rated'
          moreButtonText='See all'
          onMoreButtonPress={() => {
            this.props.navigation.navigate('SeeAllTopRated');
          }}
        >
          <Section.HorizontalList
            keyExtractor={item => item.id.toString()}
            data={this.state.topRated}
            renderItem={this.renderTopRatedItem}
          />
        </Section>
      </ScrollView>
    );
  }
}

export default HomeScreen;
