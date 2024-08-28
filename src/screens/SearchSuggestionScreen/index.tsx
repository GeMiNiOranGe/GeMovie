import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

import { RootScreenProps } from '@shared/types';
import styles from './style';

class SearchSuggestionScreen extends React.Component<
  RootScreenProps<'SearchSuggestionScreen'>
> {
  public constructor(props: RootScreenProps<'SearchSuggestionScreen'>) {
    super(props);

    this.renderHeaderRight = this.renderHeaderRight.bind(this);
  }

  private renderHeaderRight() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('SearchScreen')}
        title='Search'
      />
    );
  }

  public override componentDidMount(): void {
    this.props.navigation.setOptions({
      headerRight: this.renderHeaderRight,
    });
  }

  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Search suggestion screen</Text>
      </SafeAreaView>
    );
  }
}

export default SearchSuggestionScreen;
