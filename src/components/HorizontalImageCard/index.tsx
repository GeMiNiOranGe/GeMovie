import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';

import { HorizontalImageCardProps } from '@shared/types';
import { imageSize } from '@shared/constants';
import { TMDB_BASE_IMAGE_URL } from '@config';
import { getFormattedDate } from '@shared/utils';
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
                uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w185}${this.props.item.posterPath}`,
              }}
            />

            <View style={styles.flexEnd}>
              <View style={styles.ratingView}>
                <Text style={styles.ratingText}>
                  {this.props.item.voteAverage
                    ? this.props.item.voteAverage.toFixed(1)
                    : 'N/A'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.title} numberOfLines={2}>
              {this.props.item.title}
            </Text>

            <Text style={styles.information} numberOfLines={1}>
              {this.props.item.originalTitle}
            </Text>

            <Text style={styles.information} numberOfLines={1}>
              {getFormattedDate(this.props.item.releaseDate)}
              {' - '}
              {this.props.item.originalLanguage.toUpperCase()}
            </Text>

            {!this.props.item.overview ? null : (
              <Text
                style={[styles.information, styles.overview]}
                numberOfLines={2}
              >
                {this.props.item.overview}
              </Text>
            )}

            <Text style={styles.information} numberOfLines={2}>
              Genre: {this.props.item.genreIds}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default HorizontalImageCard;
