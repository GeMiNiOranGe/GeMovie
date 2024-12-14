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
import { Crown, Global, Information, Star } from 'iconsax-react-native';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { URLBuilder } from '@services';
import type {
  FeaturedMovie,
  Person,
  RootScreenProps,
  SeeAllPersonState,
} from '@shared/types';
import { getFormattedGender } from '@shared/utils';
import styles from './style';

class AllPerson extends React.Component<
  RootScreenProps<'SeeAllPersonScreen'>,
  SeeAllPersonState
> {
  public constructor(props: RootScreenProps<'SeeAllPersonScreen'>) {
    super(props);

    this.state = {
      people: [] as Person[],
      scaleAnim: [] as Animated.Value[],
      movies: [] as unknown as FeaturedMovie[],
      isModalVisible: false,
      selectedPerson: '' as string,
      scrollY: new Animated.Value(0),
    };
  }

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
        const scaleAnim = personData.results.map(() => new Animated.Value(1));
        this.setState({ people: personData.results, scaleAnim });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  protected closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  public renderItem = ({ item, index }: { item: Person; index: number }) => {
    const CARD_HEIGHT = 120;
    const inputRange = [
      (index - 1) * CARD_HEIGHT,
      index * CARD_HEIGHT,
      (index + 1) * CARD_HEIGHT,
    ];
    const animatedScale = this.state.scrollY.interpolate({
      inputRange,
      outputRange: [0.9, 1.1, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() =>
          this.props.navigation.navigate('PersonDetailScreen', {
            personId: item.id,
          })
        }
        style={styles.containerItem}
      >
        <Animated.Image
          source={{
            uri: URLBuilder.buildImageURL('w185', item.profile_path),
          }}
          style={[
            styles.movieThumbnail,
            {
              transform: [{ scale: animatedScale }],
            },
          ]}
        />
        <View style={styles.crownOverlay}>
          {index === 0 && <Crown size={25} color='gold' variant='Bold' />}
          {index === 1 && <Crown size={25} color='silver' variant='Bold' />}
          {index === 2 && <Crown size={25} color='brown' variant='Bold' />}
          {index > 2 && <Star size={25} color='yellow' variant='Bold' />}
        </View>
        <View style={styles.movieItem}>
          <Text
            style={styles.movieTitle}
            ellipsizeMode='tail'
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text style={styles.text}>
            {item.known_for_department} - {getFormattedGender(item.gender)}
          </Text>
          <View style={styles.containerText}>
            <Global
              style={styles.globalIcon}
              size={12}
              color='black'
              variant='Linear'
            />
            <Text style={styles.text}>{item.popularity}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.informIcon}
          onPress={() => {
            this.setState({ selectedPerson: item.name });
            this.fetchPersonMovies(item.id);
          }}
        >
          <Information size={15} color='gray' variant='Linear' />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  public override render() {
    const { people, movies, isModalVisible, selectedPerson } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.movieList}>
          <Animated.FlatList
            data={people}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderItem}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true },
            )}
            showsVerticalScrollIndicator={false}
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
