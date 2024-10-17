import { StyleSheet } from 'react-native';

import { themeColor } from '@shared/themes';
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
        backgroundColor: themeColor.background,
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
        color: themeColor.text,
    },
});

export default styles;
