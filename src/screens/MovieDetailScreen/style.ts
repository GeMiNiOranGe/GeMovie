import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const posterDimensions = calculateImageDimensions(160, 2, 3);
const collectionPosterDimensions = calculateImageDimensions(64, 2, 3);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    backdrop: {
        height: '50%',
    },
    posterBox: {
        marginVertical: 16,
    },
    posterNotFound: {
        backgroundColor: colors.background,
    },
    poster: {
        borderRadius: 12,
        ...posterDimensions,
    },
    titleBox: {
        alignItems: 'center',
        marginBottom: spacing.small,
        paddingHorizontal: spacing.large,
    },
    title: {
        fontSize: 24,
        color: colors.text,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
    notFoundText: {
        fontSize: 12,
        color: colors.text,
        marginTop: spacing.small,
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
    homepageLink: {
        backgroundColor: colors.accent.dark,
        marginRight: spacing.small,
    },
    informationBox: {
        paddingHorizontal: spacing.large,
        marginBottom: spacing.huge,
    },
    informationTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        paddingBottom: spacing.small,
    },
    collectionPosterBox: {
        marginRight: spacing.large,
    },
    collectionPoster: {
        ...collectionPosterDimensions,
    },
    collectionTitle: {
        fontSize: 16,
        color: colors.primary,
    },
    expandableText: {
        paddingHorizontal: spacing.large,
    },
    content: {
        backgroundColor: colors.primary,
    },
    labelBox: {
        marginBottom: spacing.huge,
    },
});

export default styles;
