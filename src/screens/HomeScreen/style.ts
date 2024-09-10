import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#0b0f1e',
    },
    content: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    movieList: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    movieThumbnail: {
        width: 140,
        height: 200,
        borderRadius: 10,
        marginRight: 10,
    },
    movieItem: {
        alignItems: 'center',
        marginLeft: 10,
        width: 160,
    },
    movieTitle: {
        color: '#fff',
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
        width: '100%',
    },
    section: {
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    sectionTitle: {
        color: '#f5c518',
        fontSize: 18,
        marginTop: 10,
    },
    celebrityList: {
        flexDirection: 'row',
        top: 10,
    },
    celebrityItem: {
        marginRight: 10,
        alignItems: 'center',
    },
    celebrityThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    celebrityName: {
        color: '#fff',
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
    },
});
export default styles;
