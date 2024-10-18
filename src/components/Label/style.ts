import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    name: {
        fontSize: 12,
        color: colors.subtext,
    },
    value: {
        fontSize: 14,
        color: colors.text,
    },
    icon: {
        marginRight: spacing.tiny,
    },
});

export default styles;
