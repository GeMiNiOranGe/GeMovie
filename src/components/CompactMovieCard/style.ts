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
    content: {
        paddingHorizontal: spacing.small,
        paddingBottom: spacing.small,
    },
    title: {
        fontSize: 14,
        color: colors.text,
    },
});

export default styles;
