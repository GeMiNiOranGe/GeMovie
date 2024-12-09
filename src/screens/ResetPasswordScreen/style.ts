import { colors } from '@shared/themes';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: width * 0.04,
    },
    backButtonWrapper: {
        height: height * 0.05,
        width: height * 0.05,
        backgroundColor: colors.neutral,
        borderRadius: height * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxContainer: {
        minHeight: height * 0.55,
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    forgotText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        padding: 10,
    },
    loginButtonWrapper: {
        backgroundColor: colors.secondary,
        borderRadius: width * 0.1,
        paddingVertical: height * 0.015,
        width: 110,
        alignSelf: 'center',
        marginVertical: 10,
    },
    loginText: {
        color: colors.primary,
        fontSize: width * 0.045,
        fontWeight: '600',
        textAlign: 'center',
    },
    inputContainer: {
        borderWidth: 2,
        borderColor: colors.secondary,
        backgroundColor: 'white',
        paddingHorizontal: width * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 6,
        marginVertical: height * 0.02,
        height: height * 0.09,
        width: width * 0.7,
        borderRadius: 10,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: width * 0.03,
        color: colors.text,
    },
    errorListContainer: {
        height: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        padding: 5,
    },
    errorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    errorIcon: {
        marginRight: 8,
    },
    errorText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    errorTextSuccess: {
        color: 'green',
    },
    errorTextError: {
        color: 'red',
    },
    errorReset: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        padding: 10,
    },
});

export default styles;
