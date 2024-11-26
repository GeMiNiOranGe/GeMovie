import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    titleBox: {
        paddingHorizontal: spacing.large,
        marginTop: spacing.large,
        marginBottom: spacing.large,
    },
    title: {
        fontSize: 30,
        color: colors.text,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
});

export default styles;
