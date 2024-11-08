import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '@shared/themes';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    header: {
        height: height * 0.55,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
        paddingHorizontal: 10,
    },
    containerSectionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    sectionTitle: {
        color: colors.text,
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
        marginTop: 5,
    },
    genreTag: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fdfefe',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        zIndex: 1,
    },
    tagIcon: {
        marginRight: 4,
    },
    mediaType: {
        fontSize: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    topRatedItemContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
    },
    Thumbnail: {
        width: width * 0.4,
        height: height / 3,
        marginRight: 20,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    rankingIcon: {
        position: 'absolute',
        top: 6,
        right: 105,
        width: width * 0.3,
        height: height / 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rankingText: {
        color: '#000000',
        fontFamily: '',
        fontSize: 80,
        fontWeight: 'bold',
        borderColor: 'black',
    },
    textWithBorder: {
        textShadowColor: '#fff',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});
export default styles;
