import { StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const paddingCard = spacing.small;
const logoRadius = 8;
const logoSize = 64;
const cardWidth = logoSize + paddingCard * 2;

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        borderRadius: logoRadius,
    },
    logoBox: {
        padding: paddingCard,
        backgroundColor: colors.background,
        borderRadius: logoRadius,
    },
    logo: {
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
    country: {
        fontSize: 14,
        color: colors.subtext,
    },
});

export default styles;
