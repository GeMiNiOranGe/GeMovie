import React from 'react';
import { Text, View } from 'react-native';

import type { SectionItemProps } from '@shared/types';
import styles from './style';

class SectionItem extends React.PureComponent<SectionItemProps> {
  public override render(): React.JSX.Element {
    return (
      <View style={this.props.style}>
        <Text style={styles.sectionItemName} numberOfLines={1}>
          {this.props.name}
        </Text>

        {this.props.children}
      </View>
    );
  }
}

export default SectionItem;
