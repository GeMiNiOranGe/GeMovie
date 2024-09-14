import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Get screen width

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative',
        height: '100%',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: height / 3.5,
        resizeMode: 'cover',
    },
    pagination: {
        bottom: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 1,
        left: 5,
        alignItems: 'center',
    },
    textContainer: {
        maxWidth: width * 0.5,
        maxHeight: height / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    releaseDate: {
        color: '#fff',
        fontSize: 14,
    },
    playIcon: {
        marginLeft: 10,
    },
    arrowButton: {
        position: 'absolute',
        top: '40%',
        zIndex: 10,
        width: 25,
        height: 25,
        justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 15,
    },
    arrowText: {
        color: '#fff',
        fontSize: 24,
    },
    prevButton: {
        left: 5,
    },
    nextButton: {
        right: 10,
    },
});

export default styles;
