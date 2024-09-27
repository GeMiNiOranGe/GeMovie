import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        justifyContent: 'center',
    },
    movieTitle: {
        color: '#fff',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
        marginRight: 10,
    },
    section: {
        flex: 3.5,
        width: '100%',
        height: '50%',
        paddingLeft: 10,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
    movieThumbnail: {
        width: 100,
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    movieItem: {
        marginRight: 10,
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        justifyContent: 'flex-start',
    },
});

export default styles;
