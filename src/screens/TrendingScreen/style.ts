import { spacing } from '@shared/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    listContent: {
        paddingBottom: 20,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '5%',
        paddingVertical: 13,
        zIndex: 1,
    },
    btnCategory: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        height: 40,
        width: 70,
        borderRadius: 10,
    },
    textCategory: {
        textAlign: 'center',
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    btnActive: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    containerItems: {
        flex: 2,
        marginTop: 30,
    },
    contentList: {
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.medium,
    },
    cardSpacing: {
        marginHorizontal: spacing.small,
        marginVertical: spacing.medium,
    },
});

export default styles;
