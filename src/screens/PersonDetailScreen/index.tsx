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

import {
  LabelProps,
  PersonDetailScreenState,
  RootScreenProps,
  Variant,
} from '@shared/types';
import { TMDB_API_KEY, TMDB_BASE_IMAGE_URL, TMDB_BASE_URL } from '@config';
import { imageSize } from '@shared/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ExpandableText, Labels } from '@components';
import {
  Building,
  Calendar1,
  CalendarRemove,
  Global,
  Personalcard,
} from 'iconsax-react-native';
import { getFormattedGender } from '@shared/utils';
import styles from './style';
import { URLBuilder } from '@services';

const iconSize = 16;
const iconColor = 'black';
const iconVariant: Variant = 'Bold';

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
  }

  private getLabels(): LabelProps[] {
    if (this.state.person?.deathday === null) {
      return [
        {
          value: `${getFormattedGender(this.state.person?.gender)}`,
          name: 'Gender',
          icon: (
            <Personalcard
              size={iconSize}
              color={iconColor}
              variant={iconVariant}
            />
          ),
        },
        {
          value: `${this.state.person?.birthday}`,
          name: 'Birthday',
          icon: (
            <Calendar1
              size={iconSize}
              color={iconColor}
              variant={iconVariant}
            />
          ),
        },
        {
          value: `${this.state.person?.place_of_birth}`,
          name: 'Place of Birth',
          icon: (
            <Building size={iconSize} color={iconColor} variant={iconVariant} />
          ),
        },
        {
          value: `${this.state.person?.popularity}`,
          name: 'Popularity',
          icon: (
            <Global size={iconSize} color={iconColor} variant={iconVariant} />
          ),
        },
      ];
    }
    return [
      {
        value: `${this.state.person?.birthday}`,
        name: 'Birthday',
        icon: (
          <Calendar1 size={iconSize} color={iconColor} variant={iconVariant} />
        ),
      },
      {
        value: `${this.state.person?.deathday}`,
        name: 'Deathday',
        icon: (
          <CalendarRemove
            size={iconSize}
            color={iconColor}
            variant={iconVariant}
          />
        ),
      },
      {
        value: `${this.state.person?.place_of_birth}`,
        name: 'Place of Birth',
        icon: (
          <Building size={iconSize} color={iconColor} variant={iconVariant} />
        ),
      },
      {
        value: `${this.state.person?.popularity}`,
        name: 'Popularity',
        icon: (
          <Global size={iconSize} color={iconColor} variant={iconVariant} />
        ),
      },
    ];
  }

  public override render(): React.JSX.Element {
    const { person, movies } = this.state;
    const headerImage =
      movies.length > 0 && movies[0]?.poster_path
        ? `${TMDB_BASE_IMAGE_URL}/w780${movies[0].poster_path}`
        : null;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {headerImage ? (
            <Image
              source={{ uri: headerImage }}
              style={styles.headerImage}
              resizeMode='cover'
              blurRadius={7}
            />
          ) : (
            <Text>No Image Available</Text>
          )}
        </View>
        <View style={styles.overlay} />
        <View style={styles.body}>
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
            <Text style={styles.departmentText}>
              {this.state.person?.known_for_department}
            </Text>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <Labels data={this.getLabels()} />
            </ScrollView>
          </View>
          <View style={styles.biography}>
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
                nestedScrollEnabled
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default PersonDetailScreen;
