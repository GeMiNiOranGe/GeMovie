import React from 'react';
import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type { TMDBImageBackgroundLinearGradientProps } from '@shared/types';
import { URLBuilder } from '@services';
import { layout } from '@shared/themes';

class TMDBImageBackgroundLinearGradient extends React.PureComponent<TMDBImageBackgroundLinearGradientProps> {
  public override render(): React.JSX.Element {
    return (
      <ImageBackground
        style={layout.flex1}
        blurRadius={this.props.blurRadius}
        source={{
          uri: URLBuilder.buildImageURL(this.props.size, this.props.path),
        }}
      >
        <LinearGradient
          style={[layout.flex1, this.props.contentContainerStyle]}
          start={this.props.start}
          end={this.props.end}
          colors={this.props.colors}
        >
          {this.props.children}
        </LinearGradient>
      </ImageBackground>
    );
  }
}

export default TMDBImageBackgroundLinearGradient;
