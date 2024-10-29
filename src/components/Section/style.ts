import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const accentWidth = 4;

const styles = StyleSheet.create({
    section: {
        marginTop: spacing.large,
        marginBottom: spacing.small,
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
    subtitle: {
        fontSize: 14,
        color: colors.subtext,
        marginLeft: accentWidth + spacing.small,
        marginTop: spacing.tiny,
    },
    moreButton: {
        marginLeft: spacing.small,
    },
    moreButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.accent.light,
    },
    accent: {
        width: accentWidth,
        borderRadius: 1000,
        marginRight: spacing.small,
        backgroundColor: colors.secondary,
    },
    sectionSeparator: {
        height: 16,
        backgroundColor: colors.background,
    },
    sectionDivider: {
        height: 1,
        marginVertical: spacing.small,
        marginHorizontal: spacing.large,
        backgroundColor: colors.neutral,
    },
    sectionContent: {
        marginTop: spacing.small,
        marginBottom: spacing.large,
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
    sectionItem: {
        paddingHorizontal: spacing.large,
    },
    sectionItemName: {
        fontSize: 16,
        color: colors.text,
        marginBottom: spacing.tiny,
    },
    sectionItemsName: {
        fontSize: 16,
        color: colors.text,
        marginBottom: spacing.small,
        paddingHorizontal: spacing.large,
    },
    sectionItemsContentList: {
        paddingHorizontal: spacing.large,
    },
});

export default styles;
