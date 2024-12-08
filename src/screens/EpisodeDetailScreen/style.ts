import { Dimensions, StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';
import { calculateImageDimensions } from '@shared/utils';

const windowWidth = Dimensions.get('window').width - spacing.large * 2;
const stillDimension = calculateImageDimensions(windowWidth, 16, 9);
const profileDimensions = calculateImageDimensions(96, 3, 4);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    stillBox: {
        marginTop: spacing.small,
        marginHorizontal: spacing.large,
    },
    still: {
        ...stillDimension,
    },
    name: {
        fontSize: 20,
        color: colors.text,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: spacing.large,
    },
    ratingBox: {
        marginBottom: spacing.small,
    },
    rating: {
        fontSize: 16,
        color: colors.accent.dark,
        fontWeight: 'bold',
        marginLeft: spacing.tiny,
    },
    runtime: {
        fontSize: 14,
        color: colors.subtext,
        textAlign: 'center',
        marginBottom: spacing.extraLarge,
    },
    content: {
        paddingTop: spacing.large,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        color: colors.subtext,
    },
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
    cardName: {
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
