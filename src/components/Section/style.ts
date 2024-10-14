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
        fontSize: 18,
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
        marginVertical: spacing.small,
        backgroundColor: themeColor.subtext,
    },
    sectionLabelName: {
        fontSize: 16,
        color: themeColor.text,
    },
    sectionLabelValue: {
        fontSize: 14,
        color: themeColor.subtext,
    },
});

export default styles;
