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
        paddingVertical: 16,
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
    genreContentList: {
        paddingHorizontal: spacing.large,
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
    },
    imdbLink: {
        marginLeft: spacing.small,
    },
    informationBox: {
        paddingHorizontal: spacing.large,
        marginBottom: spacing.extraLarge,
    },
    informationTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        paddingBottom: spacing.small,
    },
    collectionPoster: {
        ...collectionPosterDimensions,
    },
    collectionTitleBox: {
        paddingLeft: spacing.large,
        paddingRight: spacing.medium,
    },
    collectionTitle: {
        fontSize: 16,
        color: colors.primary,
    },
    expandableText: {
        color: colors.subtext,
    },
    content: {
        backgroundColor: colors.primary,
    },
    labelBox: {
        marginBottom: spacing.huge,
    },
});

export default styles;
