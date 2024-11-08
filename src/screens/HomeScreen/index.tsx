import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Star1 } from 'iconsax-react-native';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import { Slideshow } from '@components';
import type { RootScreenProps, HomeScreenState } from '@shared/types';
import { colors } from '@shared/themes';
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
      tvShow: [],
      topRated: [],
      trend: [],
      isLoading: true,
      backgroundImageIndex: 0,
    };
  }

  public override componentDidMount() {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
    const personUrl = `${TMDB_BASE_URL}/person/popular?api_key=${TMDB_API_KEY}`;
    const upcomingMoviesUrl = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`;
    const tvShowsUrl = `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`;
    const topRatedUrl = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
    const trendUrl = `${TMDB_BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}&language=en-US`;
    Promise.all([
      fetch(url).then(response => response.json()),
      fetch(personUrl).then(response => response.json()),
      fetch(upcomingMoviesUrl).then(response => response.json()),
      fetch(tvShowsUrl).then(response => response.json()),
      fetch(topRatedUrl).then(response => response.json()),
      fetch(trendUrl).then(response => response.json()),
    ])
      .then(
        ([
          movieData,
          personData,
          upcomingMoviesData,
          tvShowData,
          topRatedData,
          trendData,
        ]) => {
          this.setState({
            movies: movieData.results,
            people: personData.results,
            upcomingMovies: upcomingMoviesData.results,
            tvShow: tvShowData.results,
            topRated: topRatedData.results,
            trend: trendData.results,
            isLoading: false,
          });
        },
      )
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      });
  }

  public override render() {
    const {
      movies,
      people,
      upcomingMovies,
      tvShow,
      topRated,
      trend,
      isLoading,
    } = this.state;
    const { navigation } = this.props;
    if (isLoading) {
      return (
        <View style={[styles.loadingContainer, styles.horizontal]}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    const upcomingMoviesImages = upcomingMovies.map(movie =>
      URLBuilder.buildImageURL('w780', movie.backdrop_path),
    );
    const upcomingMoviesTitles = upcomingMovies.map(movie => movie.title);

    const upcomingMoviesReleaseDates = upcomingMovies.map(
      movie => movie.release_date,
    );

    const upcomingMoviesIds = upcomingMovies.map(movie => movie.id);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Slideshow
            images={upcomingMoviesImages}
            titles={upcomingMoviesTitles}
            releaseDates={upcomingMoviesReleaseDates}
            movieIds={upcomingMoviesIds}
            navigateToMovieDetail={movieId =>
              navigation.navigate('MovieDetailScreen', {
                movieId,
              })
            }
          />
        </View>
        <View style={styles.section}>
          <View style={styles.containerSectionTitle}>
            <Text style={styles.sectionTitle}>Featured Today</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SeeAllMovieScreen')}
            >
              <Text style={styles.sectionTitle}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={movies.slice(0, 10)}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const imageUrl = URLBuilder.buildImageURL(
                'w185',
                item.poster_path,
              );
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MovieDetailScreen', {
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
          {/* TV Show */}
          <View style={styles.containerTV}>
            <View style={styles.containerSectionTitle}>
              <Text style={styles.sectionTitle}>TV Show</Text>
              <Text
                style={styles.sectionTitle}
                onPress={() => navigation.navigate('SeeAllTV')}
              >
                See All
              </Text>
            </View>
            <FlatList
              data={tvShow.slice(0, 10)}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const imageUrl = URLBuilder.buildImageURL(
                  'w185',
                  item.poster_path,
                );
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('TvShowDetailScreen', {
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
                onPress={() => navigation.navigate('SeeAllTopRated')}
              >
                <Text style={styles.sectionTitle}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={topRated.slice(0, 10)}
              horizontal
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.movieList}
              renderItem={({ item, index }) => {
                const imageUrl = URLBuilder.buildImageURL(
                  'w185',
                  item.poster_path,
                );
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MovieDetailScreen', {
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
                onPress={() => navigation.navigate('TrendingScreen')}
              >
                <Text style={styles.sectionTitle}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={trend}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const imageUrl = URLBuilder.buildImageURL(
                  'w185',
                  item.poster_path,
                );
                const mediaTypeLabel =
                  item.media_type === 'movie' ? 'Movie' : 'TV Show';
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.media_type === 'movie') {
                        navigation.navigate('MovieDetailScreen', {
                          movieId: item.id,
                        });
                      } else {
                        navigation.navigate('TvShowDetailScreen', {
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
              onPress={() => navigation.navigate('SeeAllPersonScreen')}
            >
              <Text style={styles.sectionTitle}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={people.slice(0, 10)}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const imageUrl = URLBuilder.buildImageURL(
                'w185',
                item.profile_path,
              );
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('PersonDetailScreen', {
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
