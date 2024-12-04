import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  type ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';

import type {
  EpisodeElement,
  RootScreenProps,
  SeasonDetailScreenState,
} from '@shared/types';
import { TvShowService } from '@services';
import {
  Box,
  ExpandableText,
  FullScreenLoader,
  Section,
  TMDBImage,
  VoteLabel,
} from '@components';
import { getFormattedFullYear } from '@shared/utils';
import { spacing } from '@shared/constants';
import { layout } from '@shared/themes';
import styles from './style';

class SeasonDetailScreen extends React.PureComponent<
  RootScreenProps<'SeasonDetailScreen'>,
  SeasonDetailScreenState
> {
  public constructor(props: RootScreenProps<'SeasonDetailScreen'>) {
    super(props);
    this.state = {
      season: undefined,
    };

    this.renderEpisodeItem = this.renderEpisodeItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { tvShowId, seasonNumber } = this.props.route.params;

    const season = await TvShowService.getSeasonDetailAsync(
      tvShowId,
      seasonNumber,
    );

    this.setState({ season });
    this.props.navigation.setOptions({ title: season.name });
  }

  public renderEpisodeItem({
    item,
    index,
  }: ListRenderItemInfo<EpisodeElement>): React.JSX.Element {
    const marginBottom =
      index === (this.state.season?.episodes.length || 0) - 1
        ? 0
        : spacing.small;

    return (
      <Card
        style={[styles.episode, { marginBottom }]}
        contentStyle={layout.row}
        onPress={() =>
          this.props.navigation.push('EpisodeDetailScreen', {
            tvShowId: item.showId,
            seasonNumber: item.seasonNumber,
            episodeNumber: item.episodeNumber,
          })
        }
      >
        <TMDBImage
          style={styles.episodeStill}
          size='w300'
          path={item.stillPath}
        />

        <View style={[layout.flex1, styles.episodeContent]}>
          <Text style={styles.episodeTitle} numberOfLines={2}>
            {item.name}
          </Text>

          <View style={[layout.row, layout.itemsCenter]}>
            <View style={layout.itemsStart}>
              <VoteLabel
                style={styles.episodeRating}
                value={item.voteAverage}
              />
            </View>

            <Text style={styles.subtext}>
              {getFormattedFullYear(item.airDate)}
            </Text>
          </View>

          <Text style={styles.subtext} numberOfLines={3}>
            {item.overview}
          </Text>
        </View>
      </Card>
    );
  }

  public override render(): React.JSX.Element {
    if (!this.state.season) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView>
          <View style={[layout.row, styles.header]}>
            <View style={styles.posterBox}>
              <TMDBImage
                style={styles.poster}
                size='w342'
                path={this.state.season.posterPath}
              />
            </View>

            <View style={layout.flex1}>
              <Text style={styles.title} numberOfLines={2}>
                {this.state.season.name}
              </Text>

              <Text style={styles.subtext}>
                {getFormattedFullYear(this.state.season.airDate)}
                {' - '}
                {this.state.season.episodes.length === 1
                  ? `${this.state.season.episodes.length} episode`
                  : `${this.state.season.episodes.length} episodes`}
              </Text>

              <View style={layout.itemsStart}>
                <VoteLabel
                  style={styles.rating}
                  value={this.state.season.voteAverage}
                />
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <Box title='Overview'>
              <ExpandableText seeButtonPosition='separate'>
                {this.state.season.overview}
              </ExpandableText>
            </Box>

            <Section.Separator />

            <Section title='Episodes'>
              <FlatList
                contentContainerStyle={styles.listContent}
                scrollEnabled={false}
                keyExtractor={item => item.id.toString()}
                data={this.state.season.episodes}
                renderItem={this.renderEpisodeItem}
              />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SeasonDetailScreen;
