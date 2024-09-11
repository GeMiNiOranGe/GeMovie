import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import styles from './style';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import { FeaturedMovie } from '@shared/types';
import _ from 'lodash';
class AllMovies extends React.Component {
  public override state = {
    movies: [] as FeaturedMovie[],
    scaleAnim: new Animated.Value(1),
  };
  public shuffleInterval: NodeJS.Timeout | undefined;
  public override componentDidMount() {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(movieData => {
        this.setState({ movies: movieData.results });
        this.shuffleInterval = setInterval(this.shuffleMovies, 5000);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  public override componentWillUnmount() {
    if (this.shuffleInterval) {
      clearInterval(this.shuffleInterval);
    }
  }
  private shuffleMovies = () => {
    const shuffledMovies = _.shuffle(this.state.movies);
    this.setState({ movies: shuffledMovies });
  };
  private handleMouseEnter = () => {
    Animated.spring(this.state.scaleAnim, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  private handleMouseLeave = () => {
    Animated.spring(this.state.scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  public override render() {
    const { movies } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.movieList}>
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <TouchableOpacity key={item.id}>
                <Image
                  source={{
                    uri: URLBuilder.buildImageURL('w185', item.poster_path),
                  }}
                  style={styles.movieThumbnail}
                />
                <View style={styles.movieItem}>
                  <Text
                    style={styles.movieTitle}
                    ellipsizeMode='tail'
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}

export default AllMovies;
