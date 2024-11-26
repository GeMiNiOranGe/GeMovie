import React from 'react';
import {
  FlatList,
  Image,
  type ListRenderItemInfo,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Calendar,
  Clock,
  Moneys,
  MoneyRecive,
  Image as ImageIcon,
  Star1,
  Global,
  Play,
} from 'iconsax-react-native';
import { Chip, TouchableRipple } from 'react-native-paper';
import { IconProps as IconsaxProps } from 'iconsax-react-native';

import { Adult, IMDb } from '@assets/icons';
import { MovieService, URLBuilder } from '@services';
import type {
  CompanyElement,
  Genre,
  Keyword,
  LabelProps,
  MovieDetailScreenState,
  RootScreenProps,
  SvgIconProps,
} from '@shared/types';
import {
  getFormattedDate,
  getFormattedFullYear,
  getFormattedMoney,
  getFormattedRuntime,
  getFormattedVoteAverage,
} from '@shared/utils';
import {
  ExpandableText,
  Labels,
  Section,
  SimpleCompanyCard,
  Recommendation,
  TMDBImage,
  TouchableRippleLink,
  Youtube,
  Credit,
  Photo,
  Review,
  Box,
  TMDBImageBackgroundLinearGradient,
  FullScreenLoader,
} from '@components';
import { layout, colors } from '@shared/themes';
import { spacing } from '@shared/constants';
import { IMDB_BASE_URL } from '@config';
import styles from './style';

const labelIconsaxProps: IconsaxProps = {
  size: 16,
  color: colors.subtext.toString(),
  variant: 'Bold',
};

class MovieDetailScreen extends React.Component<
  RootScreenProps<'MovieDetailScreen'>,
  MovieDetailScreenState
> {
  public constructor(props: RootScreenProps<'MovieDetailScreen'>) {
    super(props);
    this.state = {
      movie: undefined,
      modalVisible: false,
    };

    this.renderGenreItem = this.renderGenreItem.bind(this);
    this.renderCompanyItem = this.renderCompanyItem.bind(this);
    this.renderKeywordItem = this.renderKeywordItem.bind(this);
    this.pushCollectionDetailScreen =
      this.pushCollectionDetailScreen.bind(this);
    this.navigateToContentListScreen =
      this.navigateToContentListScreen.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { movieId } = this.props.route.params;

    const movie = await MovieService.getDetailAsync(movieId);
    this.setState({ movie });

    this.props.navigation.setOptions({ title: movie.title });
  }

  private renderGenreItem({
    item,
    index,
  }: ListRenderItemInfo<Genre>): React.JSX.Element {
    const marginRight =
      index === (this.state.movie?.genres.length || 0) - 1 ? 0 : spacing.small;

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

  private renderCompanyItem({
    item,
    index,
  }: ListRenderItemInfo<CompanyElement>) {
    return (
      <SimpleCompanyCard
        item={item}
        index={index}
        listLength={this.state.movie?.productionCompanies.length}
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
      index === (this.state.movie?.keywords.keywords.length || 0) - 1
        ? 0
        : spacing.small;

    return (
      <Chip style={[styles.chip, { marginRight }]} textStyle={styles.chipText}>
        {item.name}
      </Chip>
    );
  }

  private pushCollectionDetailScreen(): void {
    this.props.navigation.push('CollectionDetailScreen', {
      collectionId: this.state.movie?.belongsToCollection?.id as number,
    });
  }

  private navigateToContentListScreen(): void {
    this.props.navigation.push('ContentListScreen', {
      id: this.state.movie?.id as number,
    });
  }

  public toggleModal = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
    setTimeout(() => {
      this.setState({ modalVisible: true });
    }, 1000);
  };

  public closemodal = () => {
    this.setState({ modalVisible: false });
  };

  private getLabels(): LabelProps[] {
    return [
      {
        icon: <Calendar {...labelIconsaxProps} />,
        name: 'Year',
        value: getFormattedFullYear(this.state.movie?.releaseDate),
      },
      {
        icon: <Clock {...labelIconsaxProps} />,
        name: 'Length',
        value: getFormattedRuntime(this.state.movie?.runtime, 'minute'),
      },
      {
        icon: <Moneys {...labelIconsaxProps} />,
        name: 'Budget',
        value: getFormattedMoney(this.state.movie?.budget),
      },
      {
        icon: <MoneyRecive {...labelIconsaxProps} />,
        name: 'Revenue',
        value: getFormattedMoney(this.state.movie?.revenue),
      },
      {
        icon: <Adult {...(labelIconsaxProps as SvgIconProps)} />,
        name: 'Adult',
        value: this.state.movie?.adult ? 'Yes' : 'No',
      },
    ];
  }

  public override render(): React.JSX.Element {
    if (!this.state.movie) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        {this.state.movie?.backdropPath && (
          <Image
            style={styles.backdrop}
            blurRadius={4}
            source={{
              uri: URLBuilder.buildImageURL(
                'w1280',
                this.state.movie?.backdropPath,
              ),
            }}
          />
        )}

        <ScrollView style={StyleSheet.absoluteFill}>
          <LinearGradient
            style={[layout.center, styles.posterBox]}
            colors={['transparent', colors.primary.toString()]}
          >
            <TMDBImage
              style={styles.poster}
              path={this.state.movie?.posterPath}
              size='w342'
              NotFoundComponent={
                <View
                  style={[layout.center, styles.poster, styles.posterNotFound]}
                >
                  <ImageIcon size='48' color={colors.text.toString()} />
                  <Text style={styles.notFoundText}>Poster not found</Text>
                </View>
              }
            />
          </LinearGradient>

          <View style={styles.content}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{this.state.movie?.title}</Text>
            </View>

            <View style={[layout.center, styles.genreBox]}>
              <FlatList
                contentContainerStyle={styles.genreContentList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                data={this.state.movie?.genres}
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
                {getFormattedVoteAverage(this.state.movie?.voteAverage)} (
                {this.state.movie?.voteCount})
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

              {this.state.movie?.homepage && (
                <TouchableRippleLink
                  style={styles.homepageLink}
                  url={`${this.state.movie?.homepage}`}
                  rippleColor={colors.accent.light}
                >
                  <Global color={colors.primary.toString()} />
                </TouchableRippleLink>
              )}

              {this.state.movie?.imdbId && (
                <TouchableRippleLink
                  style={styles.imdbLink}
                  url={`${IMDB_BASE_URL}/title/${this.state.movie?.imdbId}`}
                >
                  <IMDb color={colors.text.toString()} />
                </TouchableRippleLink>
              )}
            </View>

            <View style={[layout.itemsCenter, styles.labelBox]}>
              <Labels data={this.getLabels()} />
            </View>

            <Box title='Synopsis'>
              <ExpandableText seeButtonPosition='separate'>
                {`${this.state.movie?.overview}`}
              </ExpandableText>
            </Box>

            {this.state.movie?.belongsToCollection && (
              <Box title='Belongs to collection'>
                <TouchableOpacity
                  style={layout.row}
                  activeOpacity={0.85}
                  onPress={this.pushCollectionDetailScreen}
                >
                  <>
                    <TMDBImage
                      style={styles.collectionPoster}
                      path={this.state.movie?.belongsToCollection?.posterPath}
                      size='w154'
                    />

                    <TMDBImageBackgroundLinearGradient
                      contentContainerStyle={[
                        layout.justifyCenter,
                        styles.collectionTitleBox,
                      ]}
                      path={this.state.movie?.belongsToCollection?.backdropPath}
                      size='w300'
                      blurRadius={4}
                      colors={['transparent', colors.secondary.toString()]}
                    >
                      <Text style={styles.collectionTitle} numberOfLines={2}>
                        {this.state.movie?.belongsToCollection?.name}
                      </Text>
                    </TMDBImageBackgroundLinearGradient>
                  </>
                </TouchableOpacity>
              </Box>
            )}

            <Section.Separator />

            <Section title='Cast'>
              {this.state.movie?.id && (
                <Credit
                  id={this.state.movie?.id}
                  type='movie'
                  navigation={this.props.navigation}
                />
              )}
            </Section>

            <Section.Separator />

            <Section
              title='Recommendations'
              moreButtonText='See all'
              onMoreButtonPress={this.navigateToContentListScreen}
            >
              {this.state.movie?.id && (
                <Recommendation
                  id={this.state.movie?.id}
                  type='movie'
                  navigation={this.props.navigation}
                />
              )}
            </Section>

            <Section.Separator />

            <Section title='Photos'>
              {this.state.movie?.id && (
                <Photo
                  id={this.state.movie?.id}
                  type='movie'
                  navigation={this.props.navigation}
                />
              )}
            </Section>

            <Section.Separator />

            <Section title='User reviews'>
              {this.state.movie?.id && (
                <Review
                  id={this.state.movie?.id}
                  type='movie'
                  navigation={this.props.navigation}
                />
              )}
            </Section>

            <Section.Separator />

            <Section title='Storyline'>
              <Section.Content>
                <Section.Item name='Overview'>
                  <ExpandableText style={styles.expandableText}>
                    {`${this.state.movie?.overview}`}
                  </ExpandableText>
                </Section.Item>

                {this.state.movie?.tagline && (
                  <>
                    <Section.Divider />

                    <Section.Label
                      name='Tagline'
                      value={`${this.state.movie?.tagline}`}
                    />
                  </>
                )}

                {this.state.movie?.genres.length !== 0 && (
                  <>
                    <Section.Divider />

                    <Section.Items
                      name='Genres'
                      keyExtractor={item => item.id.toString()}
                      data={this.state.movie?.genres}
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
                data={this.state.movie?.keywords.keywords}
                renderItem={this.renderKeywordItem}
              />
            </Section>

            <Section.Separator />

            <Section title='Details'>
              <Section.Content>
                <Section.Label
                  name='Original Title'
                  value={`${this.state.movie?.originalTitle}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Release Date'
                  value={getFormattedDate(this.state.movie?.releaseDate)}
                />

                <Section.Divider />

                <Section.Label
                  name='Runtime'
                  value={getFormattedRuntime(this.state.movie?.runtime)}
                />

                <Section.Divider />

                <Section.Label
                  name='Status'
                  value={`${this.state.movie?.status}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Country of Origin'
                  value={`${this.state.movie?.originCountry.join(', ')}`}
                />

                <Section.Divider />

                <Section.Label
                  name='Original Language'
                  value={`${this.state.movie?.originalLanguage}`}
                />

                {this.state.movie?.spokenLanguages.length !== 0 && (
                  <>
                    <Section.Divider />

                    <Section.Label
                      name='Language Spoken'
                      value={`${this.state.movie?.spokenLanguages
                        .map(language => language.englishName)
                        .join(', ')}`}
                    />
                  </>
                )}

                {this.state.movie?.productionCountries.length !== 0 && (
                  <>
                    <Section.Divider />

                    <Section.Label
                      name='Production Countries'
                      value={`${this.state.movie?.productionCountries
                        .map(country => country.name)
                        .join(', ')}`}
                    />
                  </>
                )}

                {this.state.movie?.productionCompanies.length !== 0 && (
                  <>
                    <Section.Divider />

                    <Section.Items
                      name='Production Companies'
                      keyExtractor={item => item.id.toString()}
                      data={this.state.movie?.productionCompanies}
                      renderItem={this.renderCompanyItem}
                    />
                  </>
                )}
              </Section.Content>
            </Section>

            <Section.Separator />

            <Section title='Box office'>
              <Section.Content>
                <Section.Label
                  name='Budget'
                  value={getFormattedMoney(this.state.movie?.budget)}
                />

                <Section.Divider />

                <Section.Label
                  name='Revenue'
                  value={getFormattedMoney(this.state.movie?.revenue)}
                />
              </Section.Content>
            </Section>

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
                    <Youtube type='movie' id={this.state.movie?.id} />
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default MovieDetailScreen;
