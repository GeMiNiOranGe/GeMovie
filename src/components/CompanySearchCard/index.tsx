import React from 'react';
import { Text, View } from 'react-native';

import { CompanySearchCardProps } from '@shared/types';
import styles from './style';

class CompanySearchCard extends React.PureComponent<CompanySearchCardProps> {
  public override render(): React.JSX.Element {
    return (
      <View>
        <Text style={styles.text}>{this.props.item.id}</Text>
        <Text style={styles.text}>{this.props.item.name}</Text>
        <Text style={styles.text}>{this.props.item.logoPath}</Text>
        <Text style={styles.text}>{this.props.item.originCountry}</Text>
        <Text style={styles.text}>{this.props.index}</Text>
      </View>
    );
  }
}

export default CompanySearchCard;
