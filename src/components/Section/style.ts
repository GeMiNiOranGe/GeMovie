import { StyleSheet } from 'react-native';

import { themeColor } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.large,
        marginBottom: spacing.extraLarge,
    },
    titleBox: {
        marginBottom: spacing.tiny,
    },
    title: {
        fontSize: 16,
        color: themeColor.text,
        fontWeight: 'bold',
    },
    accent: {
        width: 4,
        borderRadius: 1000,
        marginRight: spacing.small,
        backgroundColor: themeColor.secondary,
    },
});

export default styles;
