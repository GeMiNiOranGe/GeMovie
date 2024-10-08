import { StyleSheet } from 'react-native';

import { themeColor } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: themeColor.primary,
    },
    contentContainer: {
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.large,
    },
    tagButton: {
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.large,
        borderRadius: spacing.small,
    },
    tagText: {
        fontSize: 14,
    },
});

export default styles;
