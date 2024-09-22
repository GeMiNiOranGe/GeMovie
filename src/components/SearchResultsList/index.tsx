import React from 'react';
import { FlatList, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { SearchResultsListProps } from '@shared/types';
import styles from './style';

class SearchResultsList<ItemT = any> extends React.PureComponent<
  SearchResultsListProps<ItemT>
> {
  public constructor(props: SearchResultsListProps<ItemT>) {
    super(props);

    this.renderListHeader = this.renderListHeader.bind(this);
  }

  private renderListHeader() {
    return (
      <Text style={styles.headerText}>
        {this.props.totalResults} result{this.props.totalResults !== 1 && 's'}{' '}
        found
      </Text>
    );
  }

  private renderListFooter() {
    return <ActivityIndicator size='small' />;
  }

  public override render(): React.JSX.Element {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        keyExtractor={this.props.keyExtractor}
        onEndReached={this.props.onEndReached}
        ListHeaderComponent={
          this.props.totalResults ? this.renderListHeader : null
        }
        ListHeaderComponentStyle={styles.header}
        ListFooterComponent={
          this.props.isFooterLoading ? this.renderListFooter : null
        }
        ListFooterComponentStyle={styles.footer}
        data={this.props.data}
        renderItem={this.props.renderItem}
      />
    );
  }
}

export default SearchResultsList;
