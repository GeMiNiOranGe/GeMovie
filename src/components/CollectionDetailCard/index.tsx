import React from 'react';
import { Image, Text, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { ArrowRight2, Image as ImageIcon } from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';

import { layout, colors } from '@shared/themes';
import { URLBuilder } from '@services';
import { spacing } from '@shared/constants';
import type { CollectionElement, DetailCardProps } from '@shared/types';
import styles from './style';

const navigationIconSize = 20;

class CollectionDetailCard extends React.PureComponent<
  DetailCardProps<CollectionElement>
> {
  private renderNavigationIcon() {
    return (
      <ArrowRight2 size={navigationIconSize} color='white' variant='Bold' />
    );
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
        <View style={[layout.center, styles.image, styles.imageBox]}>
          {this.props.item.posterPath ? (
            <Image
              style={styles.image}
              source={{
                uri: URLBuilder.buildImageURL(
                  'w185',
                  this.props.item.posterPath,
                ),
              }}
            />
          ) : (
            <ImageIcon size='48' color='black' />
          )}
        </View>

        <View style={layout.flex1}>
          {this.props.item.backdropPath ? (
            <Image
              style={styles.backdropImage}
              blurRadius={2}
              source={{
                uri: URLBuilder.buildImageURL(
                  'w300',
                  this.props.item.backdropPath,
                ),
              }}
            />
          ) : (
            <View
              style={[layout.flex1, layout.itemsCenter, styles.backdropBox]}
            >
              <View style={layout.row}>
                <ImageIcon size='16' color='black' />

                <Text style={styles.backdropText}>Backdrop not found</Text>
              </View>
            </View>
          )}

          <View style={layout.flex1}>
            <LinearGradient
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['transparent', colors.primary.toString()]}
            />

            <View style={[layout.flex1, styles.contentBox]}>
              <Text style={styles.title} numberOfLines={2}>
                {this.props.item.name}
                {'\n'}
              </Text>

              <View style={[layout.flex1, layout.spaceBetweenRow]}>
                <Text style={[layout.flex1, styles.text]} numberOfLines={3}>
                  {this.props.item.overview}
                </Text>

                <View style={[layout.justifyCenter, layout.itemsEnd]}>
                  <IconButton
                    style={styles.navigationIconButton}
                    icon={this.renderNavigationIcon}
                    onPress={this.props.onPress}
                    size={navigationIconSize}
                    rippleColor={colors.accent.light}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}

export default CollectionDetailCard;
