import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    imageBox: {
        backgroundColor: colors.background,
    },
    nameBox: {
        paddingLeft: spacing.medium,
        paddingRight: spacing.large,
    },
    name: {
        fontSize: 16,
        color: colors.primary,
    },
});

export default styles;
