import { colors } from '@shared/themes';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: width * 0.05,
    },
    backButtonWrapper: {
        height: height * 0.05,
        width: height * 0.05,
        backgroundColor: colors.neutral,
        borderRadius: height * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    textContainer: {
        marginVertical: height * 0.04,
    },
    headingText: {
        fontSize: width * 0.08,
        color: 'black',
        fontWeight: '600',
        marginTop: -10,
    },
    formContainer: {
        marginTop: height * 0.01,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: width * 0.1,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.04,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: width * 0.03,
        color: colors.text,
    },
    forgotPasswordText: {
        textAlign: 'right',
        color: colors.primary,
        marginVertical: 10,
    },
    loginButtonWrapper: {
        backgroundColor: colors.accent.light,
        borderRadius: width * 0.1,
        marginTop: height * 0.04,
        paddingVertical: height * 0.005,
    },
    loginText: {
        color: colors.primary,
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    continueText: {
        textAlign: 'center',
        marginVertical: height * 0.02,
        fontSize: width * 0.035,
        color: 'black',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height * 0.06,
        gap: width * 0.02,
        marginTop: height * 0.04,
    },
    accountText: {
        color: colors.subtext,
        fontSize: width * 0.035,
    },
    signupText: {
        color: colors.accent.dark,
        fontSize: width * 0.035,
        fontWeight: '700',
    },
    placeholder: {
        position: 'absolute',
        fontSize: 14,
        marginTop: 15,
        marginLeft: 60,
        fontWeight: 'bold',
        color: '#2c3e50',
        backgroundColor: colors.white,
    },
    errorListContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    errorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    errorIcon: {
        marginRight: 8,
    },
    errorText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    errorTextSuccess: {
        color: 'green',
    },
    errorTextError: {
        color: 'red',
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 13,
        bottom: 20,
        left: 10,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '60%',
    },
});

export default styles;
