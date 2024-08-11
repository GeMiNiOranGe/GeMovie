import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from './style';

class SearchScreen extends React.Component {
  render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Search screen</Text>
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
