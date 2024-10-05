import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  type ListRenderItemInfo,
  Pressable,
} from 'react-native';
import { ArrowRight2, Image as ImageIcon, Star1 } from 'iconsax-react-native';
import { Card, IconButton } from 'react-native-paper';

import { URLBuilder } from '@services';
import { spacing } from '@shared/constants';
import { layout, themeColor } from '@shared/themes';
import {
  getFormattedFullYear,
  getFormattedGenres,
  getFormattedVoteAverage,
} from '@shared/utils';
import type { VideoElementBase, VideoSearchCardBaseProps } from '@shared/types';
import styles from './style';

const navigationIconSize = 20;

abstract class VideoSearchCardBase<
  T extends VideoElementBase,
> extends React.PureComponent<VideoSearchCardBaseProps<T>> {
  private genres: (string | undefined)[] = getFormattedGenres(
    this.props.item.genreIds,
  );

  public constructor(props: VideoSearchCardBaseProps<T>) {
    super(props);

    this.renderGenreTagItem = this.renderGenreTagItem.bind(this);
  }

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

  private renderGenreTagItem({
    item,
    index,
  }: ListRenderItemInfo<string | undefined>) {
    const marginRight = index === this.genres.length - 1 ? 0 : spacing.small;

    return (
      <Pressable style={[layout.center, styles.genreTag, { marginRight }]}>
        <Text style={styles.genreTagText}>{item}</Text>
      </Pressable>
    );
  }

  private renderNavigationIcon() {
    return (
      <ArrowRight2 size={navigationIconSize} color='white' variant='Bold' />
    );
  }

  public override render(): React.JSX.Element {
    const marginBottom: number =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    return (
      <Card
        style={[styles.card, { marginBottom }]}
        contentStyle={[layout.row, styles.contentCard]}
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

          <View style={[layout.flex1, layout.flexEnd, StyleSheet.absoluteFill]}>
            <View style={[styles.ratingBox, layout.center, layout.row]}>
              <Star1 size='16' color='white' variant='Bold' />

              <Text style={styles.ratingText}>
                {getFormattedVoteAverage(this.props.item.voteAverage)}
              </Text>
            </View>
          </View>
        </View>

        <View style={layout.flex1}>
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
              {this.name}
            </Text>

            <Text style={[styles.text, styles.airDate]} numberOfLines={1}>
              {getFormattedFullYear(this.airDate)}
              {' - '}
              {this.props.item.originalLanguage.toUpperCase()}
            </Text>

            {this.props.item.overview && (
              <Text style={[styles.text, styles.overview]} numberOfLines={3}>
                {this.props.item.overview}
              </Text>
            )}
          </View>

          <View style={[layout.flexEnd, StyleSheet.absoluteFill]}>
            <View style={layout.row}>
              <FlatList
                style={styles.genreList}
                horizontal
                keyboardShouldPersistTaps='handled'
                keyExtractor={(_item, index) => index.toString()}
                data={this.genres}
                renderItem={this.renderGenreTagItem}
              />

              <IconButton
                style={styles.navigationIconButton}
                icon={this.renderNavigationIcon}
                onPress={this.props.onPress}
                size={navigationIconSize}
                rippleColor={themeColor.accent.light}
              />
            </View>
          </View>
        </View>

        <View style={[layout.itemsEnd, StyleSheet.absoluteFill]}>
          <View style={styles.mediaTypeBox}>
            <Text style={styles.mediaTypeText}>{this.mediaType}</Text>
          </View>
        </View>
      </Card>
    );
  }
}

export default VideoSearchCardBase;
