import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { RootScreenProps } from '@shared/types';
import styles from './style';

class CompanyDetailScreen extends React.Component<
  RootScreenProps<'CompanyDetailScreen'>
> {
  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Company detail screen</Text>
      </SafeAreaView>
    );
  }
}

export default CompanyDetailScreen;
