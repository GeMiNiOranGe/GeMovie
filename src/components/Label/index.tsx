import React from 'react';
import { Text, View } from 'react-native';

import { LabelProps } from '@shared/types';
import { layout } from '@shared/themes';
import styles from './style';

class Label extends React.PureComponent<LabelProps> {
  public override render(): React.JSX.Element {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={layout.row}>
          {this.props.icon && (
            <View
              style={[layout.justifyCenter, styles.icon, this.props.iconStyle]}
            >
              {this.props.icon}
            </View>
          )}

          <Text style={[styles.text, this.props.nameStyle]}>
            {this.props.name}
          </Text>
        </View>

        {this.props.value && (
          <Text style={[styles.text, this.props.valueStyle]}>
            {this.props.value}
          </Text>
        )}
      </View>
    );
  }
}

export default Label;
