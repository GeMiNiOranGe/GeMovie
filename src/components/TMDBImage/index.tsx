import React from 'react';
import { View, Image } from 'react-native';
import { Image as ImageIcon } from 'iconsax-react-native';

import { URLBuilder } from '@services';
import type { TMDBImageProps } from '@shared/types';
import { colors, layout } from '@shared/themes';
import styles from './style';

class TMDBImage extends React.PureComponent<TMDBImageProps> {
  private renderImageNotFound(): React.JSX.Element {
    return (
      <View style={[layout.center, styles.imageNotFoundBox, this.props.style]}>
        <ImageIcon
          color={colors.text.toString()}
          {...this.props.notFoundIcon}
        />
      </View>
    );
  }

  public override render(): React.JSX.Element {
    if (!this.props.path) {
      return this.props.NotFoundComponent
        ? this.props.NotFoundComponent
        : this.renderImageNotFound();
    }

    return (
      <Image
        style={this.props.style}
        blurRadius={this.props.blurRadius}
        resizeMode={this.props.resizeMode}
        source={{
          uri: URLBuilder.buildImageURL(this.props.size, this.props.path),
        }}
      />
    );
  }
}

export default TMDBImage;
