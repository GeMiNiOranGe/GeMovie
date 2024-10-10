import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const imageDimensions = calculateImageDimensions(184, 2, 3);

const styles = StyleSheet.create({
    container: {
        backgroundColor: themeColor.primary,
    },
    backdrop: {
        height: '50%',
    },
    posterBox: {
        marginVertical: 16,
    },
    posterNotFound: {
        backgroundColor: themeColor.background,
    },
    poster: {
        borderRadius: 12,
        ...imageDimensions,
    },
    titleBox: {
        alignItems: 'center',
        marginBottom: spacing.small,
    },
    title: {
        fontSize: 24,
        color: themeColor.text,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: themeColor.text,
    },
    notFoundText: {
        fontSize: 12,
        color: themeColor.text,
        marginTop: spacing.small,
    },
    genreBox: {
        marginBottom: spacing.small,
    },
    genre: {
        fontSize: 12,
        color: themeColor.text,
        marginVertical: 4,
        marginLeft: 12,
        marginRight: 12,
    },
    genreContentList: {
        paddingHorizontal: spacing.large,
    },
    genreChip: {
        borderRadius: 1000,
        backgroundColor: themeColor.background,
    },
    ratingBox: {
        marginBottom: spacing.large,
    },
    rating: {
        fontSize: 16,
        color: themeColor.accent.dark,
        fontWeight: 'bold',
        marginLeft: spacing.tiny,
    },
    content: {
        backgroundColor: themeColor.primary,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    scrollLabel: {
        paddingHorizontal: spacing.large,
    },
    introductionBox: {
        marginBottom: 24,
    },
});

export default styles;
