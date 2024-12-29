import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgIconProps } from '@shared/types';

const BronzeMedal = ({
  size = 24,
  color = '#cd7f32',
  ...props
}: SvgIconProps): React.JSX.Element => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <Path
      fill={color}
      d='M4.926 2.328c-.71 0-1.283.56-1.283 1.248 0 .21.05.415.148.582L6.639 8.95A8.125 8.125 0 0 1 9.5 7.33L11 4.807 9.89 2.939a1.211 1.211 0 0 0-1.06-.61Zm10.244 0c-.457 0-.857.247-1.06.611l-2.378 4A8.125 8.125 0 0 1 12 6.924a8.125 8.125 0 0 1 5.363 2.021l2.846-4.787c.099-.167.148-.373.148-.582 0-.689-.574-1.248-1.283-1.248zM12 8.422a6.625 6.625 0 0 0-6.625 6.625A6.625 6.625 0 0 0 12 21.672a6.625 6.625 0 0 0 6.625-6.625A6.625 6.625 0 0 0 12 8.422zm0 2.625a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zm-2.5.5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zm5 0a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z'
    />
  </Svg>
);

export default React.memo(BronzeMedal);
