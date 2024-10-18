import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const paddingCard = spacing.small;
const logoSize = 64;
const cardWidth = logoSize + paddingCard * 2;

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
    },
    imageBox: {
        padding: paddingCard,
        backgroundColor: colors.background,
    },
    image: {
        width: logoSize,
        height: logoSize,
    },
    nameBox: {
        marginTop: spacing.tiny,
    },
    name: {
        fontSize: 14,
        color: colors.text,
    },
});

export default styles;
