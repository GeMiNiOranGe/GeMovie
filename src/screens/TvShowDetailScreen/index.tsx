import React from 'react';
import {
  Animated,
  FlatList,
  type ListRenderItemInfo,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Calendar,
  Global,
  Play,
  IconProps as IconsaxProps,
  Star1,
  Clock,
} from 'iconsax-react-native';
import { Chip, TouchableRipple } from 'react-native-paper';

import { Adult } from '@assets/icons';
import type {
  RootScreenProps,
  TvShowDetailScreenState,
  LabelProps,
  CompanyElement,
  SeasonElement,
  NetworkElement,
  SvgIconProps,
  Genre,
  Keyword,
} from '@shared/types';
import {
  Box,
  Credit,
  ExpandableText,
  FullScreenLoader,
  Labels,
  NetworkCard,
  Photo,
  Recommendation,
  Review,
  Section,
  SimpleCompanyCard,
  TMDBImage,
  TouchableRippleLink,
  Youtube,
} from '@components';
import { TvShowService } from '@services';
import {
  getFormattedDate,
  getFormattedFullYear,
  getFormattedRuntime,
  getFormattedVoteAverage,
} from '@shared/utils';
import { spacing } from '@shared/constants';
import { colors, layout } from '@shared/themes';
import styles from './style';

const labelIconsaxProps: IconsaxProps = {
  size: 16,
  color: colors.subtext.toString(),
  variant: 'Bold',
};

class TvShowDetailScreen extends React.Component<
  RootScreenProps<'TvShowDetailScreen'>,
  TvShowDetailScreenState
> {
  public constructor(props: RootScreenProps<'TvShowDetailScreen'>) {
    super(props);
    this.state = {
      tvShow: undefined,
      modalVisible: false,
      isloading: false,
      animatedOpacity: new Animated.Value(0),
      animatedTranslateY: new Animated.Value(20),
      animatedOpacityImage: new Animated.Value(0),
      animatedTranslateYImage: new Animated.Value(0),
    };

    this.renderGenreItem = this.renderGenreItem.bind(this);
    this.renderSeasonItem = this.renderSeasonItem.bind(this);
    this.renderNetworkItem = this.renderNetworkItem.bind(this);
    this.renderCompanyItem = this.renderCompanyItem.bind(this);
    this.renderKeywordItem = this.renderKeywordItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { tvShowId } = this.props.route.params;

    const tvShow = await TvShowService.getDetailAsync(tvShowId);

    this.setState({ tvShow });
    this.props.navigation.setOptions({ title: tvShow.name });

    this.state.animatedTranslateYImage.setValue(30);

    Animated.parallel([
      Animated.timing(this.state.animatedOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.animatedTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.animatedOpacityImage, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.animatedTranslateYImage, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }

  public toggleModal = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
      isloading: true,
    }));
    setTimeout(() => {
      this.setState({ modalVisible: true, isloading: false });
    }, 1000);
  };

  public closemodal = () => {
    this.setState({ modalVisible: false });
  };

  private renderGenreItem({
    item,
    index,
  }: ListRenderItemInfo<Genre>): React.JSX.Element {
    const marginRight =
      index === (this.state.tvShow?.genres.length || 0) - 1 ? 0 : spacing.small;

    return (
      <Chip
        style={[styles.chip, { marginRight }]}
        textStyle={styles.chipText}
        onPress={() =>
          this.props.navigation.push('GenreDetailScreen', {
            genre: item,
          })
        }
      >
        {item.name}
      </Chip>
    );
  }

  private renderSeasonItem({ item, index }: ListRenderItemInfo<SeasonElement>) {
    const marginRight =
      index === (this.state.tvShow?.seasons.length || 0) - 1
        ? 0
        : spacing.small;

    return (
      <View key={item.id} style={[layout.itemsCenter, { marginRight }]}>
        <TMDBImage
          style={styles.seasonPoster}
          size='w500'
          path={item.posterPath}
        />
        <Text style={styles.seasonTitle}>{item.name}</Text>
        <Text style={styles.seasonDetails}>{item.episodeCount} Episodes</Text>
      </View>
    );
  }

  private renderNetworkItem({
    item,
    index,
  }: ListRenderItemInfo<NetworkElement>) {
    return (
      <NetworkCard
        item={item}
        index={index}
        listLength={this.state.tvShow?.seasons.length}
        onPress={() =>
          this.props.navigation.push('NetworkDetailScreen', {
            networkId: item.id,
          })
        }
      />
    );
  }

  private renderCompanyItem({
    item,
    index,
  }: ListRenderItemInfo<CompanyElement>) {
    return (
      <SimpleCompanyCard
        item={item}
        index={index}
        listLength={this.state.tvShow?.productionCompanies.length}
        onPress={() => {
          this.props.navigation.push('CompanyDetailScreen', {
            companyId: item.id,
          });
        }}
      />
    );
  }

  private renderKeywordItem({
    item,
    index,
  }: ListRenderItemInfo<Keyword>): React.JSX.Element {
    const marginRight =
      index === (this.state.tvShow?.keywords.results.length || 0) - 1
        ? 0
        : spacing.small;

    return (
      <Chip style={[styles.chip, { marginRight }]} textStyle={styles.chipText}>
        {item.name}
      </Chip>
    );
  }

  private getLabels(): LabelProps[] {
    const firstYear = getFormattedFullYear(this.state.tvShow?.firstAirDate);
    const lastYear = getFormattedFullYear(this.state.tvShow?.lastAirDate);
    const averageLength = (() => {
      if (
        !this.state.tvShow?.episodeRunTime ||
        !this.state.tvShow?.episodeRunTime.length
      ) {
        return 0;
      }

      if (this.state.tvShow?.episodeRunTime.length > 1) {
        return (
          this.state.tvShow?.episodeRunTime.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
          ) / this.state.tvShow?.episodeRunTime.length
        );
      }

      return this.state.tvShow?.episodeRunTime[0];
    })();

    return [
      {
        icon: <Calendar {...labelIconsaxProps} />,
        name: 'Year',
        value:
          firstYear === lastYear ? firstYear : `${firstYear} - ${lastYear}`,
      },
      {
        icon: <Clock {...labelIconsaxProps} />,
        name: 'Average Length',
        value: getFormattedRuntime(averageLength, 'minute'),
      },
      {
        icon: <Adult {...(labelIconsaxProps as SvgIconProps)} />,
        name: 'Adult',
        value: this.state.tvShow?.adult ? 'Yes' : 'No',
      },
    ];
  }

  public override render() {
    if (!this.state.tvShow) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View
            style={[
              styles.headerContainer,
              {
                opacity: this.state.animatedOpacityImage,
                transform: [{ translateY: this.state.animatedTranslateYImage }],
              },
            ]}
          >
            <TMDBImage
              style={styles.backdrop}
              size='w1280'
              path={this.state.tvShow?.backdropPath}
            />
          </Animated.View>

          <View style={styles.bodyOverlay} />

          <Animated.View
            style={[
              styles.body,
              {
                opacity: this.state.animatedOpacity,
                transform: [{ translateY: this.state.animatedTranslateY }],
              },
            ]}
          >
            <Text style={styles.titleText}>{this.state.tvShow?.name}</Text>
            <View style={[layout.center, styles.genreBox]}>
              <FlatList
                contentContainerStyle={styles.genreContentList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                data={this.state.tvShow?.genres}
                renderItem={this.renderGenreItem}
              />
            </View>

            <View style={[layout.row, layout.center, styles.ratingBox]}>
              <Star1
                size='14'
                color={colors.accent.dark.toString()}
                variant='Bold'
              />

              <Text style={styles.rating}>
                {getFormattedVoteAverage(this.state.tvShow?.voteAverage)} (
                {this.state.tvShow?.voteCount})
              </Text>
            </View>

            <View style={[layout.center, layout.row, styles.actionArea]}>
              <TouchableRipple
                style={styles.playTouchable}
                borderless
                rippleColor={colors.accent.light}
                onPress={this.toggleModal}
              >
                <View style={[layout.row, layout.itemsCenter]}>
                  <Play color={colors.primary.toString()} />

                  <Text style={styles.playText}>Play trailer</Text>
                </View>
              </TouchableRipple>

              {this.state.tvShow?.homepage && (
                <TouchableRippleLink
                  style={styles.homepageLink}
                  url={`${this.state.tvShow?.homepage}`}
                  rippleColor={colors.accent.light}
                >
                  <Global color={colors.primary.toString()} />
                </TouchableRippleLink>
              )}
            </View>

            <View style={[layout.itemsCenter, styles.labelBox]}>
              <Labels data={this.getLabels()} />
            </View>

            <Box title='Synopsis'>
              <ExpandableText seeButtonPosition='separate'>
                {this.state.tvShow?.overview || 'No overview available.'}
              </ExpandableText>
            </Box>

            <Section.Separator />

            <Section title='Cast'>
              {this.state.tvShow?.id && (
                <Credit
                  id={this.state.tvShow?.id}
                  type='tv'
                  navigation={this.props.navigation}
                />
              )}
            </Section>

            <Section.Separator />

            <Section title='Recommendation'>
              {this.state.tvShow?.id && (
                <Recommendation
                  type='tv'
                  id={this.state.tvShow.id}
                  navigation={this.props.navigation}
                />
              )}
            </Section>

            <Section.Separator />

            <Section title='Photos'>
              {this.state.tvShow?.id && (
                <Photo
                  id={this.state.tvShow?.id}
                  type='tv'
                  navigation={this.props.navigation}
                />
              )}
            </Section>

            <Section.Separator />

            <Section title='Seasons'>
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.tvShow.seasons}
                renderItem={this.renderSeasonItem}
              />
            </Section>

            <Section.Separator />

            <Section title='User reviews'>
              {this.state.tvShow?.id && (
                <Review
                  id={this.state.tvShow?.id}
                  type='tv'
                  navigation={this.props.navigation}
                />
              )}
            </Section>

            <Section.Separator />

            <Section title='Storyline'>
              <Section.Content>
                <Section.Item name='Overview'>
                  <ExpandableText style={styles.expandableText}>
                    {`${this.state.tvShow?.overview}`}
                  </ExpandableText>
                </Section.Item>

                {this.state.tvShow?.tagline && (
                  <>
                    <Section.Divider />

                    <Section.Label
                      name='Tagline'
                      value={`${this.state.tvShow?.tagline}`}
                    />
                  </>
                )}

                {this.state.tvShow?.genres.length !== 0 && (
                  <>
                    <Section.Divider />

                    <Section.Items
                      name='Genres'
                      keyExtractor={item => item.id.toString()}
                      data={this.state.tvShow?.genres}
                      renderItem={this.renderGenreItem}
                    />
                  </>
                )}
              </Section.Content>
            </Section>

            <Section.Separator />

            <Section title='Keywords'>
              <Section.HorizontalList
                noResultText='No keywords found'
                data={this.state.tvShow?.keywords.results}
                renderItem={this.renderKeywordItem}
              />
            </Section>

            <Section.Separator />

            <Section title='Details'>
              <Section.Content>
                <Section.Label
                  name='Original Title'
                  value={`${this.state.tvShow?.originalName}`}
                />

                <Section.Divider />

                <Section.Label
                  name='First Air Date'
                  value={getFormattedDate(this.state.tvShow?.firstAirDate)}
                />

                <Section.Divider />

                <Section.Label
                  name='Episode Runtime'
                  value={this.state.tvShow?.episodeRunTime
                    .map(element => getFormattedRuntime(element))
                    .join(', ')}
                />

                <Section.Divider />

                <Section.Label
                  name='Status'
                  value={`${this.state.tvShow?.status}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Country of Origin'
                  value={`${this.state.tvShow.originCountry.join(', ')}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Original Language'
                  value={`${this.state.tvShow?.originalLanguage}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Language Spoken'
                  value={`${this.state.tvShow?.spokenLanguages
                    .map(language => language.name)
                    .join(', ')}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Production Countries'
                  value={`${this.state.tvShow?.productionCountries
                    .map(country => country.name)
                    .join(', ')}`}
                />

                <Section.Divider />

                <Section.Items
                  name='Production Companies'
                  keyExtractor={item => item.id.toString()}
                  data={this.state.tvShow?.productionCompanies}
                  renderItem={this.renderCompanyItem}
                />

                <Section.Divider />

                <Section.Items
                  name='Networks'
                  data={this.state.tvShow.networks}
                  keyExtractor={item => item.id.toString()}
                  renderItem={this.renderNetworkItem}
                />
              </Section.Content>
            </Section>
          </Animated.View>

          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={this.closemodal}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={this.closemodal}
            >
              <TouchableWithoutFeedback>
                <View>
                  <Youtube
                    type='tv'
                    id={this.state.tvShow?.id}
                    videoType='Trailer'
                  />
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default TvShowDetailScreen;
