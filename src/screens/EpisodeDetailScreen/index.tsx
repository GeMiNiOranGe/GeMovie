import React from 'react';
import { View, Text, ScrollView, type ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableRipple } from 'react-native-paper';
import { Star1 } from 'iconsax-react-native';

import type {
  Crew,
  EpisodeDetailScreenState,
  CastBase,
  RootScreenProps,
} from '@shared/types';
import {
  Box,
  ExpandableText,
  FullScreenLoader,
  Section,
  TMDBImage,
} from '@components';
import {
  getFormattedFullYear,
  getFormattedRuntime,
  getFormattedVoteAverage,
} from '@shared/utils';
import { TvShowService } from '@services';
import { colors, layout } from '@shared/themes';
import { spacing } from '@shared/constants';
import styles from './style';

class EpisodeDetailScreen extends React.PureComponent<
  RootScreenProps<'EpisodeDetailScreen'>,
  EpisodeDetailScreenState
> {
  public constructor(props: RootScreenProps<'EpisodeDetailScreen'>) {
    super(props);
    this.state = {
      episode: undefined,
    };

    this.renderGuestStarItem = this.renderGuestStarItem.bind(this);
    this.renderCrewItem = this.renderCrewItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    const { tvShowId, seasonNumber, episodeNumber } = this.props.route.params;

    const episode = await TvShowService.getEpisodeDetailAsync(
      tvShowId,
      seasonNumber,
      episodeNumber,
    );

    this.setState({ episode });
    this.props.navigation.setOptions({ title: episode.name });
  }

  public renderGuestStarItem({ item, index }: ListRenderItemInfo<CastBase>) {
    const marginRight: number =
      index === (this.state.episode?.guestStars.length || 0) - 1
        ? 0
        : spacing.large;

    return (
      <TouchableRipple
        style={[styles.card, { marginRight }]}
        onPress={() => {
          this.props.navigation.push('PersonDetailScreen', {
            personId: item.id,
          });
        }}
      >
        <>
          <View style={[layout.center, styles.profileBox]}>
            <TMDBImage
              style={styles.profile}
              path={item.profilePath}
              size='w185'
            />
          </View>

          <Text style={styles.cardName} numberOfLines={2}>
            {item.name}
            {'\n'}
          </Text>

          <Text style={styles.character} numberOfLines={1}>
            {item.character}
          </Text>
        </>
      </TouchableRipple>
    );
  }

  public renderCrewItem({ item, index }: ListRenderItemInfo<Crew>) {
    const marginRight: number =
      index === (this.state.episode?.crew.length || 0) - 1 ? 0 : spacing.large;

    return (
      <TouchableRipple
        style={[styles.card, { marginRight }]}
        onPress={() => {
          this.props.navigation.push('PersonDetailScreen', {
            personId: item.id,
          });
        }}
      >
        <>
          <View style={[layout.center, styles.profileBox]}>
            <TMDBImage
              style={styles.profile}
              path={item.profilePath}
              size='w185'
            />
          </View>

          <Text style={styles.cardName} numberOfLines={2}>
            {item.name}
            {'\n'}
          </Text>

          <Text style={styles.character} numberOfLines={1}>
            {item.job}
          </Text>
        </>
      </TouchableRipple>
    );
  }

  public override render(): React.JSX.Element {
    if (!this.state.episode) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView>
          <View style={styles.stillBox}>
            <TMDBImage
              style={styles.still}
              size='original'
              path={this.state.episode.stillPath}
            />
          </View>

          <Text style={styles.name}>
            {this.state.episode.name} (
            {getFormattedFullYear(this.state.episode.airDate)})
          </Text>

          <View style={[layout.row, layout.center, styles.ratingBox]}>
            <Star1
              size='14'
              color={colors.accent.dark.toString()}
              variant='Bold'
            />

            <Text style={styles.rating}>
              {getFormattedVoteAverage(this.state.episode.voteAverage)} (
              {this.state.episode.voteCount})
            </Text>
          </View>

          <Text style={styles.runtime}>
            Length: {getFormattedRuntime(this.state.episode.runtime, 'minute')}
          </Text>

          <View style={styles.content}>
            <Box title='Overview'>
              <ExpandableText seeButtonPosition='separate'>
                {this.state.episode.overview}
              </ExpandableText>
            </Box>

            <Section.Separator />

            <Section title='Guest Star'>
              <Section.HorizontalList
                noResultText='No one found.'
                keyExtractor={item => item.id.toString()}
                data={this.state.episode.guestStars}
                renderItem={this.renderGuestStarItem}
              />
            </Section>

            <Section.Separator />

            <Section title='Crew'>
              <Section.HorizontalList
                noResultText='No one found.'
                keyExtractor={(item, index) => index.toString()}
                data={this.state.episode.crew}
                renderItem={this.renderCrewItem}
              />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default EpisodeDetailScreen;
