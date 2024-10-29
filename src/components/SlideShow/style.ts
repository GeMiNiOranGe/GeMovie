import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
export const sliderWidth = width;
export const itemWidth = width * 0.6;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#121212',
        position: 'relative',
    },
    carouselContainer: {
        marginTop: 20,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: itemWidth * 0.9,
        height: height * 0.5,
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
        bottom: 15,
        left: 10,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#FF4757',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
});
export default styles;
