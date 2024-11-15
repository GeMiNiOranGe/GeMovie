import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    containerScrollView: {
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.small,
    },
    rating: {
        marginLeft: 0,
    },
    ratingValue: {
        fontSize: 14,
    },
    author: {
        fontSize: 14,
        color: colors.text,
    },
    authorName: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
});

export default styles;
