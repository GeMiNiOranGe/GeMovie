import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const poster = calculateImageDimensions(120, 2, 3);
const shadowPadding = spacing.small;
const nameBoxPaddingHeight = poster.height / 4;
const headerPaddingHeight = poster.height / 2;
const linearGradientHeight =
    (nameBoxPaddingHeight + headerPaddingHeight) * 2 + shadowPadding;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    backdrop: {
        height: '50%',
    },
    linearGradient: {
        height: linearGradientHeight,
    },
    header: {
        paddingTop: headerPaddingHeight,
        paddingHorizontal: spacing.large,
    },
    posterBox: {
        marginRight: spacing.large,
        marginBottom: shadowPadding,
        overflow: 'hidden',
        borderRadius: 8,
        backgroundColor: colors.primary,
        elevation: 4,
    },
    poster: {
        ...poster,
    },
    nameBox: {
        paddingTop: nameBoxPaddingHeight,
    },
    name: {
        fontSize: 20,
        color: colors.text,
        fontWeight: 'bold',
        marginVertical: spacing.medium,
    },
    rating: {
        margin: 0,
    },
    numberOfMovies: {
        fontSize: 14,
        color: colors.subtext,
        marginTop: spacing.small,
    },
    overviewBox: {
        marginBottom: spacing.large,
    },
    genreList: {
        marginBottom: spacing.huge,
    },
    genreContentList: {
        paddingHorizontal: spacing.large,
    },
    content: {
        paddingTop: spacing.extraLarge,
        backgroundColor: colors.primary,
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
});

export default styles;
