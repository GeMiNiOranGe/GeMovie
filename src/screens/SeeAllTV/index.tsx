import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import type { FeaturedTvShow, RootScreenProps } from '@shared/types';
import styles from './style';

class AllTV extends React.Component<RootScreenProps<'SeeAllTV'>> {
  public override state = {
    tv: [] as FeaturedTvShow[],
    scaleAnim: new Animated.Value(1),
  };

  public override componentDidMount() {
    const url = `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(tvData => {
        this.setState({ tv: tvData.results });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  public override render() {
    const { tv } = this.state;
    const { navigation } = this.props;
    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#0F2027', '#203A43']}
      >
        <View style={styles.movieList}>
          <FlatList
            data={tv}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('TvShowDetailScreen', {
                    tvShowId: item.id,
                  })
                }
              >
                <Image
                  source={{
                    uri: URLBuilder.buildImageURL('w185', item.poster_path),
                  }}
                  style={styles.movieThumbnail}
                />
              </TouchableOpacity>
            )}
            numColumns={3}
          />
        </View>
      </LinearGradient>
    );
  }
}

export default AllTV;
