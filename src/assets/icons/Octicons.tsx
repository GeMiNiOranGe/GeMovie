import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import { defaultIconSize } from '@shared/constants';
import { IconProps } from '@shared/types';

export class HomeIcon extends React.PureComponent<IconProps> {
  public override render(): React.JSX.Element {
    return (
      <Icon
        name='home'
        size={this.props.size ? this.props.size : defaultIconSize}
        color={this.props.color}
      />
    );
  }
}
