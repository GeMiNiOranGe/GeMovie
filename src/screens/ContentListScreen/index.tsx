import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { layout } from '@shared/themes';
import styles from './style';

class ContentListScreen extends React.PureComponent {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[layout.flex1, layout.center]}>
        <Text style={styles.text}>Content list screen</Text>
      </SafeAreaView>
    );
  }
}

export default ContentListScreen;
