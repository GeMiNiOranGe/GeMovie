import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout } from '@shared/themes';
import styles from './style';

class FullScreenLoader extends React.PureComponent {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[layout.flex1, layout.center, styles.container]}>
        <ActivityIndicator color={colors.secondary.toString()} size='large' />
      </SafeAreaView>
    );
  }
}

export default FullScreenLoader;
