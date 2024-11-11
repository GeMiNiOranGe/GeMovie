import React from 'react';
import { View, Text } from 'react-native';
import { Star1 } from 'iconsax-react-native';

import type { VoteLabelProps } from '@shared/types';
import { getFormattedVoteAverage } from '@shared/utils';
import { colors, layout } from '@shared/themes';
import styles from './style';

class VoteLabel extends React.PureComponent<VoteLabelProps> {
  public override render(): React.JSX.Element {
    return (
      <View style={[styles.vote, layout.center, layout.row]}>
        <Star1 size='14' color={colors.primary.toString()} variant='Bold' />

        <Text style={styles.value}>
          {getFormattedVoteAverage(this.props.value)}
        </Text>
      </View>
    );
  }
}

export default VoteLabel;
