import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    containerProfile: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 32,
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 1000,
        backgroundColor: 'lightgray',
    },
    text: {
        fontSize: 15,
        color: 'black',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '80%',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    actionArea: {
        marginBottom: spacing.large,
    },
    imdbLink: {
        backgroundColor: colors.accent.dark,
    },
    labelBox: {
        marginBottom: spacing.huge,
    },
});
export default styles;
