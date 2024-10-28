import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { calculateImageDimensions } from '@shared/utils';
import { colors } from '@shared/themes';

const posterDimensions = calculateImageDimensions(144, 2, 3);

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

export default styles;
