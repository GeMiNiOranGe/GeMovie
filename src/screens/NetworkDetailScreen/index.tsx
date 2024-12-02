import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import type { RootScreenProps } from '@shared/types';
import { layout } from '@shared/themes';
import styles from './style';

class NetworkDetailScreen extends React.PureComponent<
  RootScreenProps<'NetworkDetailScreen'>
> {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <View>
          <Text style={styles.text}>Network detail screen</Text>
          <Text style={styles.subtext}>
            {this.props.route.params.networkId}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default NetworkDetailScreen;
