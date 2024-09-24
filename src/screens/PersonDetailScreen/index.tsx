import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { PersonDetailScreenState, RootScreenProps } from '@shared/types';
import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { imageSize } from '@shared/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { ExpandableText, Label } from '@components';
import { URLBuilder } from '@services';
import styles from './style';

class PersonDetailScreen extends React.Component<
  RootScreenProps<'PersonDetailScreen'>,
  PersonDetailScreenState
> {
  private pulseAnimation: Animated.Value;
  public constructor(props: RootScreenProps<'PersonDetailScreen'>) {
    super(props);
    this.state = {
      person: undefined,
      movies: [],
    };
    this.pulseAnimation = new Animated.Value(1);
  }

  public override componentDidMount(): void {
    const { personId } = this.props.route.params;
    const url = `${TMDB_BASE_URL}/person/${personId}?api_key=${TMDB_API_KEY}&language=en-US`;
    const movieUrl = `${TMDB_BASE_URL}/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US`;

    Promise.all([
      fetch(url).then(response => response.json()),
      fetch(movieUrl).then(response => response.json()),
    ])
      .then(([celebrityData, movieData]) => {
        this.setState({
          person: celebrityData,
          movies: movieData.cast,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    this.startPulseAnimation();
  }

  private startPulseAnimation(): void {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.pulseAnimation, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(this.pulseAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }

  public override render(): React.JSX.Element {
    const { person, movies } = this.state;
    const headerImage =
      movies.length > 0 && movies[0]?.poster_path
        ? `${TMDB_BASE_IMAGE_URL}/w780${movies[0].poster_path}`
        : null;
    const animatedHeart = {
      transform: [{ scale: this.pulseAnimation }],
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {headerImage ? (
            <Image
              source={{ uri: headerImage }}
              style={styles.headerImage}
              resizeMode='cover'
            />
          ) : (
            <Text>No Image Available</Text>
          )}
        </View>
        <LinearGradient
          style={styles.body}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#FFEFBA', '#FFFFFF']}
        >
          <View style={styles.containerProfile}>
            <View>
              {person?.profile_path ? (
                <Image
                  style={styles.backdropImage}
                  resizeMode='contain'
                  source={{
                    uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w300}${person?.profile_path}`,
                  }}
                />
              ) : (
                <View style={styles.iconCircle}>
                  <Icon
                    name='institution'
                    size={60}
                    color='black'
                    style={styles.icon}
                  />
                </View>
              )}
            </View>
            <Text style={styles.profileName}>{this.state.person?.name}</Text>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <Label
                icon={
                  <Animated.View style={animatedHeart}>
                    <Icon name='heart' size={20} color='red' />
                  </Animated.View>
                }
                value={`${this.state.person?.popularity}`}
              />
            </ScrollView>
          </View>
          <ScrollView style={styles.biography}>
            <Text style={styles.biographyText}>Introduction</Text>
            <ExpandableText
              text={`${this.state.person?.biography}`}
              numberOfLines={3}
            />

            <Text style={styles.biographyText}>Most Popular Movies</Text>
            <View style={styles.containerMovie}>
              <FlatList
                data={this.state.movies}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: movie }) => {
                  const imageUrl = URLBuilder.buildImageURL(
                    'w185',
                    movie.poster_path,
                  );
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('MovieDetailScreen', {
                          movieId: movie.id,
                        })
                      }
                    >
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.movieThumbnail}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

export default PersonDetailScreen;
