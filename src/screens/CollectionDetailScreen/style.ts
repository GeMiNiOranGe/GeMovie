import { Dimensions, StyleSheet } from 'react-native';
import { calculateImageDimensions } from '@shared/utils';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        width: '100%',
        height: height,
        overflow: 'hidden',
        position: 'relative',
    },
    posterImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    body: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    informCollection: {
        flexDirection: 'row',
    },
    contentBody: {
        marginTop: 10,
        padding: 5,
    },
    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
    },
    textOverlayText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;
