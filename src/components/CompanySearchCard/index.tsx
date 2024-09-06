import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Card } from '@rneui/themed';

import { imageSize } from '@shared/constants';
import { TMDB_BASE_IMAGE_URL } from '@config';
import { CompanySearchCardProps } from '@shared/types';
import styles from './style';

class CompanySearchCard extends React.PureComponent<CompanySearchCardProps> {
  public override render(): React.JSX.Element {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
          <Card.Image
            style={styles.image}
            resizeMode='contain'
            source={{
              uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w92}${this.props.item.logoPath}`,
            }}
          />

          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {this.props.item.name}
            </Text>
            <Text style={styles.text}>
              Country: {this.props.item.originCountry}
            </Text>
          </View>

          <View style={styles.forwardButton}>
            <TouchableOpacity onPress={this.props.onPress}>
              <Text style={{ color: 'black', fontSize: 32 }}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

export default CompanySearchCard;
