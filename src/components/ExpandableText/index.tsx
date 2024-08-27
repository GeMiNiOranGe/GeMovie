import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ExpandableTextProps, ExpandableTextState } from '@shared/types';
import styles from './style';

class ExpandableText extends React.Component<
  ExpandableTextProps,
  ExpandableTextState
> {
  public constructor(props: ExpandableTextProps) {
    super(props);

    this.state = {
      isExpand: false,
    };

    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  private toggleExpansion(): void {
    this.setState({ isExpand: !this.state.isExpand });
  }

  public override render(): React.JSX.Element {
    return (
      <View>
        <Text
          numberOfLines={this.state.isExpand ? 0 : this.props.numberOfLines}
          style={styles.text}
        >
          {this.props.text}
        </Text>
        <TouchableOpacity onPress={this.toggleExpansion}>
          <Text style={styles.toggleText}>
            {this.state.isExpand ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExpandableText;
