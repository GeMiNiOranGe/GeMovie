import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    activityIndicator: {
        marginTop: spacing.small,
        marginBottom: spacing.large,
    },
    noResultText: {
        fontSize: 14,
        color: colors.text,
        paddingHorizontal: spacing.large,
    },
});

export default styles;
