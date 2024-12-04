import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootScreenProps } from '@shared/types';
import { layout } from '@shared/themes';
import styles from './style';

class EpisodeDetailScreen extends React.PureComponent<
  RootScreenProps<'EpisodeDetailScreen'>
> {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <View style={[layout.flex1, layout.center]}>
          <Text style={styles.text}>{this.props.route.params.tvShowId}</Text>
          <Text style={styles.text}>
            {this.props.route.params.seasonNumber}
          </Text>
          <Text style={styles.text}>
            {this.props.route.params.episodeNumber}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default EpisodeDetailScreen;
