import { colors } from '@shared/themes';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButtonWrapper: {
        height: height * 0.05,
        width: height * 0.05,
        backgroundColor: colors.neutral,
        borderRadius: height * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    forgotText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: width * 0.1,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginVertical: height * 0.04,
        width: width * 0.9,
    },
    loginButtonWrapper: {
        backgroundColor: colors.accent.light,
        borderRadius: width * 0.1,
        paddingVertical: height * 0.02,
        width: 110,
        alignSelf: 'center',
    },
    loginText: {
        color: colors.primary,
        fontSize: width * 0.045,
        fontWeight: '600',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'left',
        marginHorizontal: width * 0.08,
        marginBottom: 15,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: width * 0.04,
        color: colors.text,
    },
});

export default styles;
