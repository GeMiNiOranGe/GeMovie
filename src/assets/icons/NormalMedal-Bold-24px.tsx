import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import { IconProps } from '@shared/types';

const NormalMedal = ({
  size = 24,
  color = 'transparent',
  ...props
}: IconProps & SvgProps) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <Path
      fill={color}
      d='M11.375 2v5.484a8.004 8.004 0 0 0-3.553 1.133.88.88 0 0 1-.322-.633V3a1 1 0 0 1 1-1zm1.234 0v5.484a8.004 8.004 0 0 1 3.553 1.133.88.88 0 0 0 .322-.633V3a1 1 0 0 0-1-1zM12 9.012a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z'
    />
  </Svg>
);

export default React.memo(NormalMedal);
