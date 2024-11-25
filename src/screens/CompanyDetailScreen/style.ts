import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const logoSize = 80;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
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
    parentNameBox: {
        paddingLeft: spacing.medium,
        paddingRight: spacing.large,
    },
    parentName: {
        fontSize: 16,
        color: colors.primary,
    },
    labelBox: {
        marginBottom: spacing.huge,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
});

export default styles;
