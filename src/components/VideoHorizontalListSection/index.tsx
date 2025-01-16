import React from 'react';
import { View, Text, type ListRenderItemInfo, StyleSheet } from 'react-native';

import type {
  MovieElement,
  TvShowElement,
  VideoHorizontalListSectionProps,
} from '@shared/types';
import {
  CompactMovieCard,
  CompactTvShowCard,
  Section,
  WatchList,
} from '@components';
import { getFormattedDate } from '@shared/utils';
import { layout } from '@shared/themes';
import styles from './style';

class VideoHorizontalListSection extends React.PureComponent<VideoHorizontalListSectionProps> {
  public constructor(props: VideoHorizontalListSectionProps) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  private renderItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement | TvShowElement>): React.JSX.Element {
    const isMovie = this.props.type === 'movie';
    const screenName = isMovie ? 'MovieDetailScreen' : 'TvShowDetailScreen';
    const params = { [isMovie ? 'movieId' : 'tvShowId']: item.id };
    const ItemCard: React.ElementType = isMovie
      ? CompactMovieCard
      : CompactTvShowCard;
    const upcomingDate = isMovie
      ? (item as MovieElement).releaseDate
      : (item as TvShowElement).firstAirDate;

    return (
      <View>
        {this.props.isUpcoming && (
          <Text style={styles.onAirText}>
            {getFormattedDate(upcomingDate).slice(4)}
          </Text>
        )}

        {this.props.WatchList && (
          <View
            style={[
              StyleSheet.absoluteFill,
              layout.itemsStart,
              styles.watchlist,
            ]}
          >
            <WatchList id={item.id} type={this.props.type} />
          </View>
        )}

        <ItemCard
          item={item}
          index={index}
          listLength={this.props.data.length}
          onPress={() => this.props.navigation.push(screenName, params)}
        />
      </View>
    );
  }

  public override render(): React.ReactNode {
    if (!this.props.data.length) {
      return null;
    }

    return (
      <>
        <Section title={this.props.title}>
          <Section.HorizontalList
            keyExtractor={item => item.id.toString()}
            data={this.props.data}
            renderItem={this.renderItem}
          />
        </Section>

        <Section.Separator />
      </>
    );
  }
}

export default VideoHorizontalListSection;
