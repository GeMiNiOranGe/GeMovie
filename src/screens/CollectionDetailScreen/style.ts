import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';

const imageDimensions = calculateImageDimensions(200, 2, 3);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backdropBox: {
        width: '100%',
        height: 350,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: 1,
    },
    content: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 5,
    },
    poster: {
        ...imageDimensions,
        resizeMode: 'cover',
        zIndex: 2,
        borderRadius: 10,
        elevation: 10,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    },
    posterBox: {
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
        color: 'red',
        fontWeight: 'bold',
    },
});

export default styles;
