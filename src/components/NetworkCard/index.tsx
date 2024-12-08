import React from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import type { CardBaseProps, NetworkElement } from '@shared/types';
import { TMDBImage } from '@components';
import { spacing } from '@shared/constants';
import styles from './style';

class NetworkCard extends React.PureComponent<CardBaseProps<NetworkElement>> {
  public override render(): React.JSX.Element {
    const marginRight =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    return (
      <TouchableRipple
        borderless
        style={[styles.card, { marginRight }]}
        onPress={this.props.onPress}
      >
        <>
          <View style={styles.logoBox}>
            <TMDBImage
              style={styles.logo}
              resizeMode='contain'
              size='w154'
              path={this.props.item.logoPath}
              notFoundIcon={{ size: '24' }}
            />
          </View>

          <View style={styles.nameBox}>
            <Text style={styles.name} numberOfLines={2}>
              {`${this.props.item.name}\n`}
            </Text>

            <Text style={styles.country} numberOfLines={1}>
              {this.props.item.originCountry}
            </Text>
          </View>
        </>
      </TouchableRipple>
    );
  }
}

export default NetworkCard;
