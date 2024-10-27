import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const accentWidth = 4;

const styles = StyleSheet.create({
    section: {
        marginBottom: spacing.huge,
    },
    titleBox: {
        paddingHorizontal: spacing.large,
        marginBottom: spacing.large,
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
    accent: {
        width: accentWidth,
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
