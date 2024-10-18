import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 32,
        color: colors.text,
    },
    searchBarBox: {
        flexDirection: 'row',
        paddingHorizontal: spacing.large,
        paddingTop: spacing.small,
        backgroundColor: colors.primary,
    },
    returnIcon: {
        backgroundColor: colors.background,
        margin: 0,
        marginRight: spacing.small,
    },
    searchBar: {
        flex: 1,
        backgroundColor: colors.background,
        height: 48,
    },
    searchBarInput: {
        minHeight: 0,
    },
});

export default styles;
