import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const profileDimensions = calculateImageDimensions(144, 2, 3);

const styles = StyleSheet.create({
    card: {
        width: profileDimensions.width,
        borderRadius: 8,
        backgroundColor: colors.background,
        overflow: 'hidden',
    },
    profileBox: {
        marginBottom: spacing.extraLarge,
    },
    profile: {
        ...profileDimensions,
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
