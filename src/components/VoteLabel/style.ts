import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    vote: {
        backgroundColor: colors.secondary,
        borderRadius: 4,
        margin: spacing.small,
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.tiny,
    },
    value: {
        color: colors.primary,
        fontSize: 12,
        marginLeft: spacing.tiny,
    },
    threshold: {
        fontSize: 10,
        color: colors.neutral,
    },
});

export default styles;
