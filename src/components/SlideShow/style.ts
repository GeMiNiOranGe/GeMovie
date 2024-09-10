import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 10,
        position: 'relative',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 500,
        height: 300,
        resizeMode: 'cover',
    },
    pagination: {
        bottom: 10,
    },
    textContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
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
    arrowButton: {
        position: 'absolute',
        top: '40%',
        zIndex: 10,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
