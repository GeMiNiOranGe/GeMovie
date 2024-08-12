import React from 'react';
import { SafeAreaView, Text, TouchableHighlight } from 'react-native';

import type { SearchScreenProps } from '@shared/types';
import styles from './style';

class SearchScreen extends React.Component<SearchScreenProps> {
  render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Search screen</Text>

        <TouchableHighlight
          underlayColor={'pink'}
          onPress={() => this.props.navigation.navigate('MovieDetailScreen')}
        >
          <Text style={styles.btnText}>Go to detail</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
