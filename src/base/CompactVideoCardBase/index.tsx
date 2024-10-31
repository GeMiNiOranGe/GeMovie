import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Star1 } from 'iconsax-react-native';

import type { VideoElement } from '@shared/types';
import { TMDBImage } from '@components';
import { getFormattedFullYear, getFormattedVoteAverage } from '@shared/utils';
import { layout } from '@shared/themes';
import { spacing } from '@shared/constants';
import VideoCardBase from '../VideoCardBase';
import styles from './style';

abstract class CompactVideoCardBase<
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

          <View
            style={[
              layout.justifyEnd,
              layout.itemsStart,
              StyleSheet.absoluteFill,
            ]}
          >
            <View style={[styles.ratingBox, layout.center, layout.row]}>
              <Star1 size='14' color='white' variant='Bold' />

              <Text style={styles.ratingText}>
                {getFormattedVoteAverage(this.props.item.voteAverage)}
              </Text>
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

export default CompactVideoCardBase;
