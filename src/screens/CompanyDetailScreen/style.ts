import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    LogoContent: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 60,
    },
    body: {
        flex: 4,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: '-28%',
    },
    scrollContainer: {
        paddingLeft: 15,
        marginTop: 10,
        justifyContent: 'center',
    },
    containerMovie: {
        flex: 4,
        paddingLeft: 10,
        marginTop: 10,
    },
    containerMovieText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FF3333',
        marginBottom: 5,
    },
    movieThumbnail: {
        width: width * 0.3,
        height: height * 0.25,
        borderRadius: 20,
        marginRight: 10,
    },
    text: {
        fontSize: 32,
        color: 'black',
    },
    backdropImage: {
        width: 100,
        height: 100,
        borderRadius: 300,
        borderWidth: 4,
        borderColor: '#fff',
        position: 'absolute',
        bottom: -48,
        left: '50%',
        backgroundColor: 'white',
        transform: [{ translateX: -48 }],
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
        position: 'absolute',
        bottom: -48,
        left: '46%',
        transform: [{ translateX: -48 }],
    },
    icon: {
        textAlign: 'center',
    },
});

export default styles;
