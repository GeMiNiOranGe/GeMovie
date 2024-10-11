import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const imageDimensions = calculateImageDimensions(120, 2, 3);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    card: {
        marginTop: spacing.medium,
        backgroundColor: themeColor.primary,
        borderRadius: outerRadius,
    },
    contentCard: {
        paddingLeft: paddingCard,
    },
    image: {
        borderRadius: innerRadius,
        ...imageDimensions,
    },
    imageBox: {
        elevation: 4,
        marginRight: spacing.large,
        top: -paddingCard,
        backgroundColor: themeColor.primary,
    },
    content: {
        paddingVertical: spacing.medium,
        paddingRight: spacing.medium,
    },
    title: {
        fontSize: 16,
        color: themeColor.text,
    },
    text: {
        fontSize: 12,
        color: themeColor.subtext,
    },
    airDate: {
        marginTop: spacing.medium,
    },
    overview: {
        marginVertical: spacing.tiny,
    },
    ratingBox: {
        backgroundColor: themeColor.secondary,
        borderRadius: innerRadius,
        marginBottom: spacing.tiny,
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.tiny,
        right: -spacing.small,
        elevation: 4,
        shadowColor: themeColor.secondary,
    },
    ratingText: {
        color: themeColor.primary,
        fontSize: 12,
        marginLeft: spacing.tiny,
    },
    genreTag: {
        borderRadius: innerRadius,
        backgroundColor: themeColor.background,
        paddingHorizontal: spacing.small,
    },
    genreTagText: {
        fontSize: 10,
        color: themeColor.subtext,
    },
    genreList: {
        marginRight: spacing.small,
        marginBottom: paddingCard,
    },
    navigationIconButton: {
        margin: 0,
        backgroundColor: themeColor.accent.dark,
        borderRadius: 0,
        borderTopLeftRadius: outerRadius,
        borderBottomRightRadius: outerRadius,
    },
    mediaTypeBox: {
        borderRadius: 4,
        top: -spacing.medium,
        right: spacing.medium,
        backgroundColor: themeColor.neutral,
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.tiny,
        elevation: 4,
    },
    mediaTypeText: {
        fontSize: 10,
        color: themeColor.text,
    },
});

export default styles;
