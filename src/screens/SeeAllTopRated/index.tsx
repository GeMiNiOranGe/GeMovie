import React from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import type { RootScreenProps, TopRatedState } from '@shared/types';
import { Star } from 'iconsax-react-native';
import styles from './style';

class TopRated extends React.Component<
  RootScreenProps<'SeeAllTopRated'>,
  TopRatedState
> {
  public constructor(props: RootScreenProps<'SeeAllTopRated'>) {
    super(props);
    this.state = {
      movie: [],
    };
  }

  public override componentDidMount() {
    const topRatedUrl = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
    fetch(topRatedUrl)
      .then(response => response.json())
      .then(movieData => {
        this.setState({ movie: movieData.results });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  public override render() {
    const { navigation } = this.props;
    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#0F2027', '#203A43']}
      >
        <View style={styles.containerMovie}>
          <FlatList
            data={this.state.movie}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('MovieDetailScreen', {
                    movieId: item.id,
                  })
                }
                style={styles.outlineMovie}
              >
                <Image
                  source={{
                    uri: URLBuilder.buildImageURL('w185', item.poster_path),
                  }}
                  style={styles.movieCard}
                />
                <View style={styles.containerText}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.titleText}
                  >
                    {index + 1}.{item.title}
                  </Text>
                  <Text style={styles.dateText}>{item.release_date}</Text>
                  <Text style={styles.voteText}>
                    <Star size={20} color='yellow' variant='Bulk' />
                    {item.vote_average}({item.vote_count})
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </LinearGradient>
    );
  }
}

export default TopRated;
