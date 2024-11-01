import React from 'react';
import { FlatList, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { SectionHorizontalListProps } from '@shared/types';
import styles from './style';

class SectionHorizontalList<ItemT = any> extends React.PureComponent<
  SectionHorizontalListProps<ItemT>
> {
  public constructor(props: SectionHorizontalListProps<ItemT>) {
    super(props);

    this.renderListEmpty = this.renderListEmpty.bind(this);
  }

  private renderLoading(): React.JSX.Element {
    return (
      <ActivityIndicator
        style={styles.sectionHorizontalListActivityIndicator}
        size='small'
      />
    );
  }

  private renderListEmpty(): React.JSX.Element {
    return (
      <Text style={styles.sectionHorizontalListNoResultText}>
        {this.props.noResultText ? this.props.noResultText : 'No results'}
      </Text>
    );
  }

  public override render(): React.JSX.Element {
    if (this.props.loading) {
      return this.renderLoading();
    }

    return (
      <FlatList
        contentContainerStyle={styles.sectionHorizontalListContent}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={this.props.keyExtractor}
        ListEmptyComponent={this.renderListEmpty}
        data={this.props.data}
        renderItem={this.props.renderItem}
      />
    );
  }
}

export default SectionHorizontalList;
