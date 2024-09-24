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
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
    },
    image: {
        width: itemWidth * 0.9,
        height: height / 2,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    contentContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        left: 10,
        alignItems: 'center',
    },
    textContainer: {
        maxWidth: width * 0.6,
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
});

export default styles;
