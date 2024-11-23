import { Dimensions, StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
    },
    body: {
        flex: 4,
        backgroundColor: 'white',
        marginTop: '-25%',
    },
    labelBox: {
        marginBottom: spacing.huge,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
    backdropImage: {
        width: 100,
        height: 100,
        borderRadius: 300,
        borderWidth: 4,
        borderColor: '#fff',
        position: 'absolute',
        bottom: -48,
        left: '50%',
        backgroundColor: 'white',
        transform: [{ translateX: -48 }],
    },
});

export default styles;
