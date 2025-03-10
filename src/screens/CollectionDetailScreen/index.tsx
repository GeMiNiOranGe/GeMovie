import React from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  type ListRenderItemInfo,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Chip } from 'react-native-paper';
import { flatMap, maxBy, uniq } from 'lodash';

import type {
  CollectionDetailState,
  Media,
  MovieElement,
  RootScreenProps,
} from '@shared/types';
import { CollectionService, GenreService } from '@services';
import {
  Box,
  CompactMovieCard,
  ExpandableText,
  FullScreenLoader,
  MovieDetailCard,
  Section,
  TMDBImage,
  VoteLabel,
} from '@components';
import { colors, layout } from '@shared/themes';
import { getFormattedGenres } from '@shared/utils';
import { spacing } from '@shared/constants';
import styles from './style';

class CollectionDetailScreen extends React.PureComponent<
  RootScreenProps<'CollectionDetailScreen'>,
  CollectionDetailState
> {
  private genreNames: (string | undefined)[];
  private voteAverage: number;
  private latestMovie: (MovieElement & Media) | undefined;
  private topRated: (MovieElement & Media) | undefined;

  public constructor(props: RootScreenProps<'CollectionDetailScreen'>) {
    super(props);
    this.state = {
      collection: undefined,
    };

    this.genreNames = [];
    this.voteAverage = 0;

    this.renderGenreItem = this.renderGenreItem.bind(this);
    this.renderMovieItem = this.renderMovieItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { collectionId } = this.props.route.params;

    const [collection, movieGenres] = await Promise.all([
      CollectionService.getDetailAsync(collectionId),
      GenreService.instance.fetchMovieGenres(),
    ]);

    const genreIds = uniq(flatMap(collection.parts, 'genreIds'));
    this.genreNames = getFormattedGenres(genreIds, movieGenres);

    this.voteAverage = ((): number => {
      let totalVoteAverage = 0;
      let numberOfMoviesWithVotes = 0;

      collection.parts.forEach(element => {
        if (element.voteCount > 0) {
          totalVoteAverage += element.voteAverage;
          numberOfMoviesWithVotes++;
        }
      });

      return numberOfMoviesWithVotes > 0
        ? totalVoteAverage / numberOfMoviesWithVotes
        : 0;
    })();

    this.latestMovie = maxBy(collection.parts, 'releaseDate');

    this.topRated = ((): (MovieElement & Media) | undefined => {
      if (collection.parts.length < 10) {
        return undefined;
      }

      if (collection.parts.length === 0) {
        return undefined;
      }

      return collection.parts.reduce((topRated, current) => {
        if (
          current.voteAverage > topRated.voteAverage ||
          (current.voteAverage === topRated.voteAverage &&
            current.voteCount > topRated.voteCount)
        ) {
          return current;
        }
        return topRated;
      });
    })();

    this.setState({ collection });
    this.props.navigation.setOptions({ title: collection.name });
  }

  private renderGenreItem({
    item,
    index,
  }: ListRenderItemInfo<string | undefined>): React.JSX.Element {
    const marginRight =
      index === (this.genreNames?.length || 0) - 1 ? 0 : spacing.small;

    return (
      <Chip style={[styles.chip, { marginRight }]} textStyle={styles.chipText}>
        {item}
      </Chip>
    );
  }

  private renderMovieItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element {
    return (
      <CompactMovieCard
        item={item}
        index={index}
        listLength={this.state.collection?.parts.length}
        onPress={() =>
          this.props.navigation.push('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  }

  public override render(): React.JSX.Element {
    if (!this.state.collection) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        {this.state.collection.backdropPath && (
          <TMDBImage
            style={styles.backdrop}
            path={this.state.collection.backdropPath}
            size='w1280'
          />
        )}

        <ScrollView style={StyleSheet.absoluteFill}>
          <LinearGradient
            style={[StyleSheet.absoluteFill, styles.linearGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.5 }}
            colors={['transparent', colors.primary.toString()]}
          />

          <View style={[layout.row, styles.header]}>
            <View style={styles.posterBox}>
              <TMDBImage
                style={styles.poster}
                path={this.state.collection.posterPath}
                size='w342'
              />
            </View>

            <View style={[layout.flex1, styles.nameBox]}>
              <Text style={styles.name} numberOfLines={2}>
                {this.state.collection.name}
              </Text>

              <View style={layout.itemsStart}>
                <VoteLabel style={styles.rating} value={this.voteAverage} />
              </View>

              <Text style={styles.numberOfMovies} numberOfLines={1}>
                Number of Movies: {this.state.collection.parts.length}
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <Box style={styles.overviewBox} title='Overview'>
              <ExpandableText>
                {this.state.collection.overview || 'No overview available.'}
              </ExpandableText>
            </Box>

            <FlatList
              style={styles.genreList}
              contentContainerStyle={styles.genreContentList}
              horizontal
              data={this.genreNames}
              renderItem={this.renderGenreItem}
            />

            {this.latestMovie && (
              <Box title='Latest movie'>
                <CompactMovieCard
                  item={this.latestMovie}
                  index={0}
                  listLength={1}
                  cardBackgroundColor={colors.background}
                  horizontal
                  onPress={() =>
                    this.props.navigation.push('MovieDetailScreen', {
                      movieId: this.latestMovie?.id as number,
                    })
                  }
                />
              </Box>
            )}

            {this.topRated && (
              <Box title='Top Rated'>
                <MovieDetailCard
                  item={this.topRated}
                  index={0}
                  listLength={1}
                  cardBackgroundColor={colors.background}
                  onPress={() =>
                    this.props.navigation.push('MovieDetailScreen', {
                      movieId: this.topRated?.id as number,
                    })
                  }
                />
              </Box>
            )}

            <Section.Separator />

            <Section title='Parts'>
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={this.state.collection.parts}
                renderItem={this.renderMovieItem}
              />
            </Section>

            <Section.Separator />

            <Section title='Details'>
              <Section.Content>
                <Section.Label
                  name='Full Name'
                  value={this.state.collection.name}
                />

                <Section.Divider />

                <Section.Label
                  name='Number of Movies'
                  value={this.state.collection.parts.length.toString()}
                />

                <Section.Divider />

                <Section.Items
                  name='Genres'
                  data={this.genreNames}
                  renderItem={this.renderGenreItem}
                />
              </Section.Content>
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CollectionDetailScreen;
