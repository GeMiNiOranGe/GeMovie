import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import type { CompactCardProps, PersonElementBase } from '@shared/types';
import { RankText, TMDBImage } from '@components';
import { spacing } from '@shared/constants';
import { getFormattedGender } from '@shared/utils';
import { layout } from '@shared/themes';
import styles from './style';

class CompactPersonRankCard extends React.PureComponent<
  CompactCardProps<PersonElementBase>
> {
  public override render(): React.JSX.Element {
    const marginRight =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    return (
      <Card style={[styles.card, { marginRight }]} onPress={this.props.onPress}>
        <View style={styles.profileBox}>
          <TMDBImage
            style={styles.profile}
            path={this.props.item.profilePath}
            size='w185'
          />

          <View
            style={[
              layout.justifyEnd,
              layout.itemsStart,
              StyleSheet.absoluteFill,
            ]}
          >
            <View style={styles.rankBox}>
              <RankText text={(this.props.index + 1).toString()} />
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.text} numberOfLines={2}>
            {this.props.item.name}
            {'\n'}
          </Text>

          <Text style={styles.text} numberOfLines={1}>
            {this.props.item.knownForDepartment}
            <Text style={styles.subtext}>
              {' - '}
              {getFormattedGender(this.props.item.gender)}
            </Text>
          </Text>
        </View>
      </Card>
    );
  }
}

export default CompactPersonRankCard;
