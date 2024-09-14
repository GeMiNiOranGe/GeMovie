import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
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
    header: {
        flex: 3.5,
    },
    content: {
        flex: 4,
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
    },
    movieList: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    movieThumbnail: {
        width: width * 0.3,
        height: height / 4,
        marginRight: 20,
        borderRadius: 20,
        resizeMode: 'cover',
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
        flex: 3.5,
        width: '100%',
        height: '50%',
        paddingLeft: 10,
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
        width: width * 0.25,
        height: height * 0.14,
        borderRadius: 60,
    },
    celebrityName: {
        color: '#fff',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
    },
});
export default styles;
