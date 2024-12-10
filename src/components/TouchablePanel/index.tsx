import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import type { TouchablePanelProps } from '@shared/types';
import { TMDBImage, TMDBImageBackgroundLinearGradient } from '@components';
import { layout, colors } from '@shared/themes';
import styles from './style';

class TouchablePanel extends React.PureComponent<TouchablePanelProps> {
  public override render(): React.JSX.Element {
    return (
      <View style={layout.row}>
        <TouchableOpacity
          style={[styles.imageBox, this.props.imageContainerStyle]}
          activeOpacity={0.5}
          onPress={this.props.onPress}
        >
          <TMDBImage
            style={this.props.imageStyle}
            resizeMode={this.props.imageResizeMode}
            path={this.props.imagePath}
            size='w300'
          />
        </TouchableOpacity>

        <TMDBImageBackgroundLinearGradient
          path={this.props.backgroundPath}
          size='w300'
          blurRadius={4}
          colors={['transparent', colors.secondary.toString()]}
        >
          <TouchableRipple
            style={[layout.flex1, layout.justifyCenter, styles.nameBox]}
            onPress={this.props.onPress}
            rippleColor={colors.subtext}
          >
            <Text style={styles.name} numberOfLines={2}>
              {this.props.name}
            </Text>
          </TouchableRipple>
        </TMDBImageBackgroundLinearGradient>
      </View>
    );
  }
}

export default TouchablePanel;
