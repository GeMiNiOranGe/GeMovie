import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import { HorizontalImageCardProps } from '@shared/types';
import styles from './style';

class HorizontalImageCard extends React.Component<HorizontalImageCardProps> {
  constructor(props: HorizontalImageCardProps) {
    super(props);
  }

  render(): React.JSX.Element {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'pink'}
        onPress={() => this.props.onPress(this.props.index)}
      >
        <View>
          <Text style={styles.title}>Title: {this.props.item.title}</Text>
          <Text style={styles.subtitle}>Id: {this.props.item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default HorizontalImageCard;
