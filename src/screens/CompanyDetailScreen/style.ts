import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const backdropSize = 80;

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
    backdropBox: {
        padding: 8,
        backgroundColor: colors.primary,
        borderRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    backdrop: {
        width: backdropSize,
        height: backdropSize,
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
    text: {
        fontSize: 14,
        color: colors.text,
    },
});

export default styles;
