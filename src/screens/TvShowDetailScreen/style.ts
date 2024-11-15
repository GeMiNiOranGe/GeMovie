// style.js
import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    headerContainer: {
        height: 300,
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
    },
    head: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingTop: 300,
    },
    bodyOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 260,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex: 1,
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 1,
    },
    body: {
        position: 'relative',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex: 3,
        marginTop: -27,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginVertical: 15,
    },
    titleBody: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    labelText: {
        fontSize: 14,
        color: 'white',
    },
    descriptionContainer: {
        marginTop: 20,
    },
    text: {
        fontSize: 14,
        color: 'white',
    },
    introText: {
        color: 'red',
        fontWeight: 'bold',
    },
    expandText: {
        fontSize: 16,
        color: 'white',
    },
    posterImage: {
        width: 150,
        height: 225,
        borderRadius: 10,
        marginBottom: -50,
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#FF4757',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    youtubeContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noVideoContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingTop: 4,
        borderRadius: 70,
        height: 50,
        width: 50,
        transform: [{ translateY: -25 }],
        zIndex: 3,
        top: '50%',
    },
    playButtonText: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    genreBox: {
        marginBottom: spacing.small,
    },
    genre: {
        fontSize: 12,
        color: colors.text,
        marginVertical: 4,
        marginLeft: 12,
        marginRight: 12,
    },
    genreContentList: {
        paddingHorizontal: spacing.large,
    },
    genreChip: {
        borderRadius: 1000,
        backgroundColor: colors.background,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.small,
    },
    star: {
        fontSize: 25,
        color: '#FFD700',
        textAlign: 'center',
    },
    actionArea: {
        marginBottom: spacing.large,
    },
    homepageLink: {
        backgroundColor: colors.accent.dark,
    },
    chip: {
        borderRadius: 1000,
        backgroundColor: colors.background,
    },
    chipText: {
        fontSize: 12,
        color: colors.text,
        marginVertical: 4,
        marginLeft: 12,
        marginRight: 12,
    },
    seasonsContainer: {
        paddingHorizontal: spacing.medium,
    },
    seasonItem: {
        marginRight: spacing.medium,
        alignItems: 'center',
    },
    seasonPoster: {
        width: 120,
        height: 180,
        borderRadius: 8,
    },
    seasonTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: spacing.small,
    },
    seasonDetails: {
        fontSize: 12,
        color: colors.text.toString(),
    },
    noSeasonsText: {
        textAlign: 'center',
        color: colors.text.toString(),
        fontSize: 14,
    },
    networkItem: {
        marginRight: spacing.medium,
        alignItems: 'center',
        width: 80,
    },
    networkLogo: {
        width: 70,
        height: 70,
        borderRadius: 8,
        resizeMode: 'contain',
    },
    networkName: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
        color: colors.text.toString(),
    },
    networkCountry: {
        fontSize: 10,
        color: colors.text.toString(),
        textAlign: 'center',
    },
    networksContainer: {
        paddingVertical: spacing.small,
    },
    noNetworksText: {
        color: colors.text.toString(),
        textAlign: 'center',
        marginVertical: spacing.small,
    },
});

export default styles;
