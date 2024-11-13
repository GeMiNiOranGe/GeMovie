import { Dimensions, StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const cardWidth = Dimensions.get('window').width * 0.75;

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        borderRadius: 8,
    },
    authorBox: {
        marginBottom: spacing.tiny,
    },
    author: {
        fontSize: 14,
        color: colors.text,
    },
    authorName: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: colors.text,
    },
    content: {
        color: colors.subtext,
    },
    rating: {
        marginLeft: 0,
    },
    ratingValue: {
        fontSize: 14,
    },
});

export default styles;
