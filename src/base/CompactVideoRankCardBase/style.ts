import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';
import { calculateImageDimensions } from '@shared/utils';

const posterDimensions = calculateImageDimensions(144, 2, 3);
const cardRadius = 8;

const styles = StyleSheet.create({
    card: {
        width: posterDimensions.width,
        borderRadius: cardRadius,
        overflow: 'hidden',
        backgroundColor: colors.background,
    },
    posterBox: {
        marginBottom: spacing.extraLarge,
    },
    poster: {
        ...posterDimensions,
    },
    rankBox: {
        bottom: -32,
        marginLeft: spacing.small,
    },
    rank: {
        color: colors.text,
        fontSize: 56,
        fontWeight: 'bold',
    },
    mediaTypeBox: {
        borderBottomLeftRadius: cardRadius,
        backgroundColor: colors.neutral,
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.tiny,
        elevation: 4,
    },
    mediaTypeText: {
        fontSize: 10,
        color: colors.text,
    },
    content: {
        paddingHorizontal: spacing.small,
        paddingBottom: spacing.small,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
    textWithBorder: {
        textShadowColor: '#fff',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});

export default styles;
