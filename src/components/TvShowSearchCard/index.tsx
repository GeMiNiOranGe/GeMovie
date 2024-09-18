import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

import { TvShowSearchCardProps } from '@shared/types';
import styles from './style';

class TvShowSearchCard extends React.PureComponent<TvShowSearchCardProps> {
  public override render(): React.JSX.Element {
    return (
      <Card style={styles.container}>
        <Text style={styles.text}>{this.props.item.name}</Text>
        <Text style={styles.text}>{this.props.item.id}</Text>
      </Card>
    );
  }
}

export default TvShowSearchCard;
