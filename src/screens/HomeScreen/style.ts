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
        height: height * 0.55,
    },
    content: {
        flex: 3,
        width: '100%',
        height: '50%',
        paddingHorizontal: 10,
        position: 'relative',
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
        height: '80%',
        paddingLeft: 10,
    },
    containerSectionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        marginTop: 5,
    },
    celebrityList: {
        flexDirection: 'row',
        top: 4,
    },
    celebrityItem: {
        marginRight: 10,
        alignItems: 'center',
        height: 100,
    },
    celebrityThumbnail: {
        width: width * 0.25,
        height: height * 0.15,
        borderRadius: 60,
    },
    celebrityName: {
        color: '#fff',
        marginTop: 4,
        fontSize: 15,
        textAlign: 'center',
    },
    scrollContent: {
        flex: 1,
        paddingBottom: 20,
    },
    containerTV: {
        flex: 1,
        marginTop: 15,
        marginBottom: 10,
        position: 'relative',
    },
    TvList: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    TvThumbnail: {
        width: width * 0.3,
        height: height / 4,
        marginRight: 10,
        borderRadius: 20,
        resizeMode: 'stretch',
    },
    percentVote: {
        height: 30,
        width: 30,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: '#006633',
        borderColor: '#006633',
        position: 'absolute',
    },
    topRatedItemContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    rankingIcon: {
        position: 'absolute',
        top: 6,
        right: 80,
        width: width * 0.3,
        height: height / 4,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -10,
    },
    rankingText: {
        color: '#fff',
        fontFamily: '',
        fontSize: 50,
        fontWeight: 'bold',
    },
});
export default styles;
