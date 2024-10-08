import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { calculateImageDimensions } from '@shared/utils';
import { themeColor } from '@shared/themes';

const imageDimensions = calculateImageDimensions(64);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    card: {
        paddingVertical: paddingCard,
        paddingLeft: paddingCard,
        borderRadius: outerRadius,
        backgroundColor: themeColor.primary,
    },
    image: {
        ...imageDimensions,
        marginRight: spacing.large,
        borderRadius: innerRadius,
    },
    notFoundImage: {
        backgroundColor: themeColor.background,
    },
    content: {
        justifyContent: 'center',
        flexShrink: 1,
    },
    title: {
        marginBottom: spacing.tiny,
        color: themeColor.text,
        fontSize: 16,
    },
    text: {
        fontSize: 12,
        color: themeColor.subtext,
    },
    navigationIconButton: {
        margin: 0,
        marginVertical: '35%',
        borderRadius: 0,
        borderTopLeftRadius: outerRadius,
        borderBottomLeftRadius: outerRadius,
        backgroundColor: themeColor.accent.dark,
    },
});

export default styles;
