import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 32,
        color: 'black',
    },
    list: {
        paddingTop: 10,
    },
    contentList: {
        paddingBottom: 10,
        paddingHorizontal: spacing.large,
    },
    listHeader: {
        paddingHorizontal: 16,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarBox: {
        flexDirection: 'row',
        paddingRight: 16,
        paddingVertical: 8,
    },
    searchBar: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchBarInput: {
        minHeight: 0,
    },
});

export default styles;
