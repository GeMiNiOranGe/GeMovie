import React from 'react';
import { View, Text } from 'react-native';

import type { BoxProps } from '@shared/types';
import styles from './style';

class Box extends React.PureComponent<BoxProps> {
  public override render(): React.JSX.Element {
    return (
      <View style={[styles.box, this.props.style]}>
        <Text style={styles.title}>{this.props.title}</Text>

        <View style={this.props.contentContainerStyle}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default Box;
