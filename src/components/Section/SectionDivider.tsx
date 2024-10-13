import React from 'react';
import { View } from 'react-native';

import { layout } from '@shared/themes';
import styles from './style';

class SectionDivider extends React.PureComponent {
  public override render(): React.JSX.Element {
    return <View style={[layout.flex1, styles.sectionDivider]} />;
  }
}

export default SectionDivider;
