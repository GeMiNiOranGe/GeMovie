import React from 'react';
import { Text, View, type ListRenderItemInfo } from 'react-native';

import type {
  ImageDimensions,
  MediaImage,
  PhotoProps,
  PhotoState,
} from '@shared/types';
import { Section, TMDBImage } from '@components';
import { APIHandler, URLBuilder } from '@services';
import { calculateImageDimensions, toImages } from '@shared/utils';
import { spacing } from '@shared/constants';
import styles from './style';
import { ActivityIndicator } from 'react-native-paper';

const getMinDimension = (
  previousValue: ImageDimensions,
  currentValue: ImageDimensions,
) => ({
  width: Math.min(previousValue.width, currentValue.width),
  height: Math.min(previousValue.height, currentValue.height),
});

class Photo extends React.PureComponent<PhotoProps, PhotoState> {
  private backdropDimensions: ImageDimensions;
  private posterDimensions: ImageDimensions;

  public constructor(props: PhotoProps) {
    super(props);
    this.state = {
      images: undefined,
      isFetching: true,
      error: undefined,
    };

    this.backdropDimensions = calculateImageDimensions(240, 16, 9);
    this.posterDimensions = calculateImageDimensions(120, 2, 3);

    this.renderBackdropItem = this.renderBackdropItem.bind(this);
    this.renderPosterItem = this.renderPosterItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    try {
      const url = URLBuilder.buildImagesURL('movie', this.props.id);
      const json = await APIHandler.fetchJSON(url);
      const images = toImages(json);

      this.backdropDimensions = images.backdrops.reduce(getMinDimension, {
        width: this.backdropDimensions.width,
        height: this.backdropDimensions.height,
      });

      this.posterDimensions = images.posters.reduce(getMinDimension, {
        width: this.posterDimensions.width,
        height: this.posterDimensions.height,
      });

      this.setState({ images, isFetching: false });
    } catch (error: unknown) {
      this.setState({ error: error as Error });
    }
  }

  public renderBackdropItem({ item, index }: ListRenderItemInfo<MediaImage>) {
    const marginRight: number =
      index === (this.state.images?.backdrops.length || 0) - 1
        ? 0
        : spacing.small;

    return (
      <View style={{ marginRight }}>
        <TMDBImage
          style={this.backdropDimensions}
          path={item.filePath}
          size='w300'
        />
      </View>
    );
  }

  public renderPosterItem({ item, index }: ListRenderItemInfo<MediaImage>) {
    const marginRight: number =
      index === (this.state.images?.posters.length || 0) - 1
        ? 0
        : spacing.small;

    return (
      <View style={{ marginRight }}>
        <TMDBImage
          style={this.posterDimensions}
          path={item.filePath}
          size='w185'
        />
      </View>
    );
  }

  private renderLoading(): React.JSX.Element {
    return <ActivityIndicator style={styles.activityIndicator} size='small' />;
  }

  private renderListEmpty(): React.JSX.Element {
    return <Text style={styles.noResultText}>No image found</Text>;
  }

  public override render(): React.JSX.Element {
    if (this.state.isFetching) {
      return this.renderLoading();
    }

    if (!this.state.images) {
      return this.renderListEmpty();
    }

    if (this.state.error) {
      return (
        <Section.Content>
          <Section.Label
            name={this.state.error.name}
            value={this.state.error.message}
          />
        </Section.Content>
      );
    }

    // TODO: if navigation to another screen (add 'see all' button),
    // revert to use `Section.HorizontalList`
    return (
      <Section.Content>
        <Section.Items
          name='Backdrop'
          data={this.state.images?.backdrops}
          renderItem={this.renderBackdropItem}
        />

        <Section.Divider />

        <Section.Items
          name='Poster'
          data={this.state.images?.posters}
          renderItem={this.renderPosterItem}
        />
      </Section.Content>
    );
  }
}

export default Photo;
