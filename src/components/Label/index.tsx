import React from 'react';
import { Text, View } from 'react-native';

import { LabelProps } from '@shared/types';
import styles from './style';

class Label extends React.Component<LabelProps> {
  public constructor(props: LabelProps) {
    super(props);
  }

  public override render(): React.JSX.Element {
    return (
      <View style={styles.container}>
        {this.props.icon ? (
          <View style={styles.icon}>{this.props.icon}</View>
        ) : (
          <Text style={styles.text}>{this.props.name}</Text>
        )}
        <Text style={styles.text}>{this.props.value}</Text>
      </View>
    );
  }
}

export default Label;
