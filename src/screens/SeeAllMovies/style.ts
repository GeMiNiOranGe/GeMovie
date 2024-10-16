import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051a2d',
        alignItems: 'center',
        width: width,
    },
    movieThumbnail: {
        width: 100,
        height: height / 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
        marginVertical: 5,
        marginHorizontal: 5,
        resizeMode: 'cover',
    },
    movieList: {
        paddingTop: 10,
    },
    movieItem: {
        width: itemWidth,
        marginBottom: 10,
    },
    movieTitle: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 10,
        width: '100%',
    },
});

export default styles;
