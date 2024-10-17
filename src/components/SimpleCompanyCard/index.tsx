import React from 'react';
import { View, Text, Image } from 'react-native';
import { Image as ImageIcon } from 'iconsax-react-native';
import { TouchableRipple } from 'react-native-paper';

import { URLBuilder } from '@services';
import { layout, themeColor } from '@shared/themes';
import type { CompanyElement, SimpleCardProps } from '@shared/types';
import styles from './style';
import { spacing } from '@shared/constants';

class SimpleCompanyCard extends React.PureComponent<
  SimpleCardProps<CompanyElement>
> {
  public override render(): React.JSX.Element {
    const marginRight =
      this.props.index === (this.props.listLength || 0) - 1 ? 0 : spacing.large;

    return (
      <TouchableRipple
        borderless
        style={[styles.card, { marginRight }]}
        onPress={this.props.onPress}
      >
        <>
          <View style={[layout.flex1, layout.center, styles.imageBox]}>
            {this.props.item.logoPath ? (
              <Image
                style={styles.image}
                resizeMode='contain'
                source={{
                  uri: URLBuilder.buildImageURL(
                    'w154',
                    this.props.item.logoPath,
                  ),
                }}
              />
            ) : (
              <ImageIcon size='28' color={themeColor.text.toString()} />
            )}
          </View>

          <View style={styles.nameBox}>
            <Text style={styles.name} numberOfLines={2}>
              {`${this.props.item.name}\n`}
            </Text>
          </View>
        </>
      </TouchableRipple>
    );
  }
}

export default SimpleCompanyCard;
