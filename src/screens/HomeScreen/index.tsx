import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from './style';

class HomeScreen extends React.Component {
  render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Home screen</Text>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
