import { colors } from '@shared/themes';
import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    head: {
        flex: 0.4,
        paddingBottom: 24,
    },
    backButtonWrapper: {
        height: height * 0.05,
        width: height * 0.05,
        backgroundColor: colors.neutral,
        borderRadius: height * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginLeft: 16,
    },
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginBottom: 40,
    },
    textProfile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 16,
    },
    body: {
        flex: 3,
    },
    bodyContent: {
        paddingBottom: 20,
    },
    errorText: {
        fontSize: 15,
        padding: 10,
    },
    footer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogout: {
        flexDirection: 'row',
        width: height * 0.2,
        height: height * 0.07,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16,
    },
    textLogout: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5,
        color: 'red',
    },
});
export default styles;
