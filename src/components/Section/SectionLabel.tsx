import React from 'react';
import { Text } from 'react-native';

import type { SectionLabelProps } from '@shared/types';
import styles from './style';

class SectionLabel extends React.PureComponent<SectionLabelProps> {
  public override render(): React.JSX.Element {
    return (
      <>
        <Text style={styles.sectionLabelName} numberOfLines={1}>
          {this.props.name}
        </Text>

        <Text style={styles.sectionLabelValue}>{this.props.value}</Text>
      </>
    );
  }
}

export default SectionLabel;
