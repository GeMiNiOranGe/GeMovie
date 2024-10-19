import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import { IconProps } from '@shared/types';

const GoldMedal = ({
  size = 24,
  color = 'gold',
  ...props
}: IconProps & SvgProps) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <Path
      fill={color}
      d='M4.926 2.25c-.71 0-1.283.56-1.283 1.248 0 .21.05.415.148.582l2.848 4.791A8.125 8.125 0 0 1 9.5 7.252L11 4.729 9.89 2.86a1.211 1.211 0 0 0-1.06-.611Zm10.244 0c-.457 0-.857.247-1.06.611l-2.378 4A8.125 8.125 0 0 1 12 6.846a8.125 8.125 0 0 1 5.363 2.021L20.21 4.08c.099-.167.148-.373.148-.582 0-.689-.574-1.248-1.283-1.248zM12 8.346a6.625 6.625 0 0 0-6.625 6.625A6.625 6.625 0 0 0 12 21.596a6.625 6.625 0 0 0 6.625-6.625A6.625 6.625 0 0 0 12 8.346Zm0 2.625a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z'
    />
  </Svg>
);

export default React.memo(GoldMedal);
