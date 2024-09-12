import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { calculateImageDimensions } from '@shared/utils';

const imageDimensions = calculateImageDimensions(64);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    card: {
        padding: paddingCard,
        borderRadius: outerRadius,
        backgroundColor: 'white',
    },
    image: {
        ...imageDimensions,
        marginRight: spacing.large,
        borderRadius: innerRadius,
    },
    content: {
        justifyContent: 'center',
        flexShrink: 1,
    },
    title: {
        marginBottom: spacing.tiny,
        color: 'black',
        fontSize: 16,
    },
    text: {
        fontSize: 12,
        color: 'gray',
    },
    navigationBox: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    navigationIconButton: {
        marginRight: 0,
    },
});

export default styles;
