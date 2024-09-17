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
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 5,
    },
    headerContent: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    body: {
        flex: 2.5,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        marginBottom: 5,
    },
    movieThumbnail: {
        width: width * 0.3,
        height: height * 0.3,
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
