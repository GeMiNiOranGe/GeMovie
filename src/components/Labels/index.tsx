import React from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';

import { Label } from '@components';
import type { LabelProps, LabelsProps } from '@shared/types';
import { spacing } from '@shared/constants';
import styles from './style';

class Labels extends React.PureComponent<LabelsProps> {
  public constructor(props: LabelsProps) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  private renderItem({
    item,
    index,
  }: ListRenderItemInfo<LabelProps>): React.JSX.Element {
    const distance = this.props.distanceBetweenLabels
      ? this.props.distanceBetweenLabels
      : spacing.extraLarge;

    const marginRight = index === this.props.data.length - 1 ? 0 : distance;

    return (
      <Label
        style={{ marginRight }}
        iconStyle={item.iconStyle}
        nameStyle={item.nameStyle}
        valueStyle={item.valueStyle}
        icon={item.icon}
        name={item.name}
        value={item.value}
      />
    );
  }

  public override render(): React.JSX.Element {
    return (
      <FlatList
        style={this.props.style}
        contentContainerStyle={[
          this.props.contentStyle,
          styles.labelContentList,
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={this.props.data}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Labels;
