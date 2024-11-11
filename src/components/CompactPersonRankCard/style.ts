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
});

export default styles;
