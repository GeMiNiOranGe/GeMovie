import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';

const imageDimensions = calculateImageDimensions(116, 2, 3);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    card: {
        marginTop: spacing.medium,
        backgroundColor: 'white',
        borderRadius: outerRadius,
    },
    contentCard: {
        flexDirection: 'row',
        paddingLeft: paddingCard,
    },
    image: {
        borderRadius: innerRadius,
        ...imageDimensions,
    },
    imageBox: {
        elevation: 4,
        marginRight: spacing.large,
        top: -paddingCard,
        backgroundColor: '#f1f1f1',
    },
    content: {
        paddingVertical: spacing.medium,
        paddingRight: spacing.medium,
        flexShrink: 1,
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
    information: {
        fontSize: 12,
        color: 'gray',
    },
    ratingBox: {
        backgroundColor: '#ff4273',
        borderTopLeftRadius: innerRadius,
        borderBottomRightRadius: innerRadius,
        width: 52,
        height: 24,
    },
    ratingText: {
        color: 'white',
        fontSize: 12,
        marginLeft: spacing.tiny,
    },
    overview: {
        marginVertical: spacing.tiny,
    },
    navigationBox: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    navigationIconButton: {
        margin: 0,
        backgroundColor: '#ff4273',
        borderRadius: 0,
        borderTopLeftRadius: outerRadius,
        borderBottomRightRadius: outerRadius,
    },
});

export default styles;
