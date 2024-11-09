import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { colors } from '@shared/themes';
import { spacing } from '@shared/constants';

const profileDimensions = calculateImageDimensions(128, 3, 4);

const styles = StyleSheet.create({
    card: {
        width: profileDimensions.width,
        backgroundColor: colors.background,
        overflow: 'hidden',
    },
    profileBox: {
        marginBottom: spacing.tiny,
    },
    profile: {
        ...profileDimensions,
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
