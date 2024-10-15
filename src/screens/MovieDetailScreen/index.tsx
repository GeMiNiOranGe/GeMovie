import React from 'react';
import {
  FlatList,
  Image,
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
} from 'iconsax-react-native';
import { Chip } from 'react-native-paper';

import { Adult } from '@assets/icons';
import { MovieService, URLBuilder } from '@services';
import type {
  Genre,
  LabelProps,
  MovieDetailScreenState,
  RootScreenProps,
  Variant,
} from '@shared/types';
import {
  getFormattedDate,
  getFormattedFullYear,
  getFormattedVoteAverage,
} from '@shared/utils';
import { ExpandableText, Labels, Section, Youtube } from '@components';
import { layout, themeColor } from '@shared/themes';
import { spacing } from '@shared/constants';
import styles from './style';

const iconSize = 16;
const iconColor = themeColor.subtext.toString();
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
        value: `${this.state.movie?.runtime} minutes`,
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
        value: `${this.state.movie?.budget.toLocaleString()} USD`,
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
        value: `${this.state.movie?.revenue.toLocaleString()} USD`,
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
            colors={['transparent', themeColor.primary.toString()]}
          >
            <View style={styles.posterBox}>
              {this.state.movie?.posterPath ? (
                <Image
                  style={styles.poster}
                  source={{
                    uri: URLBuilder.buildImageURL(
                      'w342',
                      this.state.movie?.posterPath,
                    ),
                  }}
                />
              ) : (
                <View
                  style={[layout.center, styles.poster, styles.posterNotFound]}
                >
                  <ImageIcon size='48' color={themeColor.text.toString()} />
                  <Text style={styles.notFoundText}>Poster not found</Text>
                </View>
              )}
            </View>
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
                color={themeColor.accent.dark.toString()}
                variant='Bold'
              />

              <Text style={styles.rating}>
                {getFormattedVoteAverage(this.state.movie?.voteAverage)} (
                {this.state.movie?.voteCount})
              </Text>
            </View>

            <View style={[layout.itemsCenter, styles.labelBox]}>
              <Labels data={this.getLabels()} />
            </View>

            <View style={styles.synopsisBox}>
              <Text style={styles.synopsisTitle}>Synopsis</Text>

              <ExpandableText
                text={`${this.state.movie?.overview}`}
                seeButtonPosition='separate'
              />
            </View>

            <Section title='Storyline'>
              <ExpandableText
                text={`${this.state.movie?.overview}`}
                numberOfLines={3}
              />

              <Section.Divider />

              <Section.Label
                name='Tagline'
                value={`${this.state.movie?.tagline}`}
              />

              <Section.Divider />

              <Section.Label
                name='Genres'
                value={`${this.state.movie?.genres
                  .map(genre => genre.name)
                  .join(', ')}`}
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
                name='Homepage'
                value={`${this.state.movie?.homepage}`}
              />

              <Section.Divider />

              <Section.Item name='Production Companies'>
                <Text style={styles.subtext}>Production Companies</Text>
              </Section.Item>
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
