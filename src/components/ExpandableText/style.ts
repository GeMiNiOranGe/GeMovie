import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: themeColor.text,
    },
    toggleBox: {
        paddingTop: spacing.small,
    },
    toggleText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: themeColor.accent.light,
        marginRight: spacing.tiny,
    },
});

export default styles;
