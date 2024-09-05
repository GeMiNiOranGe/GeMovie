import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { defaultIconSize } from '@shared/constants';
import { IconProps } from '@shared/types';

export class SearchIcon extends React.PureComponent<IconProps> {
  public override render(): React.JSX.Element {
    return (
      <Icon
        name='search'
        size={this.props.size ? this.props.size : defaultIconSize}
        color={this.props.color}
      />
    );
  }
}
