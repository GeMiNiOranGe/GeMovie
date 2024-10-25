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
      <View
        style={[layout.center, styles.imageNotFoundBox, this.props.imageStyle]}
      >
        <ImageIcon color={colors.text.toString()} />
      </View>
    );
  }

  public override render(): React.JSX.Element {
    return (
      <View style={this.props.style}>
        {this.props.imagePath ? (
          <Image
            style={this.props.imageStyle}
            resizeMode={this.props.resizeMode}
            source={{
              uri: URLBuilder.buildImageURL(
                this.props.imageSize,
                this.props.imagePath,
              ),
            }}
          />
        ) : (
          <>
            {this.props.NotFoundComponent
              ? this.props.NotFoundComponent
              : this.renderImageNotFound()}
          </>
        )}
      </View>
    );
  }
}

export default TMDBImage;
