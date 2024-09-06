import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';

class HomeScreen extends React.Component {
  public override state = {
    movies: [] as any[],
    selectedMovie: null as any,
  };

  public override componentDidMount() {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ movies: data.results, selectedMovie: data.results[0] });
      });
  }
  private handleMovieSelect = (movie: any) => {
    this.setState({ selectedMovie: movie });
  };
  public override render() {
    const { movies, selectedMovie } = this.state;
    return (
      <View style={styles.container}>
        <View>
          {selectedMovie && (
            <View style={styles.header}>
              <Image
                source={{
                  // eslint-disable-next-line prettier/prettier
                  uri: URLBuilder.buildImageURL('w300', selectedMovie.poster_path),
                }}
                style={styles.headerImage}
              />
              <View style={styles.titleContainer}>
                <View style={styles.rating}>
                  <Text style={styles.ratingText}>
                    {selectedMovie.vote_average}
                  </Text>
                </View>
                <Text style={styles.title}>{selectedMovie.title}</Text>
                <TouchableOpacity style={styles.watchNow}>
                  <Text style={styles.watchNowText}>Watch Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={styles.content}>
            <ScrollView horizontal style={styles.movieList}>
              {movies.map(movie => {
                const imageUrl = URLBuilder.buildImageURL(
                  'w185',
                  movie.poster_path,
                );
                return (
                  <TouchableOpacity
                    key={movie.id}
                    onPress={() => this.handleMovieSelect(movie)}
                  >
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.movieThumbnail}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
export default HomeScreen;
