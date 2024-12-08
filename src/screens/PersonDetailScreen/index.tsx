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
  Calendar2,
  CalendarRemove,
  Personalcard,
  IconProps as IconsaxProps,
  Cake,
  Global,
} from 'iconsax-react-native';

import { IMDb } from '@assets/icons';
import { IMDB_BASE_URL } from '@config';
import {
  LabelProps,
  MovieCreditsCast,
  PersonDetailScreenState,
  RootScreenProps,
  TvShowCreditsCast,
} from '@shared/types';
import {
  Box,
  CompactMovieCard,
  CompactTvShowCard,
  ExpandableText,
  FullScreenLoader,
  Labels,
  Section,
  TMDBImage,
  TouchableRippleLink,
} from '@components';
import {
  getFormattedAge,
  getFormattedDate,
  getFormattedGender,
  isValidDate,
  toMovieCredits,
  toTvShowCredits,
} from '@shared/utils';
import { PersonService } from '@services';
import { colors, layout } from '@shared/themes';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      tvShowCredits: undefined,
      isModalVisible: false,
      animations: [],
      introAnim: new Animated.Value(0),
      labelsAnim: new Animated.Value(0),
    };

    this.renderMovieCreditsCast = this.renderMovieCreditsCast.bind(this);
    this.renderTvShowCreditsCast = this.renderTvShowCreditsCast.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { personId } = this.props.route.params;

    const [person, movieCredits, tvShowCredits] = await Promise.all([
      PersonService.getDetailAsync(personId),
      PersonService.getCreditsAsync('movie', personId, toMovieCredits),
      PersonService.getCreditsAsync('tv', personId, toTvShowCredits),
    ]);
    const animations = movieCredits.cast.map(() => new Animated.Value(0));

    this.props.navigation.setOptions({ title: person.name });
    this.setState(
      {
        person,
        movieCredits,
        tvShowCredits,
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
    const labels: LabelProps[] = [
      {
        value: getFormattedAge(
          this.state.person?.birthday,
          this.state.person?.deathday,
        ),
        name: 'Age',
        icon: <Cake {...labelIconsaxProps} />,
      },
      {
        value: getFormattedGender(this.state.person?.gender),
        name: 'Gender',
        icon: <Personalcard {...labelIconsaxProps} />,
      },
      {
        value: getFormattedDate(this.state.person?.birthday),
        name: 'Born',
        icon: <Calendar2 {...labelIconsaxProps} />,
      },
    ];

    if (isValidDate(this.state.person?.deathday)) {
      labels.push({
        value: getFormattedDate(this.state.person?.deathday),
        name: 'Died',
        icon: <CalendarRemove {...labelIconsaxProps} />,
      });
    }

    return labels;
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

  private renderTvShowCreditsCast({
    item,
    index,
  }: ListRenderItemInfo<TvShowCreditsCast>) {
    return (
      <CompactTvShowCard
        item={item}
        index={index}
        listLength={this.state.tvShowCredits?.cast.length}
        onPress={() =>
          this.props.navigation.push('TvShowDetailScreen', {
            tvShowId: item.id,
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
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView>
          <View style={[layout.itemsCenter, styles.profileBox]}>
            <TouchableOpacity onPress={() => this.openModal()}>
              <TMDBImage
                style={styles.profile}
                resizeMode='contain'
                size='w300'
                path={this.state.person?.profilePath}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{this.state.person?.name}</Text>

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

            {(this.state.person?.imdbId || this.state.person?.homepage) && (
              <Box contentContainerStyle={layout.row} title='External link'>
                {this.state.person?.homepage && (
                  <TouchableRippleLink
                    style={styles.homepageLink}
                    url={`${this.state.person?.homepage}`}
                  >
                    <View style={[layout.row, layout.itemsCenter]}>
                      <Global color={colors.text.toString()} />

                      <Text style={styles.homepageText}>Homepage</Text>
                    </View>
                  </TouchableRippleLink>
                )}

                {this.state.person?.imdbId && (
                  <TouchableRippleLink
                    style={styles.imdbLink}
                    url={`${IMDB_BASE_URL}/name/${this.state.person?.imdbId}`}
                  >
                    <IMDb color={colors.text.toString()} />
                  </TouchableRippleLink>
                )}
              </Box>
            )}

            <Section.Separator />

            <Section title='Known For Movies'>
              <Section.HorizontalList
                data={this.state.movieCredits?.cast}
                keyExtractor={item => item.id.toString()}
                renderItem={this.renderMovieCreditsCast}
              />
            </Section>

            <Section.Separator />

            <Section title='Known For Tv Series'>
              <Section.HorizontalList
                data={this.state.tvShowCredits?.cast}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={this.renderTvShowCreditsCast}
              />
            </Section>

            <Section.Separator />

            <Section title='Details'>
              <Section.Content>
                <Section.Label
                  name='Known For'
                  value={this.state.person.knownForDepartment}
                />

                <Section.Divider />

                <Section.Label
                  name='Gender'
                  value={getFormattedGender(this.state.person.gender)}
                />

                <Section.Divider />

                <Section.Label
                  name='Born'
                  value={getFormattedDate(this.state.person.birthday)}
                />

                {isValidDate(this.state.person.deathday) && (
                  <>
                    <Section.Divider />

                    <Section.Label
                      name='Died'
                      value={`${getFormattedDate(
                        this.state.person.deathday,
                      )} (${getFormattedAge(
                        this.state.person?.birthday,
                        this.state.person?.deathday,
                      )})`}
                    />
                  </>
                )}

                <Section.Divider />

                <Section.Label
                  name='Place of Birth'
                  value={this.state.person.placeOfBirth}
                />

                <Section.Divider />

                <Section.Label
                  name='Also Known As'
                  value={this.state.person.alsoKnownAs.join('\n')}
                />
              </Section.Content>
            </Section>
          </Animated.View>
        </ScrollView>

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
      </SafeAreaView>
    );
  }
}

export default PersonDetailScreen;
