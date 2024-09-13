import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';

const imageDimensions = calculateImageDimensions(185, 2, 3);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    backdropImage: {
        height: '50%',
    },
    posterImage: {
        borderRadius: 12,
        ...imageDimensions,
    },
    posterSection: {},
    title: {
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    introductionSection: {
        marginBottom: 24,
    },
    content: {
        backgroundColor: 'pink',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    linearGradient: {
        height: 320,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollLabel: {
        paddingHorizontal: spacing.large,
    },
});

export default styles;
