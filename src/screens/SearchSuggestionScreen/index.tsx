import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@assets/icons';
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
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('SearchScreen')}
      >
        <Text>
          <Ionicons.SearchIcon size={24} color='black' />;
        </Text>
      </TouchableOpacity>
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
