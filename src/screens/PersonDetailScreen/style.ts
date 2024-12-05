import { Dimensions, StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    body: {
        flex: 4,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: '-23%',
    },
    containerProfile: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 60,
    },
    departmentText: {
        fontSize: 15,
        textAlign: 'center',
    },
    movieThumbnail: {
        width: width * 0.3,
        height: height * 0.25,
        borderRadius: 8,
    },
    backdropImage: {
        width: 120,
        height: 120,
        borderRadius: 300,
        borderWidth: 4,
        borderColor: '#fff',
        position: 'absolute',
        bottom: -48,
        left: '45%',
        backgroundColor: 'lightgray',
        transform: [{ translateX: -48 }],
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
