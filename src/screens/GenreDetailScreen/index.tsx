import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import { layout } from '@shared/themes';
import styles from './style';
import { RootScreenProps } from '@shared/types';

class GenreDetailScreen extends React.PureComponent<
  RootScreenProps<'GenreDetailScreen'>
> {
  public override componentDidMount(): void {
    this.props.navigation.setOptions({
      title: this.props.route.params.genre.name,
    });
  }
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={layout.flex1}>
        <View style={[layout.flex1, layout.center]}>
          <Text style={styles.text}>{this.props.route.params.genre.name}</Text>
          <Text style={styles.subtext}>{this.props.route.params.type}</Text>
          <Text style={styles.subtext}>{this.props.route.params.genre.id}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default GenreDetailScreen;
