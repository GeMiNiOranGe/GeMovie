import React from 'react';
import { Text } from 'react-native';

import type { SectionItemProps } from '@shared/types';
import styles from './style';

class SectionItem extends React.PureComponent<SectionItemProps> {
  public override render(): React.JSX.Element {
    return (
      <>
        <Text style={styles.sectionItemName} numberOfLines={1}>
          {this.props.name}
        </Text>

        {this.props.children}
      </>
    );
  }
}

export default SectionItem;
