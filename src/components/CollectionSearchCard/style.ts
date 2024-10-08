import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const imageDimensions = calculateImageDimensions(120, 2, 3);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;
const topOffsetPercentage = '40%';

const styles = StyleSheet.create({
    card: {
        borderRadius: outerRadius,
        backgroundColor: themeColor.primary,
        overflow: 'hidden',
    },
    backdropImage: {
        ...StyleSheet.absoluteFillObject,
        top: `-${topOffsetPercentage}`,
        bottom: topOffsetPercentage,
    },
    backdropBox: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: spacing.large,
    },
    backdropText: {
        color: themeColor.text,
        fontSize: 12,
        marginLeft: spacing.tiny,
    },
    linearGradient: {
        height: 48,
    },
    imageBox: {
        backgroundColor: themeColor.background,
    },
    image: {
        ...imageDimensions,
    },
    contentBox: {
        paddingVertical: paddingCard,
        paddingLeft: spacing.large,
        backgroundColor: themeColor.primary,
    },
    title: {
        color: themeColor.text,
        fontSize: 16,
        marginBottom: spacing.medium,
        marginRight: paddingCard,
    },
    text: {
        color: themeColor.subtext,
        fontSize: 12,
        marginRight: spacing.small,
    },
    navigationIconButton: {
        flex: 1,
        margin: 0,
        borderRadius: 0,
        borderTopLeftRadius: outerRadius,
        borderBottomLeftRadius: outerRadius,
        backgroundColor: themeColor.accent.dark,
    },
});

export default styles;
