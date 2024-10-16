// style.js
import { calculateImageDimensions } from '@shared/utils';
import { StyleSheet } from 'react-native';

const imageDimensions = calculateImageDimensions(170, 2, 3);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 300,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
    },
    head: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        padding: 20,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        bottom: 5,
    },
    titleBody: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentBody: {
        marginTop: 10,
        padding: 5,
    },
    text: {
        fontSize: 14,
        color: 'white',
    },
    introText: {
        color: 'red',
        fontWeight: 'bold',
    },
    expandText: {
        fontSize: 16,
        color: 'white',
    },
    posterImage: {
        borderRadius: 12,
        ...imageDimensions,
        marginLeft: 20,
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalImage: {
        width: 290,
        height: 450,
        borderRadius: 10,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    youtubeContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noVideoContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
