import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: colors.text,
    },
    toggleBox: {
        paddingTop: spacing.small,
    },
    toggleText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.accent.light,
        marginRight: spacing.tiny,
    },
    toggleButton: {
        fontWeight: 'bold',
        color: colors.accent.light,
    },
});

export default styles;
