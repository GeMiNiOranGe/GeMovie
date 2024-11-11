import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import type { VideoElement } from '@shared/types';
import { RankText, TMDBImage } from '@components';
import { spacing } from '@shared/constants';
import { layout } from '@shared/themes';
import { getFormattedFullYear } from '@shared/utils';
import VideoCardBase from '../VideoCardBase';
import styles from './style';

abstract class CompactVideoRankCardBase<
  E extends VideoElement,
> extends VideoCardBase<E> {
  public override render(): React.JSX.Element {
    const marginRight =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    return (
      <Card style={[styles.card, { marginRight }]} onPress={this.props.onPress}>
        <View style={styles.posterBox}>
          <TMDBImage
            style={styles.poster}
            path={this.props.item.posterPath}
            size='w342'
          />

          <View style={[layout.itemsEnd, StyleSheet.absoluteFill]}>
            <View style={styles.mediaTypeBox}>
              <Text style={styles.mediaTypeText}>{this.mediaType}</Text>
            </View>
          </View>

          <View
            style={[
              layout.justifyEnd,
              layout.itemsStart,
              StyleSheet.absoluteFill,
            ]}
          >
            <View style={styles.rankBox}>
              <RankText text={(this.props.index + 1).toString()} />
            </View>
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

export default CompactVideoRankCardBase;
