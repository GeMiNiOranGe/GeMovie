import React from 'react';
import { TextInput, View } from 'react-native';

import { SearchBarProps } from '@shared/types';
import styles from './style';

class SearchBar extends React.Component<SearchBarProps> {
  public override render(): React.JSX.Element {
    return (
      <View>
        <TextInput
          style={[styles.searchField, this.props.style]}
          placeholder={
            this.props.placeholder ? this.props.placeholder : 'Search'
          }
          placeholderTextColor={this.props.placeholderTextColor}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          autoFocus={this.props.autoFocus}
        />
      </View>
    );
  }
}

export default SearchBar;
