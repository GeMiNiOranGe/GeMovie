/* eslint-disable prettier/prettier */
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
import LinearGradient from 'react-native-linear-gradient';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import { Slideshow } from '@components';
import type {
  Person,
  FeaturedMovie,
  FeaturedTvShow,
  RootScreenProps,
  HomeScreenState,
} from '@shared/types';
import styles from './style';

class HomeScreen extends React.Component<RootScreenProps<'HomeScreen'>, HomeScreenState> {
  public override state = {
    movies: [] as FeaturedMovie[],
    people: [] as Person[],
    upcomingMovies: [] as any[],
    tvShow: [] as unknown as FeaturedTvShow[],
    isLoading: true,
    backgroundImageIndex: 0,
  };


  public override componentDidMount() {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
    const personUrl = `${TMDB_BASE_URL}/person/popular?api_key=${TMDB_API_KEY}`;
    const upcomingMoviesUrl = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`;
    const tvShowsUrl = `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`;
    Promise.all([
      fetch(url).then(response => response.json()),
      fetch(personUrl).then(response => response.json()),
      fetch(upcomingMoviesUrl).then(response => response.json()),
      fetch(tvShowsUrl).then(response => response.json()),
    ])
      .then(([movieData, personData, upcomingMoviesData, tvShowData]) => {
        this.setState({
          movies: movieData.results,
          people: personData.results,
          upcomingMovies: upcomingMoviesData.results,
          tvShow: tvShowData.results,
          isLoading: false,
        });
      })
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
      <LinearGradient
        style={styles.container}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#544a7d', '#ffd452']}
      >
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
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.containerSectionTitle}>
              <Text style={styles.sectionTitle}>Featured Today</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SeeAllScreen')}
              >
                <Text style={styles.sectionTitle}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={movies}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const imageUrl = URLBuilder.buildImageURL(
                  'w185',
                  item.poster_path
                );
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MovieDetailScreen', {
                      movieId: item.id,
                    })}
                  >
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.movieThumbnail} />
                  </TouchableOpacity>
                );
              } }
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.movieList} />
          </View>

          {/* Most Popular Celebrities */}
          <View style={styles.section}>
            <View style={styles.containerSectionTitle}>
              <Text style={styles.sectionTitle}>Most popular celebrities</Text>
              <TouchableOpacity>
                <Text style={styles.sectionTitle}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={people}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const imageUrl = URLBuilder.buildImageURL(
                  'w185',
                  item.profile_path
                );
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate('PersonDetailScreen', {
                      personId: item.id,
                    })}
                  >
                    <View style={styles.celebrityItem}>
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.celebrityThumbnail} />
                      <Text style={styles.celebrityName}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              } }
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.celebrityList} />
            {/* TV Show */}
            <View style={styles.containerTV}>
              <View style={styles.containerSectionTitle}>
                <Text style={styles.sectionTitle}>TV Show</Text>
                <Text style={styles.sectionTitle}>See All</Text>
              </View>
              <FlatList
                data={tvShow}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  const imageUrl = URLBuilder.buildImageURL(
                    'w185',
                    item.poster_path
                  );
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TvShowDetailScreen', {
                        tvShowId: item.id,
                      })}
                    >
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.TvThumbnail} />
                    </TouchableOpacity>
                  );
                } }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.TvList} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
export default HomeScreen;
