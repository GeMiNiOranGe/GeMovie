import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
} from 'iconsax-react-native';
import { Chip, TouchableRipple } from 'react-native-paper';

import { Adult, IMDb } from '@assets/icons';
import { MovieService, URLBuilder } from '@services';
import type {
  CompanyElement,
  Genre,
  LabelProps,
  MovieDetailScreenState,
  RootScreenProps,
  Variant,
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
  TMDBImage,
  TouchableRippleLink,
  Youtube,
} from '@components';
import { layout, colors } from '@shared/themes';
import { spacing } from '@shared/constants';
import { IMDB_BASE_URL } from '@config';
import styles from './style';

const iconSize = 16;
const iconColor = colors.subtext.toString();
const iconVariant: Variant = 'Bold';

class MovieDetailScreen extends React.Component<
  RootScreenProps<'MovieDetailScreen'>,
  MovieDetailScreenState
> {
  public constructor(props: RootScreenProps<'MovieDetailScreen'>) {
    super(props);
    this.state = {
      movie: undefined,
    };

    this.renderGenreItem = this.renderGenreItem.bind(this);
    this.renderCompanyItem = this.renderCompanyItem.bind(this);
    this.pushCollectionDetailScreen =
      this.pushCollectionDetailScreen.bind(this);
  }

  public override componentDidMount(): void {
    const { movieId } = this.props.route.params;

    MovieService.getDetailAsync(movieId).then(data =>
      this.setState({ movie: data }, () => {
        this.props.navigation.setOptions({ title: data.title });
      }),
    );
  }

  private renderGenreItem({
    item,
    index,
  }: ListRenderItemInfo<Genre>): React.JSX.Element {
    const marginRight =
      index === (this.state.movie?.genres.length || 0) - 1 ? 0 : spacing.small;

    return (
      <Chip
        style={[styles.genreChip, { marginRight }]}
        textStyle={styles.genre}
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

  private pushCollectionDetailScreen(): void {
    this.props.navigation.push('CollectionDetailScreen', {
      collectionId: this.state.movie?.belongsToCollection?.id as number,
    });
  }

  private getLabels(): LabelProps[] {
    return [
      {
        icon: (
          <Calendar size={iconSize} color={iconColor} variant={iconVariant} />
        ),
        name: 'Year',
        value: getFormattedFullYear(this.state.movie?.releaseDate),
      },
      {
        icon: <Clock size={iconSize} color={iconColor} variant={iconVariant} />,
        name: 'Length',
        value: getFormattedRuntime(this.state.movie?.runtime, 'minute'),
      },
      {
        icon: <Adult size={iconSize} color={iconColor} />,
        name: 'Adult',
        value: this.state.movie?.adult ? 'Yes' : 'No',
      },
      {
        icon: (
          <Moneys size={iconSize} color={iconColor} variant={iconVariant} />
        ),
        name: 'Budget',
        value: getFormattedMoney(this.state.movie?.budget),
      },
      {
        icon: (
          <MoneyRecive
            size={iconSize}
            color={iconColor}
            variant={iconVariant}
          />
        ),
        name: 'Revenue',
        value: getFormattedMoney(this.state.movie?.revenue),
      },
    ];
  }

  public override render(): React.JSX.Element {
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
            style={[layout.center]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['transparent', colors.primary.toString()]}
          >
            <TMDBImage
              style={styles.posterBox}
              imageStyle={styles.poster}
              imagePath={this.state.movie?.posterPath}
              imageSize='w342'
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
              <TouchableRippleLink
                style={styles.homepageLink}
                url={`${this.state.movie?.homepage}`}
                rippleColor={colors.accent.light}
              >
                <Global color={colors.primary.toString()} />
              </TouchableRippleLink>

              <TouchableRippleLink
                url={`${IMDB_BASE_URL}/title/${this.state.movie?.imdbId}`}
              >
                <IMDb color={colors.text.toString()} />
              </TouchableRippleLink>
            </View>

            <View style={[layout.itemsCenter, styles.labelBox]}>
              <Labels data={this.getLabels()} />
            </View>

            <View style={styles.informationBox}>
              <Text style={styles.informationTitle}>Synopsis</Text>

              <ExpandableText
                text={`${this.state.movie?.overview}`}
                seeButtonPosition='separate'
              />
            </View>

            {this.state.movie?.belongsToCollection && (
              <View style={styles.informationBox}>
                <Text style={styles.informationTitle}>
                  Belongs to collection
                </Text>

                <ImageBackground
                  blurRadius={4}
                  source={{
                    uri: URLBuilder.buildImageURL(
                      'w300',
                      this.state.movie?.belongsToCollection?.backdropPath,
                    ),
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['transparent', colors.text.toString()]}
                  >
                    <TouchableRipple
                      style={[layout.row, layout.itemsCenter]}
                      rippleColor={colors.neutral}
                      onPress={this.pushCollectionDetailScreen}
                    >
                      <>
                        <TMDBImage
                          style={styles.collectionPosterBox}
                          imageStyle={styles.collectionPoster}
                          imagePath={
                            this.state.movie?.belongsToCollection?.posterPath
                          }
                          imageSize='w154'
                        />

                        <Text style={styles.collectionTitle} numberOfLines={1}>
                          {this.state.movie?.belongsToCollection?.name}
                        </Text>
                      </>
                    </TouchableRipple>
                  </LinearGradient>
                </ImageBackground>
              </View>
            )}

            <Section title='Storyline'>
              <View style={styles.expandableText}>
                <ExpandableText
                  text={`${this.state.movie?.overview}`}
                  numberOfLines={3}
                />
              </View>

              <Section.Divider />

              <Section.Label
                name='Tagline'
                value={`${this.state.movie?.tagline}`}
              />

              <Section.Divider />

              <Section.Items
                name='Genres'
                keyExtractor={item => item.id.toString()}
                data={this.state.movie?.genres}
                renderItem={this.renderGenreItem}
              />
            </Section>

            <Section title='Details'>
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

              <Section.Divider />

              <Section.Label
                name='Language Spoken'
                value={`${this.state.movie?.spokenLanguages
                  .map(language => language.englishName)
                  .join(', ')}`}
              />

              <Section.Divider />

              <Section.Label
                name='Production Countries'
                value={`${this.state.movie?.productionCountries
                  .map(country => country.name)
                  .join(', ')}`}
              />

              <Section.Divider />

              <Section.Items
                name='Production Companies'
                keyExtractor={item => item.id.toString()}
                data={this.state.movie?.productionCompanies}
                renderItem={this.renderCompanyItem}
              />
            </Section>

            <Section title='Box office'>
              <Section.Label
                name='Budget'
                value={getFormattedMoney(this.state.movie?.budget)}
              />

              <Section.Divider />

              <Section.Label
                name='Revenue'
                value={getFormattedMoney(this.state.movie?.revenue)}
              />
            </Section>

            <View>
              <Youtube type='movie' id={this.state.movie?.id} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default MovieDetailScreen;
