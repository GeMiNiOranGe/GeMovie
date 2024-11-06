import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { calculateImageDimensions } from '@shared/utils';
import { colors } from '@shared/themes';

const profileDimensions = calculateImageDimensions(96, 3, 4);

const styles = StyleSheet.create({
    card: {
        width: profileDimensions.width,
    },
    profileBox: {
        marginBottom: spacing.tiny,
    },
    profile: {
        ...profileDimensions,
        borderRadius: 8,
    },
    name: {
        fontSize: 14,
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.tiny,
    },
    character: {
        fontSize: 12,
        color: colors.subtext,
        textAlign: 'center',
    },
});

export default styles;
