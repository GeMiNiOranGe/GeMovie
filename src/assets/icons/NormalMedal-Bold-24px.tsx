import React from 'react';
import { ColorValue } from 'react-native';
import Svg, { Path, Text } from 'react-native-svg';

import { SvgIconProps } from '@shared/types';

type NormalMedalProps = {
  value?: number | undefined;
  fontColor?: ColorValue | undefined;
};

const medalHeight = 13;
const medalWidth = 13;
const medalX = 5.5;
const medalY = 9.006;

const NormalMedal = ({
  size = 24,
  color = 'transparent',
  value = undefined,
  fontColor = 'transparent',
  ...props
}: NormalMedalProps & SvgIconProps) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <Path
      fill={color}
      d='M11.375 2v5.484a8.004 8.004 0 0 0-3.553 1.133.88.88 0 0 1-.322-.633V3a1 1 0 0 1 1-1zm1.234 0v5.484a8.004 8.004 0 0 1 3.553 1.133.88.88 0 0 0 .322-.633V3a1 1 0 0 0-1-1zM12 9.012a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z'
    />
    {value && (
      <Text
        x={medalX + medalWidth / 2}
        y={medalY + medalHeight / 2}
        fill={fontColor}
        fontSize='6'
        fontWeight='bold'
        fontFamily='monospace'
        textAnchor='middle'
        dx='0.0125em'
        dy='0.35em'
      >
        {value}
      </Text>
    )}
  </Svg>
);

export default React.memo(NormalMedal);
