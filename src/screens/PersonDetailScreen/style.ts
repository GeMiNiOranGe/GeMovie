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
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    body: {
        flex: 4,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: '-28%',
    },
    containerProfile: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 60,
    },
    departmentText: {
        fontSize: 15,
        textAlign: 'center',
    },
    scrollContainer: {
        marginTop: 10,
        justifyContent: 'center',
    },
    biography: {
        flex: 1,
        padding: 5,
    },
    biographyText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FF9933',
    },
    containerMovie: {
        flex: 4,
        paddingLeft: 10,
        marginTop: 10,
    },
    movieThumbnail: {
        width: width * 0.3,
        height: height * 0.25,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 5,
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
    text: {
        fontSize: 15,
        color: 'black',
    },
    titleBody: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default styles;
