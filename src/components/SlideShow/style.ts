import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const sliderWidth = width;
export const itemWidth = width * 0.65;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative',
    },
    carouselContainer: {
        marginTop: 10,
    },
    carouselContentContainer: {
        alignItems: 'center',
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
    },
    image: {
        width: itemWidth * 0.9,
        height: height / 2,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        left: 5,
        alignItems: 'center',
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
});

export default styles;
