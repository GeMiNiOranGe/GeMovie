import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

import type { CollectionSearchCardProps } from '@shared/types';
import styles from './style';

class CollectionSearchCard extends React.PureComponent<CollectionSearchCardProps> {
  public override render(): React.JSX.Element {
    return (
      <Card style={styles.container} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.item.name}</Text>
        <Text style={styles.text}>{this.props.item.id}</Text>
      </Card>
    );
  }
}

export default CollectionSearchCard;
