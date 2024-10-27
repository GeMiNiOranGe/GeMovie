import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';

import type { CompactCardProps, MovieElement } from '@shared/types';
import { TMDBImage } from '@components';
import styles from './style';
import { spacing } from '@shared/constants';

class CompactMovieCard extends React.PureComponent<
  CompactCardProps<MovieElement>
> {
  public override render(): React.JSX.Element {
    const marginRight =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    return (
      <Card style={[styles.card, { marginRight }]} onPress={this.props.onPress}>
        <TMDBImage
          style={styles.posterBox}
          imageStyle={styles.poster}
          imagePath={this.props.item.posterPath}
          imageSize='w342'
        />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {this.props.item.title}
            {'\n'}
          </Text>
        </View>
      </Card>
    );
  }
}

export default CompactMovieCard;
