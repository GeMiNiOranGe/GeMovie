import React from 'react';
import { Text } from 'react-native';
import { SearchNormal1 } from 'iconsax-react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootScreenProps } from '@shared/types';
import { colors } from '@shared/themes';
import styles from './style';

const searchIconSize = 24;

class SearchSuggestionScreen extends React.Component<
  RootScreenProps<'SearchSuggestionScreen'>
> {
  public constructor(props: RootScreenProps<'SearchSuggestionScreen'>) {
    super(props);

    this.renderHeaderRight = this.renderHeaderRight.bind(this);
  }

  private renderSearchIcon() {
    return (
      <SearchNormal1 size={searchIconSize} color={colors.text.toString()} />
    );
  }

  private renderHeaderRight() {
    return (
      <IconButton
        style={styles.searchIconButton}
        icon={this.renderSearchIcon}
        size={searchIconSize}
        onPress={() => this.props.navigation.navigate('SearchScreen')}
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
