import { colors } from '@shared/themes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        position: 'relative',
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 60,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        fontSize: 14,
        overflow: 'hidden',
    },
    inputContainer: {
        flex: 1,
        position: 'relative',
        paddingRight: 30,
    },
    post: {
        height: 35,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
    },
    postText: {
        color: 'white',
        fontWeight: 'bold',
    },
    profileIcon: {
        marginTop: 20,
    },
    sendIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
        borderRadius: 20,
        padding: 5,
    },
    successMessage: {
        color: 'gray',
        fontSize: 14,
        marginLeft: 40,
    },
    commentContainer: {
        height: 28,
        marginVertical: 5,
        marginRight: 20,
    },
    commentUsername: {
        fontWeight: 'bold',
        color: 'black',
    },
    commentHeader: {
        flexDirection: 'row',
    },
    commentText: {
        fontSize: 14,
        marginLeft: 40,
    },
    commentTimestamp: {
        color: 'gray',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 2,
    },
    profileTick: {
        marginRight: 10,
    },
});

export default styles;
