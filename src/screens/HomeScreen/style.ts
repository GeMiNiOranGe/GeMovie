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
        width: 150,
        height: 230,
        marginRight: 20,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
    },
    movieItem: {
        alignItems: 'center',
    },
    movieTitle: {
        color: '#fff',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
        marginRight: 10,
    },
    section: {
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    containerSectionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        color: 'white',
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
        fontSize: 15,
        textAlign: 'center',
    },
});
export default styles;
