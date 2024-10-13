import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

import SectionDivider from './SectionDivider';
import { layout } from '@shared/themes';
import styles from './style';

export type SectionProps = {
  style?: StyleProp<ViewStyle> | undefined;
  title: string;
  children?: React.ReactNode | undefined;
};

class Section extends React.PureComponent<SectionProps> {
  public static Divider: typeof SectionDivider;

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

export default Section;
