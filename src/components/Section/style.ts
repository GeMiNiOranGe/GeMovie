import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    section: {
        marginBottom: spacing.huge,
    },
    titleBox: {
        paddingHorizontal: spacing.large,
        marginBottom: spacing.small,
    },
    title: {
        fontSize: 18,
        color: colors.text,
        fontWeight: 'bold',
    },
    accent: {
        width: 4,
        borderRadius: 1000,
        marginRight: spacing.small,
        backgroundColor: colors.secondary,
    },
    sectionDivider: {
        height: 1,
        marginVertical: spacing.small,
        marginHorizontal: spacing.large,
        backgroundColor: colors.neutral,
    },
    sectionLabel: {
        paddingHorizontal: spacing.large,
    },
    sectionLabelName: {
        fontSize: 16,
        color: colors.text,
        marginBottom: spacing.tiny,
    },
    sectionLabelValue: {
        fontSize: 14,
        color: colors.subtext,
    },
    sectionItemName: {
        fontSize: 16,
        color: colors.text,
        marginBottom: spacing.small,
        paddingHorizontal: spacing.large,
    },
});

export default styles;
