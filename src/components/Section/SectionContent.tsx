import React from 'react';
import { View } from 'react-native';

import type { SectionContentProps } from '@shared/types';
import styles from './style';

class SectionContent extends React.PureComponent<SectionContentProps> {
  public override render(): React.JSX.Element {
    return <View style={styles.sectionContent}>{this.props.children}</View>;
  }
}

export default SectionContent;
