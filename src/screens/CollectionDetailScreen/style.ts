import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const poster = calculateImageDimensions(120, 2, 3);
const nameBoxPaddingHeight = poster.height / 4;
const headerPaddingHeight = poster.height / 2;
const linearGradientHeight = (nameBoxPaddingHeight + headerPaddingHeight) * 2;

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
    },
    poster: {
        ...poster,
        borderRadius: 8,
    },
    nameBox: {
        paddingTop: nameBoxPaddingHeight,
    },
    name: {
        fontSize: 16,
        color: colors.text,
        fontWeight: 'bold',
        marginVertical: spacing.small,
    },
    rating: {
        margin: 0,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
    content: {
        paddingTop: spacing.large,
        backgroundColor: colors.primary,
    },
    informationBox: {
        paddingHorizontal: spacing.large,
        marginBottom: spacing.extraLarge,
    },
    informationTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.text,
        paddingBottom: spacing.tiny,
    },
});

export default styles;
