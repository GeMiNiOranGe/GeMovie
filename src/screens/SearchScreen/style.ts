import { StyleSheet } from 'react-native';

import { themeColor } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 32,
        color: themeColor.text,
    },
    searchBarBox: {
        flexDirection: 'row',
        paddingHorizontal: spacing.large,
        paddingTop: spacing.small,
        backgroundColor: themeColor.primary,
    },
    returnIcon: {
        backgroundColor: themeColor.background,
        margin: 0,
        marginRight: spacing.small,
    },
    searchBar: {
        flex: 1,
        backgroundColor: themeColor.background,
        height: 48,
    },
    searchBarInput: {
        minHeight: 0,
    },
});

export default styles;
