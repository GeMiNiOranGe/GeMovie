import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { ArrowRight2, Star1 } from 'iconsax-react-native';

import type { VideoElement } from '@shared/types';
import { RankText, TMDBImage, VoteLabel, WatchList } from '@components';
import { getFormattedFullYear, getFormattedVoteAverage } from '@shared/utils';
import { colors, layout } from '@shared/themes';
import { spacing } from '@shared/constants';
import VideoCardBase from '../VideoCardBase';
import styles, { horizontal } from './style';

const navigationIconSize = 20;

abstract class CompactVideoCardBase<
  E extends VideoElement,
> extends VideoCardBase<E> {
  private renderNavigationIcon(): React.JSX.Element {
    return (
      <ArrowRight2 size={navigationIconSize} color='white' variant='Bold' />
    );
  }

  private renderHorizontal(): React.JSX.Element {
    const marginBottom: number =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    return (
      <Card
        style={[
          horizontal.card,
          { marginBottom },
          this.props.cardBackgroundColor && {
            backgroundColor: this.props.cardBackgroundColor,
          },
        ]}
        contentStyle={layout.row}
        onPress={this.props.onPress}
      >
        <View style={horizontal.posterBox}>
          <TMDBImage
            style={horizontal.poster}
            path={this.props.item.posterPath}
            size='w154'
          />
        </View>

        <View style={[layout.flex1, layout.justifyCenter, horizontal.content]}>
          <Text style={horizontal.title} numberOfLines={2}>
            {this.name}
          </Text>

          <Text style={horizontal.subtext}>
            {getFormattedFullYear(this.airDate)}
            {' - '}
            {this.props.item.originalLanguage.toUpperCase()}
          </Text>

          <View style={[layout.itemsCenter, layout.row]}>
            <Star1 size='14' color='black' variant='Bold' />

            <Text style={horizontal.ratingText}>
              {getFormattedVoteAverage(this.props.item.voteAverage)} (
              {this.props.item.voteCount})
            </Text>
          </View>
        </View>

        <View style={[layout.justifyCenter, layout.itemsEnd]}>
          <IconButton
            style={horizontal.navigationIconButton}
            icon={this.renderNavigationIcon}
            onPress={this.props.onPress}
            size={navigationIconSize}
            rippleColor={colors.accent.light}
          />
        </View>

        {this.props.showWatchList && (
          <View
            style={[
              StyleSheet.absoluteFill,
              layout.itemsStart,
              styles.watchlist,
            ]}
          >
            <WatchList id={this.props.item.id} type={this.mediaType} />
          </View>
        )}
      </Card>
    );
  }

  public override render(): React.JSX.Element {
    if (this.props.horizontal) {
      return this.renderHorizontal();
    }

    const marginRight =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;
    const posterMarginBottom = this.props.showRank
      ? spacing.extraLarge
      : spacing.small;

    return (
      <Card style={[styles.card, { marginRight }]} onPress={this.props.onPress}>
        <View style={{ marginBottom: posterMarginBottom }}>
          <TMDBImage
            style={styles.poster}
            path={this.props.item.posterPath}
            size='w342'
          />

          {this.props.showWatchList && (
            <View
              style={[
                StyleSheet.absoluteFill,
                layout.itemsStart,
                styles.watchlist,
              ]}
            >
              <WatchList id={this.props.item.id} type={this.mediaType} />
            </View>
          )}

          {this.props.showMediaType && (
            <View style={[layout.itemsEnd, StyleSheet.absoluteFill]}>
              <View style={styles.mediaTypeBox}>
                <Text style={styles.mediaTypeText}>{this.mediaType}</Text>
              </View>
            </View>
          )}

          {this.props.showRank && (
            <View style={[layout.flexEnd, StyleSheet.absoluteFill]}>
              <VoteLabel value={this.props.item.voteAverage} />
            </View>
          )}

          <View
            style={[
              layout.justifyEnd,
              layout.itemsStart,
              StyleSheet.absoluteFill,
            ]}
          >
            {this.props.showRank ? (
              <View style={styles.rankBox}>
                <RankText text={(this.props.index + 1).toString()} />
              </View>
            ) : (
              <VoteLabel value={this.props.item.voteAverage} />
            )}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.text} numberOfLines={2}>
            {this.name}
            {'\n'}
          </Text>

          <Text style={styles.subtext}>
            {getFormattedFullYear(this.airDate)}
          </Text>
        </View>
      </Card>
    );
  }
}

export default CompactVideoCardBase;
