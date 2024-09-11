import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051a2d',
        alignItems: 'center',
        width: width,
        padding: 10,
    },
    movieThumbnail: {
        width: 160,
        height: 250,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
        marginHorizontal: 20,
        marginVertical: 10,
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
        marginLeft: 20,
        width: '100%',
    },
});

export default styles;
