import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Modal,
  Pressable,
} from 'react-native';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import type { FeaturedMovie, Person, RootScreenProps } from '@shared/types';
import styles from './style';
import { Crown, Global, Information, Star } from 'iconsax-react-native';

class AllPerson extends React.Component<RootScreenProps<'SeeAllPersonScreen'>> {
  public override state = {
    people: [] as Person[],
    scaleAnim: new Animated.Value(1),
    movies: [] as unknown as FeaturedMovie[],
    isModalVisible: false,
    selectedPerson: '' as string,
  };

  public fetchPersonMovies = (personId: number) => {
    const moviesUrl = `${TMDB_BASE_URL}/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}`;
    fetch(moviesUrl)
      .then(response => response.json())
      .then(movieData => {
        this.setState({
          movies: movieData.cast,
          isModalVisible: true,
        });
      })
      .catch(error => {
        console.error('Error fetching person movies:', error);
      });
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

  protected closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  public override render() {
    const { people, movies, isModalVisible, selectedPerson } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.movieList}>
          <FlatList
            data={people}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('PersonDetailScreen', {
                    personId: item.id,
                  })
                }
                style={styles.containerItem}
              >
                <Image
                  source={{
                    uri: URLBuilder.buildImageURL('w185', item.profile_path),
                  }}
                  style={styles.movieThumbnail}
                />
                <View style={styles.crownOverlay}>
                  {index === 0 && (
                    <Crown size={25} color='gold' variant='Bold' />
                  )}
                  {index === 1 && (
                    <Crown size={25} color='silver' variant='Bold' />
                  )}
                  {index === 2 && (
                    <Crown size={25} color='brown' variant='Bold' />
                  )}
                  {index > 2 && (
                    <Star size={25} color='yellow' variant='Bold' />
                  )}
                </View>
                <View style={styles.movieItem}>
                  <Text
                    style={styles.movieTitle}
                    ellipsizeMode='tail'
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={styles.title}
                    ellipsizeMode='tail'
                    numberOfLines={2}
                  >
                    <Global size={12} color='black' variant='Linear' />
                    {item.popularity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ selectedPerson: item.name });
                    this.fetchPersonMovies(item.id);
                  }}
                >
                  <Information size={15} color='gray' variant='Linear' />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
          onRequestClose={this.closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Movies by {selectedPerson}</Text>
              <FlatList
                data={movies}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.movieListItem}>
                    <Image
                      source={{
                        uri: URLBuilder.buildImageURL('w185', item.poster_path),
                      }}
                      style={styles.Thumbnail}
                    />
                    <Text
                      style={styles.movieListTitle}
                      ellipsizeMode='tail'
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                  </View>
                )}
                numColumns={2}
              />
              <Pressable onPress={this.closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default AllPerson;
