import {
  Animated,
  type ListRenderItemInfo,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  Building,
  Calendar1,
  CalendarRemove,
  Personalcard,
  IconProps as IconsaxProps,
} from 'iconsax-react-native';

import { IMDb } from '@assets/icons';
import { IMDB_BASE_URL } from '@config';
import {
  LabelProps,
  MovieCreditsCast,
  PersonDetailScreenState,
  RootScreenProps,
} from '@shared/types';
import {
  Box,
  CompactMovieCard,
  ExpandableText,
  FullScreenLoader,
  Labels,
  Section,
  TMDBImage,
  TouchableRippleLink,
} from '@components';
import { getFormattedDate, getFormattedGender } from '@shared/utils';
import { PersonService } from '@services';
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
      movieCredits: undefined,
      isModalVisible: false,
      animations: [],
      introAnim: new Animated.Value(0),
      labelsAnim: new Animated.Value(0),
    };

    this.renderMovieCreditsCast = this.renderMovieCreditsCast.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { personId } = this.props.route.params;

    const [person, movieCredits] = await Promise.all([
      PersonService.getDetailAsync(personId),
      PersonService.getCreditsAsync('movie', personId),
    ]);
    const animations = movieCredits.cast.map(() => new Animated.Value(0));

    this.props.navigation.setOptions({ title: person.name });
    this.setState(
      {
        person,
        movieCredits,
        animations,
      },
      this.runEntranceAnimations,
    );
  }

  private openModal() {
    this.setState({ isModalVisible: true });
  }

  private closeModal() {
    this.setState({ isModalVisible: false });
  }

  private getLabels(): LabelProps[] {
    if (this.state.person?.deathday) {
      return [
        {
          value: getFormattedGender(this.state.person?.gender),
          name: 'Gender',
          icon: <Personalcard {...labelIconsaxProps} />,
        },
        {
          value: getFormattedDate(this.state.person?.birthday),
          name: 'Birthday',
          icon: <Calendar1 {...labelIconsaxProps} />,
        },
        {
          value: this.state.person?.placeOfBirth || '-',
          name: 'Place of Birth',
          icon: <Building {...labelIconsaxProps} />,
        },
      ];
    }

    return [
      {
        value: getFormattedGender(this.state.person?.gender),
        name: 'Gender',
        icon: <Personalcard {...labelIconsaxProps} />,
      },
      {
        value: getFormattedDate(this.state.person?.birthday),
        name: 'Birthday',
        icon: <Calendar1 {...labelIconsaxProps} />,
      },
      {
        value: getFormattedDate(this.state.person?.deathday),
        name: 'Deathday',
        icon: <CalendarRemove {...labelIconsaxProps} />,
      },
      {
        value: this.state.person?.placeOfBirth || '-',
        name: 'Place of Birth',
        icon: <Building {...labelIconsaxProps} />,
      },
    ];
  }

  private runEntranceAnimations() {
    const { animations, introAnim, labelsAnim } = this.state;
    const labelsAnimation = Animated.timing(labelsAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });
    const introAnimation = Animated.timing(introAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });
    const movieAnimations = animations.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    );

    Animated.sequence([
      labelsAnimation,
      introAnimation,
      Animated.stagger(150, movieAnimations),
    ]).start();
  }

  private renderMovieCreditsCast({
    item,
    index,
  }: ListRenderItemInfo<MovieCreditsCast>) {
    return (
      <CompactMovieCard
        item={item}
        index={index}
        listLength={this.state.movieCredits?.cast.length}
        onPress={() =>
          this.props.navigation.push('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  }

  public override render(): React.JSX.Element {
    if (!this.state.person) {
      return <FullScreenLoader />;
    }

    return (
      <ScrollView style={[layout.flex1, styles.container]}>
        <View style={styles.header} />
        <Modal
          visible={this.state.isModalVisible}
          transparent={true}
          animationType='fade'
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={() => this.closeModal()}
            >
              <TMDBImage
                style={styles.modalImage}
                size='original'
                path={this.state.person?.profilePath}
              />
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.body}>
          <View style={styles.containerProfile}>
            <TouchableOpacity onPress={() => this.openModal()}>
              <TMDBImage
                style={styles.backdropImage}
                resizeMode='contain'
                size='w300'
                path={this.state.person?.profilePath}
              />
            </TouchableOpacity>

            <Text style={styles.profileName}>{this.state.person?.name}</Text>

            <Text style={styles.departmentText}>
              {this.state.person?.knownForDepartment}
            </Text>

            <View style={[layout.center, layout.row, styles.actionArea]}>
              {this.state.person?.imdbId && (
                <TouchableRippleLink
                  style={styles.imdbLink}
                  url={`${IMDB_BASE_URL}/name/${this.state.person?.imdbId}`}
                  rippleColor={colors.accent.light}
                >
                  <IMDb color={colors.primary.toString()} />
                </TouchableRippleLink>
              )}
            </View>

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
                layout.itemsCenter,
                styles.labelBox,
              ]}
            >
              <Labels data={this.getLabels()} />
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
                data={this.state.movieCredits?.cast}
                keyExtractor={item => item.id.toString()}
                renderItem={this.renderMovieCreditsCast}
              />
            </Section>
          </Animated.View>
        </View>
      </ScrollView>
    );
  }
}

export default PersonDetailScreen;
