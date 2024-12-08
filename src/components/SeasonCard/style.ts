import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';
import { calculateImageDimensions } from '@shared/utils';

const posterDimension = calculateImageDimensions(144, 2, 3);

const styles = StyleSheet.create({
    card: {
        width: posterDimension.width,
        borderRadius: 8,
        backgroundColor: colors.background,
        overflow: 'hidden',
    },
    posterBox: {
        marginBottom: spacing.small,
    },
    poster: {
        ...posterDimension,
    },
    content: {
        paddingHorizontal: spacing.small,
        paddingBottom: spacing.small,
    },
    title: {
        fontSize: 14,
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
});

export default styles;
