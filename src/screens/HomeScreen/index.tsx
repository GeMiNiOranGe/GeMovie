import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Star1 } from 'iconsax-react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  MediaService,
  MovieService,
  PersonService,
  URLBuilder,
  VideoService,
} from '@services';
import { Slideshow } from '@components';
import type { RootScreenProps, HomeScreenState } from '@shared/types';
import { colors, layout } from '@shared/themes';
import {
  getFormattedDate,
  isMovieElement,
  isTvShowElement,
  toMovieElement,
  toMultiSearchElement,
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
  }

  public override async componentDidMount() {
    try {
      const [movies, tvShows, people, topRated, trend, upcomingMovies] =
        await Promise.all([
          VideoService.getPopularListAsync('movie', toMovieElement),
          VideoService.getPopularListAsync('tv', toTvShowElement),
          PersonService.getPopularListAsync(),
          VideoService.getTopRatedAsync('movie', toMovieElement),
          MediaService.getTrendingAsync('all', 'day', toMultiSearchElement),
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

  public override render() {
    if (this.state.isLoading) {
      return (
        <SafeAreaView style={[layout.flex1, layout.center, styles.loading]}>
          <ActivityIndicator size='large' />
        </SafeAreaView>
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
        <View style={styles.header}>
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

        <View style={styles.section}>
          <View style={styles.containerSectionTitle}>
            <Text style={styles.sectionTitle}>Featured Today</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SeeAllMovieScreen')
              }
            >
              <Text style={styles.sectionTitle}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.movies.slice(0, 10)}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const imageUrl = URLBuilder.buildImageURL(
                'w185',
                item.posterPath,
              );
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('MovieDetailScreen', {
                      movieId: item.id,
                    })
                  }
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.movieThumbnail}
                  />
                  <View style={styles.percentVote}>
                    <Star1
                      size={23}
                      color={colors.neutral.toString()}
                      variant='Bold'
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.movieList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.containerTV}>
            <View style={styles.containerSectionTitle}>
              <Text style={styles.sectionTitle}>TV Show</Text>
              <Text
                style={styles.sectionTitle}
                onPress={() => this.props.navigation.navigate('SeeAllTV')}
              >
                See All
              </Text>
            </View>

            <FlatList
              data={this.state.tvShows.slice(0, 10)}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const imageUrl = URLBuilder.buildImageURL(
                  'w185',
                  item.posterPath,
                );
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('TvShowDetailScreen', {
                        tvShowId: item.id,
                      })
                    }
                  >
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.TvThumbnail}
                    />
                    <View style={styles.percentVote}>
                      <Star1
                        size='24'
                        color={colors.neutral.toString()}
                        variant='Bold'
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.TvList}
            />
          </View>

          <View style={styles.containerTV}>
            <View style={styles.containerSectionTitle}>
              <Text style={styles.sectionTitle}>Top 10 Rated</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SeeAllTopRated')}
              >
                <Text style={styles.sectionTitle}>See All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={this.state.topRated.slice(0, 10)}
              horizontal
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.movieList}
              renderItem={({ item, index }) => {
                const imageUrl = URLBuilder.buildImageURL(
                  'w185',
                  item.posterPath,
                );
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('MovieDetailScreen', {
                        movieId: item.id,
                      })
                    }
                  >
                    <View style={styles.topRatedItemContainer}>
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.Thumbnail}
                      />
                      <View style={styles.rankingIcon}>
                        <Text
                          style={[styles.rankingText, styles.textWithBorder]}
                        >
                          {index + 1}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View style={styles.containerTV}>
            <View style={styles.containerSectionTitle}>
              <Text style={styles.sectionTitle}>Trending</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TrendingScreen')}
              >
                <Text style={styles.sectionTitle}>See All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={this.state.trend}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                let imageUrl: string = '';

                if (isMovieElement(item) || isTvShowElement(item)) {
                  imageUrl = URLBuilder.buildImageURL('w185', item.posterPath);
                }

                const mediaTypeLabel =
                  item.mediaType === 'movie' ? 'Movie' : 'TV Show';

                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.mediaType === 'movie') {
                        this.props.navigation.navigate('MovieDetailScreen', {
                          movieId: item.id,
                        });
                      } else {
                        this.props.navigation.navigate('TvShowDetailScreen', {
                          tvShowId: item.id,
                        });
                      }
                    }}
                  >
                    <View style={styles.genreTag}>
                      <Text style={styles.mediaType}>{mediaTypeLabel}</Text>
                    </View>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.TvThumbnail}
                    />
                  </TouchableOpacity>
                );
              }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.TvList}
            />
          </View>

          <View style={styles.containerSectionTitle}>
            <Text style={styles.sectionTitle}>Most popular celebrities</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SeeAllPersonScreen')
              }
            >
              <Text style={styles.sectionTitle}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.people.slice(0, 10)}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const imageUrl = URLBuilder.buildImageURL(
                'w185',
                item.profilePath,
              );
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    this.props.navigation.navigate('PersonDetailScreen', {
                      personId: item.id,
                    })
                  }
                >
                  <View style={styles.celebrityItem}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.celebrityThumbnail}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.celebrityList}
          />
        </View>
      </ScrollView>
    );
  }
}
export default HomeScreen;
