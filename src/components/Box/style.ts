import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: spacing.large,
        marginBottom: spacing.huge,
    },
    title: {
        fontSize: 16,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: spacing.small,
    },
});

export default styles;
