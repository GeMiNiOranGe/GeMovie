import React from 'react';
import { View, Text } from 'react-native';

import SectionDivider from './SectionDivider';
import SectionLabel from './SectionLabel';
import SectionItem from './SectionItem';
import { layout } from '@shared/themes';
import type { SectionProps } from '@shared/types';
import styles from './style';

class Section extends React.PureComponent<SectionProps> {
  public static Divider: typeof SectionDivider;
  public static Label: typeof SectionLabel;
  public static Item: typeof SectionItem;

  public override render(): React.JSX.Element {
    return (
      <View style={[styles.section, this.props.style]}>
        <View style={[layout.row, styles.titleBox]}>
          <View style={styles.accent} />

          <Text style={styles.title} numberOfLines={1}>
            {this.props.title}
          </Text>
        </View>

        <>{this.props.children}</>
      </View>
    );
  }
}

Section.Divider = SectionDivider;
Section.Label = SectionLabel;
Section.Item = SectionItem;

export default Section;
