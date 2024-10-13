import { StyleSheet } from 'react-native';

import { themeColor } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: spacing.large,
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
    sectionDivider: {
        height: 1,
        marginVertical: 8,
        backgroundColor: themeColor.subtext,
    },
});

export default styles;
