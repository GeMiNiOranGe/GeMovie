import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
export const itemWidth = width * 0.65;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#121212',
        position: 'relative',
    },
    carouselContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: itemWidth,
    },
    image: {
        width: '100%',
        height: height * 0.55,
        resizeMode: 'cover',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.8,
    },
    contentContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 3,
        left: 3,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 5,
        borderRadius: 8,
    },
    textContainer: {
        maxWidth: width * 0.4,
        maxHeight: height / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        flexShrink: 1,
    },
    releaseDate: {
        color: '#fff',
        fontSize: 14,
    },
    playIcon: {
        marginLeft: 5,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
    },
    watchlistContainer: {
        right: '50%',
        top: 3,
    },
});

export default styles;
