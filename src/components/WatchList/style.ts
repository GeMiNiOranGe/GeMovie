import { colors } from '@shared/themes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderRadius: 50,
        padding: 5,
        zIndex: 10,
        left: -8,
        top: -5,
    },
    bookmarkIcon: {
        position: 'absolute',
    },
    addIcon: {
        position: 'absolute',
        top: 6,
        left: 10,
    },
    starIcon: {
        position: 'absolute',
        top: 7,
        left: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
export default styles;
