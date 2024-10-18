import React from 'react';
import { FlatList, View, type ListRenderItemInfo } from 'react-native';

import { Label } from '@components';
import type { LabelProps, LabelsProps } from '@shared/types';
import { spacing } from '@shared/constants';
import styles from './style';

class Labels extends React.PureComponent<LabelsProps> {
  public constructor(props: LabelsProps) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.renderItemSeparator = this.renderItemSeparator.bind(this);
  }

  private renderItem({
    item,
    index,
  }: ListRenderItemInfo<LabelProps>): React.JSX.Element {
    const distance = this.props.distanceBetweenLabels
      ? this.props.distanceBetweenLabels
      : spacing.large;

    const marginLeft = index === 0 ? 0 : distance;
    const marginRight = index === this.props.data.length - 1 ? 0 : distance;

    return <Label style={{ marginLeft, marginRight }} {...item} />;
  }

  private renderItemSeparator(): React.JSX.Element {
    return <View style={styles.itemSeparator} />;
  }

  public override render(): React.JSX.Element {
    return (
      <FlatList
        style={this.props.style}
        contentContainerStyle={[
          styles.labelContentList,
          this.props.contentStyle,
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={this.renderItemSeparator}
        data={this.props.data}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Labels;
