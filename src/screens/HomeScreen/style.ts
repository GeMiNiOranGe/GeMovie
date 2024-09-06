import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0b0f1e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'relative',
        height: 100,
        justifyContent: 'center',
        paddingTop: 500,
    },
    headerImage: {
        width: 300,
        height: 490,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 20,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    rating: {
        position: 'absolute',
        left: 25,
        top: 15,
        backgroundColor: '#f5c518',
        padding: 5,
        borderRadius: 5,
    },
    ratingText: {
        fontWeight: 'bold',
    },
    title: {
        position: 'absolute',
        left: 80,
        top: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    watchNow: {
        position: 'absolute',
        right: 25,
        top: 15,
        backgroundColor: '#007bff',
        padding: 7,
        borderRadius: 20,
    },
    watchNowText: {
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        paddingHorizontal: 25,
        paddingVertical: 300,
    },
    movieList: {
        flexDirection: 'row',
        paddingVertical: 15,
    },
    movieThumbnail: {
        width: 100,
        height: 150,
        borderRadius: 10,
        marginRight: 10,
    },
});

export default styles;
