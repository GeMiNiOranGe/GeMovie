import React from 'react';
import { FlatList } from 'react-native';

import { SearchResultsListProps } from '@shared/types';
import styles from './style';

class SearchResultsList<ItemT = any> extends React.PureComponent<
  SearchResultsListProps<ItemT>
> {
  public override render(): React.JSX.Element {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        data={this.props.data}
        renderItem={this.props.renderItem}
      />
    );
  }
}

export default SearchResultsList;
