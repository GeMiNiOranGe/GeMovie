import React from 'react';
import { Image, Text, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { ArrowRight2, Image as ImageIcon } from 'iconsax-react-native';

import { URLBuilder } from '@services';
import { layout } from '@shared/themes';
import { spacing } from '@shared/constants';
import type { CompanyElement, SearchCardProps } from '@shared/types';
import styles from './style';

class CompanySearchCard extends React.PureComponent<
  SearchCardProps<CompanyElement>
> {
  private renderNavigationIcon() {
    return <ArrowRight2 size={24} color='black' />;
  }

  public override render(): React.JSX.Element {
    const marginBottom: number =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.small;

    return (
      <Card
        style={[styles.card, { marginBottom }]}
        contentStyle={layout.row}
        onPress={this.props.onPress}
      >
        {this.props.item.logoPath ? (
          <Image
            style={styles.image}
            resizeMode='contain'
            source={{
              uri: URLBuilder.buildImageURL('w92', this.props.item.logoPath),
            }}
          />
        ) : (
          <View style={[styles.image, styles.notFoundImage, layout.center]}>
            <ImageIcon size='32' color='black' />
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
