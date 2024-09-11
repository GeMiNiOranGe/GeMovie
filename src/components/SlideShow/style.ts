import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 300,
        resizeMode: 'cover',
    },
    pagination: {
        bottom: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        left: 10,
        alignItems: 'center',
    },
    textContainer: {
        maxWidth: width * 0.7,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
    },
    title: {
        color: '#fff',
        fontSize: 20,
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
        top: '50%',
        zIndex: 10,
        width: 40,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
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
        right: 5,
    },
});

export default styles;
