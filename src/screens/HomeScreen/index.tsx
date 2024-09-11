import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import { Slideshow } from '@components';
import { Celebrity, FeaturedMovie, RootScreenProps } from '@shared/types';

class HomeScreen extends React.Component<RootScreenProps<'HomeScreen'>> {
  public override state = {
    movies: [] as FeaturedMovie[],
    celebrities: [] as Celebrity[],
    upcomingMovies: [] as any[],
    isLoading: true,
  };
  public override componentDidMount() {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
    const celebrityUrl = `${TMDB_BASE_URL}/person/popular?api_key=${TMDB_API_KEY}`;
    const upcomingMoviesUrl = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`;
    setTimeout(() => {
      Promise.all([
        fetch(url).then(response => response.json()),
        fetch(celebrityUrl).then(response => response.json()),
        fetch(upcomingMoviesUrl).then(response => response.json()),
      ])
        .then(([movieData, celebrityData, upcomingMoviesData]) => {
          this.setState({
            movies: movieData.results,
            celebrities: celebrityData.results,
            upcomingMovies: upcomingMoviesData.results,
            isLoading: false,
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          this.setState({ isLoading: false });
        });
    }, 700);
  }
  public override render() {
    // eslint-disable-next-line prettier/prettier
    const { movies, celebrities, upcomingMovies,isLoading} = this.state;
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
    return (
      <View style={styles.container}>
        <Slideshow
          images={upcomingMoviesImages}
          titles={upcomingMoviesTitles}
          releaseDates={upcomingMoviesReleaseDates}
        />
        <View style={styles.content}>
          <View style={styles.containerSectionTitle}>
            <Text style={styles.sectionTitle}>Featured Today</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SeeAllScreen')}
            >
              <Text style={styles.sectionTitle}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal style={styles.movieList}>
            {movies.map(movie => {
              const imageUrl = URLBuilder.buildImageURL(
                'w185',
                movie.poster_path,
              );
              return (
                <TouchableOpacity key={movie.id}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.movieThumbnail}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {/* Most Popular Celebrities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most popular celebrities</Text>
          <ScrollView horizontal style={styles.celebrityList}>
            {celebrities.map(celebrity => {
              const imageUrl = URLBuilder.buildImageURL(
                'w185',
                celebrity.profile_path,
              );
              return (
                <TouchableOpacity key={celebrity.id}>
                  <View style={styles.celebrityItem}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.celebrityThumbnail}
                    />
                    <Text style={styles.celebrityName}>{celebrity.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default HomeScreen;
