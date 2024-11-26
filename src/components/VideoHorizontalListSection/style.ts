import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    onAirText: {
        fontSize: 14,
        color: colors.secondary,
        fontWeight: 'bold',
        marginBottom: spacing.small,
    },
});

export default styles;
