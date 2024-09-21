import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { layout } from '@shared/themes';
import styles from './style';

class CollectionDetailScreen extends React.PureComponent {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[styles.container, layout.center]}>
        <Text style={styles.text}>Collection detail screen</Text>
      </SafeAreaView>
    );
  }
}

export default CollectionDetailScreen;
