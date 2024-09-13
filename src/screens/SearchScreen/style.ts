import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 32,
        color: 'black',
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
