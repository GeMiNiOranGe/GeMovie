import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import type { CardBaseProps, SeasonElement } from '@shared/types';
import { TMDBImage, VoteLabel } from '@components';
import { spacing } from '@shared/constants';
import { layout } from '@shared/themes';
import { getFormattedFullYear } from '@shared/utils';
import styles from './style';

class SeasonCard extends React.PureComponent<CardBaseProps<SeasonElement>> {
  public override render(): React.JSX.Element {
    const marginRight =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    // TODO: add "overview" property, can click on "info" icon to show or hide
    return (
      <Card style={[styles.card, { marginRight }]} onPress={this.props.onPress}>
        <View style={styles.posterBox}>
          <TMDBImage
            style={styles.poster}
            size='w342'
            path={this.props.item.posterPath}
          />

          <View
            style={[
              layout.justifyEnd,
              layout.itemsStart,
              StyleSheet.absoluteFill,
            ]}
          >
            <VoteLabel value={this.props.item.voteAverage} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {this.props.item.name}
          </Text>

          <Text style={styles.subtext} numberOfLines={1}>
            {getFormattedFullYear(this.props.item.airDate)}
            {' - '}
            {this.props.item.episodeCount === 1
              ? `${this.props.item.episodeCount} episode`
              : `${this.props.item.episodeCount} episodes`}
          </Text>
        </View>
      </Card>
    );
  }
}

export default SeasonCard;
