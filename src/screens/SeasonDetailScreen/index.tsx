import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import type { RootScreenProps } from '@shared/types';
import { layout } from '@shared/themes';
import styles from './style';

class SeasonDetailScreen extends React.PureComponent<
  RootScreenProps<'SeasonDetailScreen'>
> {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <View style={[layout.flex1, layout.center]}>
          <Text style={styles.text}>Season detail screen</Text>
          <Text style={styles.text}>{this.props.route.params.tvShowId}</Text>
          <Text style={styles.text}>
            {this.props.route.params.seasonNumber}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default SeasonDetailScreen;
