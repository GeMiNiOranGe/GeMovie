import React from 'react';
import { Alert, Linking } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import type { TouchableRippleLinkProps } from '@shared/types';
import styles from './style';

class TouchableRippleLink extends React.PureComponent<TouchableRippleLinkProps> {
  public constructor(props: TouchableRippleLinkProps) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  private async onPress(): Promise<void> {
    const supported: boolean = await Linking.canOpenURL(this.props.url);

    if (supported) {
      await Linking.openURL(this.props.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${this.props.url}`);
    }
  }

  public override render(): React.JSX.Element {
    return (
      <TouchableRipple
        style={[styles.touchableRipple, this.props.style]}
        borderless
        rippleColor={this.props.rippleColor}
        onPress={this.onPress}
      >
        {this.props.children}
      </TouchableRipple>
    );
  }
}

export default TouchableRippleLink;
