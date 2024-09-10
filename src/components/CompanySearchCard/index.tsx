import React from 'react';
import { Image, Text, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { ArrowRight2, PictureFrame } from 'iconsax-react-native';

import { layout } from '@shared/themes';
import { imageSize } from '@shared/constants';
import { TMDB_BASE_IMAGE_URL } from '@config';
import { CompanySearchCardProps } from '@shared/types';
import styles from './style';

class CompanySearchCard extends React.PureComponent<CompanySearchCardProps> {
  private renderNavigationIcon() {
    return <ArrowRight2 size={24} color='black' />;
  }

  public override render(): React.JSX.Element {
    return (
      <Card
        style={styles.card}
        contentStyle={layout.row}
        onPress={this.props.onPress}
      >
        {this.props.item.logoPath ? (
          <Image
            style={styles.image}
            resizeMode='contain'
            source={{
              uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w92}${this.props.item.logoPath}`,
            }}
          />
        ) : (
          <View style={[styles.image, layout.center]}>
            <PictureFrame size='48' color='black' />
          </View>
        )}

        <View style={[layout.flex1, layout.spaceBetweenRow]}>
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {this.props.item.name}
            </Text>
            <Text style={styles.text}>
              Country: {this.props.item.originCountry || 'Unknown'}
            </Text>
          </View>

          <View style={styles.navigationBox}>
            <IconButton
              style={styles.navigationIconButton}
              icon={this.renderNavigationIcon}
              onPress={this.props.onPress}
            />
          </View>
        </View>
      </Card>
    );
  }
}

export default CompanySearchCard;
