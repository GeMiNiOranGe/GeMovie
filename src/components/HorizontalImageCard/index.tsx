import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';

import { HorizontalImageCardProps } from '@shared/types';
import { IMAGE_SIZE } from '@shared/constants';
import { TMDB_BASE_IMAGE_URL } from '@config';
import styles from './style';

class HorizontalImageCard extends React.Component<HorizontalImageCardProps> {
  constructor(props: HorizontalImageCardProps) {
    super(props);
  }

  render(): React.JSX.Element {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'transparent'}
        onPress={() => this.props.onPress(this.props.index)}
      >
        <View style={styles.card}>
          <View style={[styles.absolute, styles.cardBackground]} />

          <View style={[styles.cardImage, styles.cardImageView]}>
            <Image
              style={[styles.cardImage, styles.absolute]}
              source={{
                uri: `${TMDB_BASE_IMAGE_URL}/${IMAGE_SIZE.w154}/${this.props.item.poster_path}`,
              }}
            />

            <View style={styles.flexEnd}>
              <View style={styles.ratingView}>
                <Text style={styles.ratingText}>
                  {this.props.item.vote_average.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.title} numberOfLines={2}>
              {this.props.item.title}
            </Text>

            <Text style={styles.information} numberOfLines={1}>
              Original: {this.props.item.original_title}
            </Text>

            <Text style={styles.information} numberOfLines={1}>
              Release:{' '}
              {this.props.item.release_date === ''
                ? 'unknown'
                : this.props.item.release_date}
            </Text>

            <Text
              style={[styles.information, styles.overview]}
              numberOfLines={3}
            >
              {this.props.item.overview}
            </Text>

            <Text style={styles.information} numberOfLines={2}>
              Genre: {this.props.item.genre_ids}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default HorizontalImageCard;
