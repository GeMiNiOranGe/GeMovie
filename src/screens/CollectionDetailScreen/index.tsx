import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  StyleSheet,
  type ListRenderItemInfo,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chip } from 'react-native-paper';
import { flatMap, uniq } from 'lodash';

import type { CollectionDetailState, RootScreenProps } from '@shared/types';
import { CollectionService, GenreService } from '@services';
import {
  ExpandableText,
  FullScreenLoader,
  Section,
  TMDBImage,
  VoteLabel,
} from '@components';
import { colors, layout } from '@shared/themes';
import { getFormattedGenres } from '@shared/utils';
import { spacing } from '@shared/constants';
import styles from './style';

class CollectionDetailScreen extends React.Component<
  RootScreenProps<'CollectionDetailScreen'>,
  CollectionDetailState
> {
  private genreNames: (string | undefined)[];
  private voteAverage: number;

  public constructor(props: RootScreenProps<'CollectionDetailScreen'>) {
    super(props);
    this.state = {
      collection: undefined,
    };

    this.genreNames = [];
    this.voteAverage = 0;

    this.renderGenreItem = this.renderGenreItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { collectionId } = this.props.route.params;

    const [collection, movieGenres] = await Promise.all([
      CollectionService.getDetailAsync(collectionId),
      GenreService.instance.fetchMovieGenres(),
    ]);

    const genreIds = uniq(flatMap(collection.parts, 'genreIds'));
    this.genreNames = getFormattedGenres(genreIds, movieGenres);

    this.voteAverage = (() => {
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
              <Text style={styles.name} numberOfLines={4}>
                {this.state.collection.name}
              </Text>

              <View style={layout.itemsStart}>
                <VoteLabel style={styles.rating} value={this.voteAverage} />
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.informationBox}>
              <Text style={styles.informationTitle}>Overview</Text>

              <ExpandableText
                text={
                  this.state.collection.overview || 'No overview available.'
                }
                seeButtonPosition='separate'
              />
            </View>

            <Section.Separator />

            <Section title='Details'>
              <Section.Content>
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
