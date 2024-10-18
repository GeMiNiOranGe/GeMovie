import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { calculateImageDimensions } from '@shared/utils';
import { colors } from '@shared/themes';

const imageDimensions = calculateImageDimensions(64);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    card: {
        paddingVertical: paddingCard,
        paddingLeft: paddingCard,
        borderRadius: outerRadius,
        backgroundColor: colors.primary,
    },
    image: {
        ...imageDimensions,
        marginRight: spacing.large,
        borderRadius: innerRadius,
    },
    notFoundImage: {
        backgroundColor: colors.background,
    },
    content: {
        justifyContent: 'center',
        flexShrink: 1,
    },
    title: {
        marginBottom: spacing.tiny,
        color: colors.text,
        fontSize: 16,
    },
    text: {
        fontSize: 12,
        color: colors.subtext,
    },
    navigationIconButton: {
        margin: 0,
        marginVertical: '35%',
        borderRadius: 0,
        borderTopLeftRadius: outerRadius,
        borderBottomLeftRadius: outerRadius,
        backgroundColor: colors.accent.dark,
    },
});

export default styles;
