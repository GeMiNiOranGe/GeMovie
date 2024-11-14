import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { layout } from '@shared/themes';
import styles from './style';

class ReviewDetailScreen extends React.PureComponent {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <Text style={styles.text}>Review detail screen</Text>
      </SafeAreaView>
    );
  }
}

export default ReviewDetailScreen;
