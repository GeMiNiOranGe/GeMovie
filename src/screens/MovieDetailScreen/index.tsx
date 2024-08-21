import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { RootScreenProps } from '@shared/types';
import styles from './style';

class MovieDetailScreen extends React.Component<
  RootScreenProps<'MovieDetailScreen'>
> {
  constructor(props: RootScreenProps<'MovieDetailScreen'>) {
    super(props);
  }

  render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Movie detail screen</Text>
        <Text style={styles.text}>index: {this.props.route.params.index}</Text>
        <Text style={styles.text}>
          Movie id: {this.props.route.params.movieId}
        </Text>
      </SafeAreaView>
    );
  }
}

export default MovieDetailScreen;
