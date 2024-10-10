import { StyleSheet } from 'react-native';
import { calculateImageDimensions } from '@shared/utils';

const imageDimensions = calculateImageDimensions(200, 2, 3);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    head: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
    },
    backdropImage: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    body: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingTop: 10,
    },
    posterImage: {
        ...imageDimensions,
        resizeMode: 'cover',
        zIndex: 100,
        borderRadius: 10,
        elevation: 10,
        borderWidth: 2,
        borderColor: 'black',
    },
    containerPoster: {
        paddingTop: 10,
    },
    informCollection: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 0.5,
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 0.5,
    },
    textOverlayText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;
