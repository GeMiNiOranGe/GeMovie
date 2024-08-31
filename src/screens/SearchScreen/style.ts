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
    btnText: {
        fontSize: 16,
        color: 'black',
    },
    list: {
        paddingTop: 10,
    },
    contentList: {
        paddingBottom: 10,
        paddingHorizontal: spacing.large,
    },
    searchField: {
        color: 'black',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listHeader: {
        paddingHorizontal: 16,
    },
    companyText: {
        color: 'black',
    },
});

export default styles;
