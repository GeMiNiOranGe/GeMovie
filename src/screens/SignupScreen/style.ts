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
    },
    textContainer: {
        marginVertical: height * 0.02,
    },
    headingText: {
        fontSize: width * 0.08,
        color: 'black',
        fontWeight: '600',
    },
    formContainer: {
        marginTop: height * 0.03,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: width * 0.1,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        marginVertical: height * 0.02,
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
        backgroundColor: colors.secondary,
        borderRadius: width * 0.1,
        marginTop: height * 0.03,
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
    googleButtonContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: height * 0.01,
        gap: width * 0.02,
    },
    googleImage: {
        height: width * 0.05,
        width: width * 0.05,
    },
    googleText: {
        fontSize: width * 0.045,
        fontWeight: '500',
        color: colors.text,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height * 0.06,
        gap: width * 0.02,
    },
    accountText: {
        color: colors.subtext,
        fontSize: width * 0.035,
    },
    signupText: {
        color: colors.secondary,
        fontSize: width * 0.035,
        fontWeight: '700',
    },
    errorListContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: colors.neutral,
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
});

export default styles;
