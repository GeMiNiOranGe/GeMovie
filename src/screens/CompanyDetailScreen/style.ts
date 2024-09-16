import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    body: {
        flex: 2,
        backgroundColor: 'white',
    },
    scrollContainer: {
        paddingLeft: 15,
        paddingTop: 10,
    },
    containerMovie: {
        flex: 4,
        paddingLeft: 10,
    },
    containerMovieText: {
        fontSize: 15,
        color: 'black',
    },
    movieThumbnail: {
        width: 120,
        height: 180,
        borderRadius: 20,
        marginRight: 10,
    },
    text: {
        fontSize: 32,
        color: 'black',
    },
    backdropImage: {
        height: '80%',
        width: '80%',
    },
});

export default styles;
