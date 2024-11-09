import React from 'react';
import { Image, Text, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { ArrowRight2, User } from 'iconsax-react-native';

import { URLBuilder } from '@services';
import { spacing } from '@shared/constants';
import { layout, colors } from '@shared/themes';
import { getFormattedGender, isMovieElement } from '@shared/utils';
import type { PersonElement, DetailCardProps } from '@shared/types';
import styles from './style';

const navigationIconSize = 20;

class PersonDetailCard extends React.PureComponent<
  DetailCardProps<PersonElement>
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
          {this.props.item.profilePath ? (
            <Image
              style={styles.image}
              source={{
                uri: URLBuilder.buildImageURL(
                  'w185',
                  this.props.item.profilePath,
                ),
              }}
            />
          ) : (
            <User size='32' color='black' />
          )}
        </View>

        <View style={[layout.flex1, styles.content]}>
          <Text style={styles.title} numberOfLines={1}>
            {this.props.item.name}
          </Text>

          <Text
            style={[styles.text, styles.knownForDepartment]}
            numberOfLines={1}
          >
            {this.props.item.knownForDepartment}
            <Text style={styles.subtext}>
              {' - '}
              {getFormattedGender(this.props.item.gender)}
            </Text>
          </Text>

          {this.props.item.knownFor.length > 0 && (
            <View style={[layout.row, styles.knownFor]}>
              <View style={styles.filmNameBox}>
                <Text style={styles.subtext} numberOfLines={2}>
                  {isMovieElement(this.props.item.knownFor[0])
                    ? this.props.item.knownFor[0].title
                    : this.props.item.knownFor[0]?.name}
                </Text>
              </View>

              <View style={layout.justifyCenter}>
                <Text style={styles.subtext}>
                  {this.props.item.knownFor.length - 1 > 0 &&
                    ` + ${this.props.item.knownFor.length - 1} more`}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={[layout.justifyCenter, layout.itemsEnd]}>
          <IconButton
            style={styles.navigationIconButton}
            icon={this.renderNavigationIcon}
            onPress={this.props.onPress}
            size={navigationIconSize}
            rippleColor={colors.accent.light}
          />
        </View>
      </Card>
    );
  }
}

export default PersonDetailCard;
