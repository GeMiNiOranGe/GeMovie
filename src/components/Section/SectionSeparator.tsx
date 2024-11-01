import React from 'react';
import { View } from 'react-native';

import styles from './style';

class SectionSeparator extends React.PureComponent {
  public override render(): React.JSX.Element {
    return <View style={styles.sectionSeparator} />;
  }
}

export default SectionSeparator;
