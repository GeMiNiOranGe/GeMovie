import React from 'react';
// import Svg, { Text } from 'react-native-svg';
import { StrokeText } from '@charmy.tech/react-native-stroke-text';

import type { RankTextProps } from '@shared/types';
import { colors } from '@shared/themes';

class RankText extends React.PureComponent<RankTextProps> {
  public override render(): React.JSX.Element {
    return (
      <>
        <StrokeText
          text={this.props.text}
          align='left'
          fontSize={56}
          color={colors.text.toString()}
          strokeColor={colors.primary.toString()}
          strokeWidth={4}
        />
        {/* <Svg width='200' height='75'>
          <Text
            x={-2.5}
            y='75'
            letterSpacing={-8}
            fill={colors.text}
            stroke={colors.primary}
            strokeWidth='2'
            fontSize='56'
            fontWeight='bold'
            alignmentBaseline='text-bottom'
            textAnchor='start'
          >
            {this.props.text}
          </Text>
        </Svg> */}
      </>
    );
  }
}

export default RankText;
