import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';

const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    card: {
        marginBottom: spacing.small,
        padding: paddingCard,
        borderRadius: outerRadius,
        backgroundColor: 'white',
    },
    cardContent: {
        flexDirection: 'row',
    },
    image: {
        height: 64,
        width: 64,
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
