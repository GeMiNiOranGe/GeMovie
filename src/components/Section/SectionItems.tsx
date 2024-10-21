import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { SectionItemsProps } from '@shared/types';
import styles from './style';

class SectionItems extends React.PureComponent<SectionItemsProps> {
  public override render(): React.JSX.Element {
    return (
      <View style={this.props.style}>
        <Text style={styles.sectionItemName} numberOfLines={1}>
          {this.props.name}
        </Text>

        <FlatList
          contentContainerStyle={styles.sectionItemsContentList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.props.data}
          renderItem={this.props.renderItem}
          keyExtractor={this.props.keyExtractor}
        />
      </View>
    );
  }
}

export default SectionItems;
