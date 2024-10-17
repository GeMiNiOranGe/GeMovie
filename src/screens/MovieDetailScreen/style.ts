import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const imageDimensions = calculateImageDimensions(160, 2, 3);

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
        paddingHorizontal: spacing.large,
    },
    title: {
        fontSize: 24,
        color: themeColor.text,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: themeColor.text,
    },
    subtext: {
        fontSize: 14,
        color: themeColor.subtext,
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
    synopsisBox: {
        paddingHorizontal: spacing.large,
        marginBottom: spacing.large,
    },
    synopsisTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        paddingBottom: spacing.small,
    },
    expandableText: {
        paddingHorizontal: spacing.large,
    },
    content: {
        backgroundColor: themeColor.primary,
    },
    labelBox: {
        marginBottom: spacing.huge,
    },
    companyContentList: {
        paddingHorizontal: spacing.large,
    },
});

export default styles;
