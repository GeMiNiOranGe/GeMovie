import React from 'react';
import { Pressable, Text } from 'react-native';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import ReadMore from '@fawazahmed/react-native-read-more';

import type {
  ExpandableTextProps,
  ExpandableTextState,
  Variant,
} from '@shared/types';
import { layout, colors } from '@shared/themes';
import styles from './style';

const iconSize = 16;
const iconColor: string = colors.accent.light.toString();
const iconVariant: Variant = 'Bold';

const seeMoreText = 'View more';
const seeLessText = 'View less';

class ExpandableText extends React.PureComponent<
  ExpandableTextProps,
  ExpandableTextState
> {
  public constructor(props: ExpandableTextProps) {
    super(props);

    this.state = {
      isExpand: true,
      isShowReadButton: false,
    };

    this.onReady = this.onReady.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onSeeMore = this.onSeeMore.bind(this);
    this.onSeeLess = this.onSeeLess.bind(this);
  }

  private renderReadMore(): React.JSX.Element {
    return (
      <Pressable
        style={[layout.row, layout.center, styles.toggleBox]}
        onPress={() => this.setState({ isExpand: false })}
      >
        <Text style={styles.toggleText}>{seeMoreText}</Text>

        <ArrowDown2 size={iconSize} color={iconColor} variant={iconVariant} />
      </Pressable>
    );
  }

  private renderReadLess(): React.JSX.Element {
    return (
      <Pressable
        style={[layout.row, layout.center, styles.toggleBox]}
        onPress={() => this.setState({ isExpand: true })}
      >
        <Text style={styles.toggleText}>{seeLessText}</Text>

        <ArrowUp2 size={iconSize} color={iconColor} variant={iconVariant} />
      </Pressable>
    );
  }

  private onReady({ canExpand }: { canExpand: boolean }) {
    canExpand && this.setState({ isShowReadButton: true });
  }

  private onPress() {
    this.setState({ isExpand: !this.state.isExpand });
  }

  private onSeeMore() {
    this.setState({ isExpand: false });
  }

  private onSeeLess() {
    this.setState({ isExpand: true });
  }

  public override render(): React.JSX.Element {
    if (this.props.seeButtonPosition === 'separate') {
      return (
        <>
          <ReadMore
            style={[styles.text, this.props.style]}
            numberOfLines={this.props.numberOfLines}
            collapsed={this.state.isExpand}
            seeMoreText=''
            seeLessText=''
            onReady={this.onReady}
            onPress={this.onPress}
            onSeeMore={this.onSeeMore}
            onSeeLess={this.onSeeLess}
          >
            {this.props.text}
          </ReadMore>

          {this.state.isShowReadButton &&
            (this.state.isExpand
              ? this.renderReadMore()
              : this.renderReadLess())}
        </>
      );
    }

    return (
      <ReadMore
        style={[styles.text, this.props.style]}
        numberOfLines={this.props.numberOfLines}
        collapsed={this.state.isExpand}
        seeMoreText={seeMoreText}
        seeLessText={seeLessText}
        seeMoreStyle={styles.toggleButton}
        seeLessStyle={styles.toggleButton}
        onPress={this.onPress}
        onSeeMore={this.onSeeMore}
        onSeeLess={this.onSeeLess}
      >
        {this.props.text}
      </ReadMore>
    );
  }
}

export default ExpandableText;
