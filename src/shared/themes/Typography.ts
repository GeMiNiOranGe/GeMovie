import { TextStyle } from 'react-native';

import { fontSizes, colors } from '@shared/themes';

const typography = {
    title1: {
        fontSize: fontSizes.h1,
        color: colors.text,
    },
    title2: {
        fontSize: fontSizes.h2,
        color: colors.text,
    },
    title3: {
        fontSize: fontSizes.h3,
        color: colors.text,
    },
    title4: {
        fontSize: fontSizes.h4,
        color: colors.text,
    },
    title5: {
        fontSize: fontSizes.h5,
        color: colors.text,
    },
    title6: {
        fontSize: fontSizes.h6,
        color: colors.text,
    },
    subtitle1: {
        fontSize: fontSizes.h6,
        color: colors.subtext,
    },
    subtitle2: {
        fontSize: fontSizes.body,
        color: colors.subtext,
    },
    text: {
        fontSize: fontSizes.body,
        color: colors.text,
    },
    subtext: {
        fontSize: fontSizes.body,
        color: colors.subtext,
    },
    smallSubtext: {
        fontSize: fontSizes.small,
        color: colors.subtext,
    },
} as const satisfies Record<string, TextStyle>;

export default typography;
