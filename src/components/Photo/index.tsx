import React from 'react';
import { View, type ListRenderItemInfo } from 'react-native';

import type { MediaImage, PhotoProps, PhotoState } from '@shared/types';
import { Section, TMDBImage } from '@components';
import { APIHandler, URLBuilder } from '@services';
import { toImages } from '@shared/utils';
import { spacing } from '@shared/constants';
import styles from './style';

class Photo extends React.PureComponent<PhotoProps, PhotoState> {
  public constructor(props: PhotoProps) {
    super(props);
    this.state = {
      images: undefined,
      isFetching: true,
      error: undefined,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    try {
      const url = URLBuilder.buildImagesURL('movie', this.props.id);
      const json = await APIHandler.fetchJSON(url);
      const images = toImages(json);

      this.setState({ images, isFetching: false });
    } catch (error: unknown) {
      this.setState({ error: error as Error });
    }
  }

  public renderItem({ item, index }: ListRenderItemInfo<MediaImage>) {
    const marginRight: number =
      index === (this.state.images?.backdrops.length || 0) - 1
        ? 0
        : spacing.small;

    return (
      <View style={{ marginRight }}>
        <TMDBImage style={styles.image} path={item.filePath} size='w300' />
      </View>
    );
  }

  public override render(): React.JSX.Element {
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

    return (
      <Section.HorizontalList
        loading={this.state.isFetching}
        noResultText='No recommendations available.'
        data={this.state.images?.backdrops}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Photo;
