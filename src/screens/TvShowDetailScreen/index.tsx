import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { layout } from '@shared/themes';
import styles from './style';

class TvShowDetailScreen extends React.PureComponent {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[styles.container, layout.center]}>
        <Text style={styles.text}>Tv show detail screen</Text>
      </SafeAreaView>
    );
  }
}

export default TvShowDetailScreen;
