import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgIconProps } from '@shared/types';

const Television = ({
  size = 24,
  color = 'transparent',
  ...props
}: SvgIconProps) => (
  <Svg width={size} height={size} viewBox='0 0 24 24' fill='none' {...props}>
    <Path
      fill={color}
      d='m14.44 15.125-2.08 1.2c-.44.25-.87.38-1.27.38-.3 0-.57-.07-.82-.21-.58-.33-.9-1.01-.9-1.89v-2.4c0-.88.32-1.56.9-1.89.58-.34 1.32-.28 2.09.17l2.08 1.2c.77.44 1.19 1.06 1.19 1.73 0 .67-.43 1.26-1.19 1.71zm-6.63-9.07C4.17 6.055 2 8.226 2 11.866v3.269c0 3.64 2.17 5.81 5.81 5.81h8.38c3.64 0 5.81-2.17 5.81-5.81v-3.269c0-3.64-2.17-5.811-5.81-5.81Zm6.836-2.854-3 3a.5.5 0 0 0 0 .707.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0 0-.707.5.5 0 0 0-.708 0zm-6 0a.5.5 0 0 0 0 .707l3 3a.5.5 0 0 0 .708 0 .5.5 0 0 0 0-.707l-3-3a.5.5 0 0 0-.708 0z'
    />
  </Svg>
);

export default React.memo(Television);
