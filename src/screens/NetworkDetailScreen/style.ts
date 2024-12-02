import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const logoSize = 80;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
    content: {
        paddingTop: spacing.large,
    },
    titleBox: {
        padding: spacing.large,
    },
    logoBox: {
        padding: 8,
        backgroundColor: colors.primary,
        borderRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    logo: {
        width: logoSize,
        height: logoSize,
    },
    nameBox: {
        marginLeft: spacing.large,
        marginBottom: spacing.small,
    },
    name: {
        fontSize: 20,
        color: colors.text,
        fontWeight: 'bold',
    },
    labelBox: {
        marginBottom: spacing.huge,
    },
    homepageLink: {
        borderWidth: 1,
        borderColor: colors.neutral,
    },
    homepageText: {
        fontSize: 14,
        color: colors.text,
        marginHorizontal: spacing.small,
    },
});

export default styles;
