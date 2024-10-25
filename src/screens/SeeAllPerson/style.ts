import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    containerItem: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        width: 310,
        height: 90,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        justifyContent: 'space-between',
    },
    crownOverlay: {
        position: 'absolute',
        left: '26%',
        bottom: 15,
        transform: [{ translateX: -9 }],
        zIndex: 1,
    },
    movieThumbnail: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
        borderColor: '#7CB9E8',
        borderWidth: 3,
        padding: 3,
        backgroundColor: 'transparent',
    },
    movieList: {
        width: '100%',
        paddingTop: 10,
    },
    movieItem: {
        justifyContent: 'center',
        width: itemWidth - 30,
    },
    movieTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        width: '100%',
    },
    title: {
        color: 'black',
        fontSize: 13,
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        height: height * 0.8,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    movieListItem: {
        marginVertical: 10,
        flexShrink: 2,
        maxWidth: width * 0.4,
        paddingHorizontal: 5,
    },
    movieListTitle: {
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
        color: 'black',
        fontWeight: 'bold',
        lineHeight: 18,
    },
    Thumbnail: {
        width: width * 0.3,
        height: height / 4,
        marginRight: 20,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        height: 50,
        width: 100,
        justifyContent: 'center',
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default styles;
