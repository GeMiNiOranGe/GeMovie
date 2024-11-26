import React from 'react';
import { View, Text } from 'react-native';

import type {
  VideoType,
  MovieElement,
  TvShowElement,
  VideoHorizontalListSectionProps,
} from '@shared/types';
import { CompactMovieCard, CompactTvShowCard, Section } from '@components';
import { getFormattedDate } from '@shared/utils';

import styles from './style';

class VideoHorizontalListSection extends React.PureComponent<VideoHorizontalListSectionProps> {
  public renderListItem = (
    type: VideoType,
    item: MovieElement | TvShowElement,
    index: number,
    listLength: number,
    isUpcoming?: boolean,
  ): React.JSX.Element => {
    const isMovie = type === 'movie';
    const id = isMovie ? (item as MovieElement).id : (item as TvShowElement).id;
    const screen = isMovie ? 'MovieDetailScreen' : 'TvShowDetailScreen';
    const params = isMovie ? { movieId: id } : { tvShowId: id };
    const ItemCard: React.ElementType = isMovie
      ? CompactMovieCard
      : CompactTvShowCard;
    const upcomingDate = isMovie
      ? (item as MovieElement).releaseDate
      : (item as TvShowElement).firstAirDate;

    return (
      <View>
        {isUpcoming && (
          <Text style={styles.onAirText}>
            {getFormattedDate(upcomingDate).slice(4)}
          </Text>
        )}

        <ItemCard
          item={item}
          index={index}
          listLength={listLength}
          onPress={() => this.props.navigation.push(screen, params)}
        />
      </View>
    );
  };

  public renderSection = (
    data: (MovieElement | TvShowElement)[],
    type: VideoType,
    title: string,
    isUpcoming?: boolean,
  ): React.ReactNode => {
    if (!data.length) {
      return null;
    }

    return (
      <>
        <Section title={title}>
          <Section.HorizontalList
            keyExtractor={item => item.id.toString()}
            data={data}
            renderItem={({ item, index }) =>
              this.renderListItem(type, item, index, data.length, isUpcoming)
            }
          />
        </Section>

        <Section.Separator />
      </>
    );
  };

  public override render(): React.ReactNode {
    return this.renderSection(
      this.props.data,
      this.props.type,
      this.props.title,
      this.props.isUpcoming,
    );
  }
}

export default VideoHorizontalListSection;
