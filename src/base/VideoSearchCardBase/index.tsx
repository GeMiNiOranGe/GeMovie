import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { ArrowRight2, Image as ImageIcon, Star1 } from 'iconsax-react-native';
import { Card, IconButton } from 'react-native-paper';

import { URLBuilder } from '@services';
import { spacing } from '@shared/constants';
import { layout } from '@shared/themes';
import { getFormattedFullYear, getFormattedVoteAverage } from '@shared/utils';
import type {
  CollectionElement,
  CompanyElement,
  MovieElement,
  PersonElement,
  TvShowElement,
} from '@shared/types';
import styles from './style';

type SearchCardElement =
  | MovieElement
  | TvShowElement
  | PersonElement
  | CollectionElement
  | CompanyElement;

type SearchCardProps<T extends SearchCardElement> = {
  item: T;
  index: number;
  listLength?: number | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

type VideoElementBase = MovieElement | TvShowElement;

type VideoSearchCardBaseProps<T extends VideoElementBase> = SearchCardProps<T>;

abstract class VideoSearchCardBase<
  T extends VideoElementBase,
> extends React.PureComponent<VideoSearchCardBaseProps<T>> {
  protected abstract get originalName(): string;
  protected abstract get name(): string;
  protected abstract get airDate(): Date;
  protected abstract get mediaType(): string;

  protected get video(): boolean {
    return false;
  }

  protected get originCountry(): string[] {
    return [];
  }

  private renderNavigationIcon() {
    return <ArrowRight2 size={24} color='white' />;
  }

  public override render(): React.JSX.Element {
    const marginBottom: number =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    return (
      <Card
        style={[styles.card, { marginBottom }]}
        contentStyle={styles.contentCard}
        onPress={this.props.onPress}
      >
        <View style={[styles.image, styles.imageBox, layout.center]}>
          {this.props.item.posterPath ? (
            <Image
              style={styles.image}
              source={{
                uri: URLBuilder.buildImageURL(
                  'w185',
                  this.props.item.posterPath,
                ),
              }}
            />
          ) : (
            <ImageIcon size='48' color='black' />
          )}

          <View
            style={[
              styles.ratingBox,
              layout.center,
              layout.row,
              StyleSheet.absoluteFill,
            ]}
          >
            <Star1 size='16' color='white' variant='Bold' />

            <Text style={styles.ratingText}>
              {getFormattedVoteAverage(this.props.item.voteAverage)}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {this.name}
          </Text>

          <Text style={styles.information} numberOfLines={1}>
            {this.originalName}
          </Text>

          <Text style={styles.information} numberOfLines={1}>
            {getFormattedFullYear(this.airDate)}
            {' - '}
            {this.props.item.originalLanguage.toUpperCase()}
          </Text>

          {this.props.item.overview && (
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

        <View style={[styles.navigationBox, StyleSheet.absoluteFill]}>
          <IconButton
            style={styles.navigationIconButton}
            icon={this.renderNavigationIcon}
            onPress={this.props.onPress}
          />
        </View>
      </Card>
    );
  }
}

export default VideoSearchCardBase;
