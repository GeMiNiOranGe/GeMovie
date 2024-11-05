import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { EmojiSad } from 'iconsax-react-native';

import { layout } from '@shared/themes';
import { PaginatedResultsListProps } from '@shared/types';
import styles from './style';

class PaginatedResultsList<ItemT = any> extends React.PureComponent<
  PaginatedResultsListProps<ItemT>
> {
  public constructor(props: PaginatedResultsListProps<ItemT>) {
    super(props);

    this.renderListHeader = this.renderListHeader.bind(this);
  }

  private renderListHeader() {
    return (
      <Text style={styles.headerText}>
        {this.props.totalResults} result{this.props.totalResults !== 1 && 's'}
      </Text>
    );
  }

  private renderListFooter() {
    return <ActivityIndicator size='small' />;
  }

  public override render(): React.JSX.Element {
    if (this.props.data && this.props.data.length === 0) {
      return (
        <View style={[layout.flex1, layout.center]}>
          {this.props.listEmptyComponent ? (
            this.props.listEmptyComponent
          ) : (
            <View style={[layout.itemsCenter, styles.noResultsBox]}>
              <View style={styles.iconBox}>
                {this.props.noResultsIcon ? (
                  this.props.noResultsIcon
                ) : (
                  <EmojiSad size='96' color='gray' />
                )}
              </View>

              <Text style={styles.noResultsText}>
                {this.props.noResultsText
                  ? this.props.noResultsText
                  : 'Whoops!'}
              </Text>
              <Text style={styles.noResultsSubtext}>
                {this.props.noResultsSubtext
                  ? this.props.noResultsSubtext
                  : "We couldn't find any results"}
              </Text>
            </View>
          )}
        </View>
      );
    }

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

export default PaginatedResultsList;
