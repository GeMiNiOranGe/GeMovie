import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { calculateImageDimensions } from '@shared/utils';
import { colors } from '@shared/themes';

const posterDimensions = calculateImageDimensions(144, 2, 3);
const horizontalPoster = calculateImageDimensions(80, 2, 3);

const styles = StyleSheet.create({
    card: {
        width: posterDimensions.width,
        borderRadius: spacing.small,
        overflow: 'hidden',
        backgroundColor: colors.background,
    },
    posterBox: {
        marginBottom: spacing.small,
    },
    poster: {
        ...posterDimensions,
    },
    ratingBox: {
        backgroundColor: colors.secondary,
        borderRadius: 4,
        marginBottom: spacing.small,
        marginLeft: spacing.small,
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.tiny,
    },
    ratingText: {
        color: colors.primary,
        fontSize: 12,
        marginLeft: spacing.tiny,
    },
    content: {
        paddingHorizontal: spacing.small,
        paddingBottom: spacing.small,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
});

export const horizontal = StyleSheet.create({
    card: {
        borderRadius: spacing.medium,
        overflow: 'hidden',
        backgroundColor: colors.primary,
    },
    posterBox: {
        marginRight: spacing.medium,
    },
    poster: {
        ...horizontalPoster,
    },
    title: {
        fontSize: 16,
        color: colors.text,
        marginBottom: spacing.tiny,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
        marginBottom: spacing.tiny,
    },
    content: {
        marginRight: spacing.small,
    },
    ratingText: {
        fontSize: 14,
        color: colors.text,
        marginLeft: spacing.tiny,
    },
    navigationIconButton: {
        flex: 1,
        margin: 0,
        borderRadius: 0,
        borderTopLeftRadius: spacing.medium,
        borderBottomLeftRadius: spacing.medium,
        marginVertical: '100%',
        backgroundColor: colors.accent.dark,
    },
});

export default styles;
