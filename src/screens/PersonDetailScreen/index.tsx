import {
  Animated,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Building,
  Calendar1,
  CalendarRemove,
  Personalcard,
  IconProps as IconsaxProps,
} from 'iconsax-react-native';

import { IMDb } from '@assets/icons';
import {
  LabelProps,
  PersonDetailScreenState,
  RootScreenProps,
} from '@shared/types';
import {
  IMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_BASE_IMAGE_URL,
  TMDB_BASE_URL,
} from '@config';
import {
  Box,
  ExpandableText,
  Labels,
  Section,
  TMDBImage,
  TouchableRippleLink,
} from '@components';
import { getFormattedGender } from '@shared/utils';
import { imageSize } from '@shared/constants';
import { colors, layout } from '@shared/themes';
import styles from './style';

const labelIconsaxProps: IconsaxProps = {
  size: 16,
  color: colors.subtext.toString(),
  variant: 'Bold',
};

class PersonDetailScreen extends React.Component<
  RootScreenProps<'PersonDetailScreen'>,
  PersonDetailScreenState
> {
  public constructor(props: RootScreenProps<'PersonDetailScreen'>) {
    super(props);
    this.state = {
      person: undefined,
      movies: [],
      personImages: [],
      isModalVisible: false,
      selectedImage: null,
      animations: [],
      introAnim: new Animated.Value(0),
      labelsAnim: new Animated.Value(0),
    };
  }

  public override async componentDidMount(): Promise<void> {
    const { personId } = this.props.route.params;
    const url = `${TMDB_BASE_URL}/person/${personId}?api_key=${TMDB_API_KEY}&language=en-US`;
    const movieUrl = `${TMDB_BASE_URL}/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US`;
    const imagesUrl = `${TMDB_BASE_URL}/person/${personId}/images?api_key=${TMDB_API_KEY}`;

    const [celebrityData, movieData, imagesData] = await Promise.all([
      fetch(url).then(response => response.json()),
      fetch(movieUrl).then(response => response.json()),
      fetch(imagesUrl).then(response => response.json()),
    ]);
    const animations = movieData.cast.map(() => new Animated.Value(0));

    this.setState(
      {
        person: celebrityData,
        movies: movieData.cast,
        personImages: imagesData.profiles,
        animations,
      },
      this.runEntranceAnimations,
    );
  }

  private openModal(imagePath: string) {
    this.setState({ isModalVisible: true, selectedImage: imagePath });
  }

  private closeModal() {
    this.setState({ isModalVisible: false, selectedImage: null });
  }

  private getLabels(): LabelProps[] {
    if (this.state.person?.deathday === null) {
      return [
        {
          value: `${getFormattedGender(this.state.person?.gender)}`,
          name: 'Gender',
          icon: <Personalcard {...labelIconsaxProps} />,
        },
        {
          value: this.state.person?.birthday || 'N/A',
          name: 'Birthday',
          icon: <Calendar1 {...labelIconsaxProps} />,
        },
        {
          value: this.state.person?.place_of_birth || 'N/A',
          name: 'Place of Birth',
          icon: <Building {...labelIconsaxProps} />,
        },
      ];
    }

    return [
      {
        value: `${getFormattedGender(this.state.person?.gender)}`,
        name: 'Gender',
        icon: <Personalcard {...labelIconsaxProps} />,
      },
      {
        value: this.state.person?.birthday || 'N/A',
        name: 'Birthday',
        icon: <Calendar1 {...labelIconsaxProps} />,
      },
      {
        value: this.state.person?.deathday || 'N/A',
        name: 'Deathday',
        icon: <CalendarRemove {...labelIconsaxProps} />,
      },
      {
        value: this.state.person?.place_of_birth || 'N/A',
        name: 'Place of Birth',
        icon: <Building {...labelIconsaxProps} />,
      },
    ];
  }

  private runEntranceAnimations() {
    const { animations, introAnim, labelsAnim } = this.state;
    const introAnimation = Animated.timing(introAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });
    const labelsAnimation = Animated.timing(labelsAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });
    const movieAnimations = animations.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    );

    Animated.sequence([
      introAnimation,
      labelsAnimation,
      Animated.stagger(150, movieAnimations),
    ]).start();
  }

  public override render(): React.JSX.Element {
    const { person, isModalVisible, selectedImage } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header} />
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType='fade'
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={() => this.closeModal()}
            >
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.modalImage}
                />
              )}
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.body}>
          <View style={styles.containerProfile}>
            <View>
              {person?.profile_path ? (
                <TouchableOpacity
                  onPress={() =>
                    this.openModal(
                      `${TMDB_BASE_IMAGE_URL}/${imageSize.w300}${person?.profile_path}`,
                    )
                  }
                >
                  <TMDBImage
                    style={styles.backdropImage}
                    resizeMode='contain'
                    size='w300'
                    path={person?.profile_path}
                  />
                </TouchableOpacity>
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

            {this.state.person?.imdb_id && (
              <TouchableRippleLink
                url={`${IMDB_BASE_URL}/name/${this.state.person?.imdb_id}`}
                style={[layout.center]}
              >
                <IMDb color={colors.text.toString()} />
              </TouchableRippleLink>
            )}

            <Animated.View
              style={[
                {
                  opacity: this.state.labelsAnim,
                  transform: [
                    {
                      translateY: this.state.labelsAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
                styles.labelBox,
              ]}
            >
              <View style={styles.titleBody}>
                <Labels data={this.getLabels()} />
              </View>
            </Animated.View>
          </View>

          <Animated.View
            style={{
              opacity: this.state.introAnim,
              transform: [
                {
                  translateY: this.state.introAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            }}
          >
            <Box title='Biography'>
              <ExpandableText seeButtonPosition='separate'>
                {`${this.state.person?.biography}`}
              </ExpandableText>
            </Box>

            <Section.Separator />

            <Section title='Known For Movies'>
              <Section.HorizontalList
                data={this.state.movies}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.push('MovieDetailScreen', {
                          movieId: item.id,
                        })
                      }
                    >
                      <TMDBImage
                        style={styles.movieThumbnail}
                        size='w185'
                        path={item.poster_path}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </Section>
          </Animated.View>
        </View>
      </ScrollView>
    );
  }
}

export default PersonDetailScreen;
