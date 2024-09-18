import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { CelebrityDetailScreenState, RootScreenProps } from '@shared/types';
import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { imageSize } from '@shared/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { ExpandableText, Label } from '@components';
import { URLBuilder } from '@services';
import styles from './style';

class CelebrityDetailScreen extends React.Component<
  RootScreenProps<'CelebrityDetailScreen'>,
  CelebrityDetailScreenState
> {
  public constructor(props: RootScreenProps<'CelebrityDetailScreen'>) {
    super(props);
    this.state = {
      celebrity: undefined,
      movies: [],
    };
  }

  public override componentDidMount(): void {
    const { celebrityId } = this.props.route.params;
    const url = `${TMDB_BASE_URL}/person/${celebrityId}?api_key=${TMDB_API_KEY}&language=en-US`;
    const movieUrl = `${TMDB_BASE_URL}/person/${celebrityId}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US`;

    Promise.all([
      fetch(url).then(response => response.json()),
      fetch(movieUrl).then(response => response.json()),
    ])
      .then(([celebrityData, movieData]) => {
        this.setState({
          celebrity: celebrityData,
          movies: movieData.cast,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  public override render(): React.JSX.Element {
    const { celebrity, movies } = this.state;
    const headerImage =
      movies.length > 0 && movies[0]?.poster_path
        ? `${TMDB_BASE_IMAGE_URL}/w780${movies[0].poster_path}`
        : null;
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
              {celebrity?.profile_path ? (
                <Image
                  style={styles.backdropImage}
                  resizeMode='contain'
                  source={{
                    uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w300}${celebrity?.profile_path}`,
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
            <Text style={styles.ProfileName}>{this.state.celebrity?.name}</Text>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <Label
                icon={<Icon name='heart' size={20} color='red' />}
                value={`${this.state.celebrity?.popularity}`}
              />
            </ScrollView>
          </View>
          <ScrollView style={styles.Biography}>
            <Text style={styles.biographyText}>Introduction</Text>
            <ExpandableText
              text={`${this.state.celebrity?.biography}`}
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

export default CelebrityDetailScreen;
