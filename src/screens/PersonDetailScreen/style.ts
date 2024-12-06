import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';
import { calculateImageDimensions } from '@shared/utils';

const profileDimension = calculateImageDimensions(120, 2, 3);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: spacing.huge,
    },
    profileBox: {
        marginVertical: spacing.large,
    },
    profile: {
        ...profileDimension,
        borderRadius: 8,
    },
    text: {
        fontSize: 15,
        color: 'black',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '80%',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    homepageLink: {
        borderWidth: 1,
        borderColor: colors.neutral,
        marginRight: spacing.small,
    },
    homepageText: {
        fontSize: 14,
        color: colors.text,
        marginHorizontal: spacing.small,
    },
    imdbLink: {
        borderWidth: 1,
        borderColor: colors.neutral,
    },
    labelBox: {
        marginBottom: spacing.huge,
    },
});
export default styles;
