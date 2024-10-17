import { StyleSheet } from 'react-native';

import { themeColor } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    section: {
        // paddingHorizontal: spacing.large,
        marginBottom: spacing.huge,
    },
    titleBox: {
        paddingHorizontal: spacing.large,
        marginBottom: spacing.small,
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
        marginHorizontal: spacing.large,
        backgroundColor: themeColor.neutral,
    },
    sectionLabel: {
        paddingHorizontal: spacing.large,
    },
    sectionLabelName: {
        fontSize: 16,
        color: themeColor.text,
        marginBottom: spacing.tiny,
    },
    sectionLabelValue: {
        fontSize: 14,
        color: themeColor.subtext,
    },
    sectionItemName: {
        fontSize: 16,
        color: themeColor.text,
        marginBottom: spacing.small,
        paddingHorizontal: spacing.large,
    },
});

export default styles;
