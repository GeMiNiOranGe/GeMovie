import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowRight2 } from 'iconsax-react-native';

import SectionSeparator from './SectionSeparator';
import SectionDivider from './SectionDivider';
import SectionContent from './SectionContent';
import SectionLabel from './SectionLabel';
import SectionItem from './SectionItem';
import SectionItems from './SectionItems';
import SectionHorizontalList from './SectionHorizontalList';
import { colors, layout } from '@shared/themes';
import type { SectionProps } from '@shared/types';
import styles from './style';

class Section extends React.PureComponent<SectionProps> {
  public static Separator: typeof SectionSeparator;
  public static Divider: typeof SectionDivider;
  public static Content: typeof SectionContent;
  public static Label: typeof SectionLabel;
  public static Item: typeof SectionItem;
  public static Items: typeof SectionItems;
  public static HorizontalList: typeof SectionHorizontalList;

  public override render(): React.JSX.Element {
    return (
      <View style={[styles.section, this.props.style]}>
        <View style={styles.titleBox}>
          <View style={layout.row}>
            <View style={styles.accent} />

            {this.props.moreButtonText ? (
              <View
                style={[
                  layout.flex1,
                  layout.spaceBetweenRow,
                  layout.itemsCenter,
                ]}
              >
                <Text style={[layout.flex1, styles.title]} numberOfLines={1}>
                  {this.props.title}
                </Text>

                <TouchableOpacity
                  style={[layout.row, layout.itemsCenter, styles.moreButton]}
                  onPress={this.props.onMoreButtonPress}
                >
                  <Text style={styles.moreButtonText}>
                    {this.props.moreButtonText}
                  </Text>

                  <ArrowRight2
                    size='14'
                    color={colors.accent.light.toString()}
                    variant='Bold'
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={[layout.flex1, styles.title]} numberOfLines={1}>
                {this.props.title}
              </Text>
            )}
          </View>

          {this.props.subtitle && (
            <Text style={styles.subtitle}>{this.props.subtitle}</Text>
          )}
        </View>

        <>{this.props.children}</>
      </View>
    );
  }
}

Section.Separator = SectionSeparator;
Section.Divider = SectionDivider;
Section.Content = SectionContent;
Section.Label = SectionLabel;
Section.Item = SectionItem;
Section.Items = SectionItems;
Section.HorizontalList = SectionHorizontalList;

export default Section;
