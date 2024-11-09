import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';

import type { CompactCardProps, PersonElement } from '@shared/types';
import { TMDBImage } from '@components';
import { spacing } from '@shared/constants';
import { getFormattedGender } from '@shared/utils';
import styles from './style';

class CompactPersonCard extends React.PureComponent<
  CompactCardProps<PersonElement>
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

export default CompactPersonCard;
