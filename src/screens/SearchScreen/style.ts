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
});

export default styles;
