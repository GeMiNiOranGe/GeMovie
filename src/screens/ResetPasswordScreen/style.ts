import { colors } from '@shared/themes';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
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
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxContainer: {
        height: height * 0.45,
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    forgotText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        padding: 10,
    },
    inputContainer: {
        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 20,
        width: width * 0.7,
        height: height * 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        marginVertical: height * 0.02,
        marginHorizontal: width * 0.06,
        backgroundColor: 'white',
    },
    loginButtonWrapper: {
        backgroundColor: colors.secondary,
        borderRadius: width * 0.1,
        paddingVertical: height * 0.015,
        width: 110,
        alignSelf: 'center',
    },
    loginText: {
        color: colors.primary,
        fontSize: width * 0.045,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default styles;
