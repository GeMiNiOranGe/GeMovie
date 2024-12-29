import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    headerContainer: {
        height: 300,
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
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
    poster: {
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 1,
    },
    body: {
        position: 'relative',
        backgroundColor: colors.primary,
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
    labelBox: {
        marginBottom: spacing.huge,
    },
    text: {
        fontSize: 14,
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
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
    ratingBox: {
        marginBottom: spacing.extraLarge,
    },
    rating: {
        fontSize: 16,
        color: colors.accent.dark,
        fontWeight: 'bold',
        marginLeft: spacing.tiny,
    },
    actionArea: {
        marginBottom: spacing.large,
    },
    playTouchable: {
        padding: spacing.medium,
        borderRadius: 1000,
        backgroundColor: colors.accent.dark,
    },
    playText: {
        fontSize: 14,
        color: colors.primary,
        marginHorizontal: spacing.small,
    },
    homepageLink: {
        backgroundColor: colors.accent.dark,
        marginLeft: spacing.small,
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
    expandableText: {
        color: colors.subtext,
    },
    watchlistBox: {
        top: -287,
        right: -7,
    },
});

export default styles;
