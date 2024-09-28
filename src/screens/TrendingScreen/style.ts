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
        width: 300,
        height: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    movieItem: {
        flex: 1,
        marginTop: 5,
        marginRight: 10,
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 10,
    },
    background: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    overlay: {
        flex: 1,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        justifyContent: 'flex-start',
    },
    listContent: {
        paddingBottom: 20,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnCategory: {
        borderWidth: 1,
        backgroundColor: 'white',
        height: 40,
        width: 70,
        borderRadius: 10,
    },
    textCategory: {
        textAlign: 'center',
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default styles;
