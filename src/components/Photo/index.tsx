import React from 'react';
import { Text, View, type ListRenderItemInfo } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import type {
  DetailsSectionProps,
  DetailsSectionState,
  ImageDimensions,
  Images,
  MediaImage,
} from '@shared/types';
import { Section, TMDBImage } from '@components';
import { VideoService } from '@services';
import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import styles from './style';

function getMinDimension(
  previousValue: ImageDimensions,
  currentValue: ImageDimensions,
): ImageDimensions {
  return {
    width: Math.min(previousValue.width, currentValue.width),
    height: Math.min(previousValue.height, currentValue.height),
  };
}

class Photo extends React.PureComponent<
  DetailsSectionProps,
  DetailsSectionState<Images | undefined>
> {
  private backdropDimensions: ImageDimensions;
  private posterDimensions: ImageDimensions;

  public constructor(props: DetailsSectionProps) {
    super(props);
    this.state = {
      results: undefined,
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
      const results = await VideoService.getImagesAsync(
        this.props.type,
        this.props.id,
      );

      this.backdropDimensions = results.backdrops.reduce(getMinDimension, {
        width: this.backdropDimensions.width,
        height: this.backdropDimensions.height,
      });

      this.posterDimensions = results.posters.reduce(getMinDimension, {
        width: this.posterDimensions.width,
        height: this.posterDimensions.height,
      });

      this.setState({ results, isFetching: false });
    } catch (error: unknown) {
      this.setState({ error: error as Error });
    }
  }

  public renderBackdropItem({
    item,
    index,
  }: ListRenderItemInfo<MediaImage>): React.JSX.Element {
    const marginRight: number =
      index === (this.state.results?.backdrops.length || 0) - 1
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

  public renderPosterItem({
    item,
    index,
  }: ListRenderItemInfo<MediaImage>): React.JSX.Element {
    const marginRight: number =
      index === (this.state.results?.posters.length || 0) - 1
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

    if (!this.state.results) {
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
          data={this.state.results?.backdrops}
          renderItem={this.renderBackdropItem}
        />

        <Section.Divider />

        <Section.Items
          name='Poster'
          data={this.state.results?.posters}
          renderItem={this.renderPosterItem}
        />
      </Section.Content>
    );
  }
}

export default Photo;
