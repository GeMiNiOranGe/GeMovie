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
import type { Person, RootScreenProps } from '@shared/types';
import styles from './style';

class AllPerson extends React.Component<RootScreenProps<'SeeAllPersonScreen'>> {
  public override state = {
    people: [] as Person[],
    scaleAnim: new Animated.Value(1),
  };

  public override componentDidMount() {
    const personUrl = `${TMDB_BASE_URL}/person/popular?api_key=${TMDB_API_KEY}`;
    fetch(personUrl)
      .then(response => response.json())
      .then(personData => {
        this.setState({ people: personData.results });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  public override render() {
    const { people } = this.state;
    const { navigation } = this.props;
    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#ff9966', '#ff5e62', '#24243e']}
      >
        <View style={styles.movieList}>
          <FlatList
            data={people}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('PersonDetailScreen', {
                    personId: item.id,
                  })
                }
              >
                <Image
                  source={{
                    uri: URLBuilder.buildImageURL('w185', item.profile_path),
                  }}
                  style={styles.movieThumbnail}
                />
                <View style={styles.movieItem}>
                  <Text
                    style={styles.movieTitle}
                    ellipsizeMode='tail'
                    numberOfLines={2}
                  >
                    {item.name}
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

export default AllPerson;
