import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const imageDimensions = calculateImageDimensions(120, 2, 3);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    card: {
        marginTop: spacing.medium,
        backgroundColor: colors.primary,
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
        backgroundColor: colors.primary,
    },
    content: {
        paddingVertical: spacing.medium,
        paddingRight: spacing.medium,
    },
    title: {
        fontSize: 16,
        color: colors.text,
    },
    text: {
        fontSize: 12,
        color: colors.subtext,
    },
    airDate: {
        marginTop: spacing.medium,
    },
    overview: {
        marginVertical: spacing.tiny,
    },
    ratingBox: {
        backgroundColor: colors.secondary,
        borderRadius: innerRadius,
        marginBottom: spacing.tiny,
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.tiny,
        right: -spacing.small,
        elevation: 4,
        shadowColor: colors.secondary,
    },
    ratingText: {
        color: colors.primary,
        fontSize: 12,
        marginLeft: spacing.tiny,
    },
    genreTag: {
        borderRadius: innerRadius,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.small,
    },
    genreTagText: {
        fontSize: 10,
        color: colors.subtext,
    },
    genreList: {
        marginRight: spacing.small,
        marginBottom: paddingCard,
    },
    navigationIconButton: {
        margin: 0,
        backgroundColor: colors.accent.dark,
        borderRadius: 0,
        borderTopLeftRadius: outerRadius,
        borderBottomRightRadius: outerRadius,
    },
    mediaTypeBox: {
        borderRadius: 4,
        top: -spacing.medium,
        right: spacing.medium,
        backgroundColor: colors.neutral,
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.tiny,
        elevation: 4,
    },
    mediaTypeText: {
        fontSize: 10,
        color: colors.text,
    },
    watchlist: {
        position: 'absolute',
        top: 2,
        left: 0,
        zIndex: 10,
    },
});

export default styles;
