import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';

const posterDimension = calculateImageDimensions(144, 2, 3);
const stillDimension = calculateImageDimensions(104, 2, 3);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    header: {
        paddingTop: spacing.small,
    },
    posterBox: {
        marginHorizontal: spacing.large,
    },
    poster: {
        ...posterDimension,
    },
    title: {
        fontSize: 20,
        color: colors.text,
        fontWeight: 'bold',
        marginVertical: spacing.large,
    },
    rating: {
        marginHorizontal: 0,
    },
    content: {
        paddingTop: spacing.large,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
    listContent: {
        padding: spacing.large,
        paddingTop: spacing.small,
    },
    episode: {
        backgroundColor: colors.primary,
        overflow: 'hidden',
    },
    episodeContent: {
        marginHorizontal: spacing.large,
    },
    episodeRating: {
        margin: 0,
        marginRight: spacing.small,
    },
    episodeTitle: {
        fontSize: 16,
        color: colors.text,
        marginTop: spacing.large,
        marginBottom: spacing.small,
    },
    episodeStill: {
        ...stillDimension,
    },
});

export default styles;
