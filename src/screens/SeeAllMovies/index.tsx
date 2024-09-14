import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import type { FeaturedMovie, RootScreenProps } from '@shared/types';
import styles from './style';

class AllMovies extends React.Component<RootScreenProps<'SeeAllScreen'>> {
  public override state = {
    movies: [] as FeaturedMovie[],
    scaleAnim: new Animated.Value(1),
  };

  public override componentDidMount() {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(movieData => {
        this.setState({ movies: movieData.results });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  public override render() {
    const { movies } = this.state;
    const { navigation } = this.props;
    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#355C7D', '#6C5B7B', '#24243e']}
      >
        <View style={styles.movieList}>
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('MovieDetailScreen', {
                    movieId: item.id,
                  })
                }
              >
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
      </LinearGradient>
    );
  }
}

export default AllMovies;
