import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const imageDimensions = calculateImageDimensions(185, 2, 3);

const styles = StyleSheet.create({
    container: {
        backgroundColor: themeColor.primary,
    },
    backdrop: {
        height: '50%',
    },
    posterBox: {},
    poster: {
        borderRadius: 12,
        ...imageDimensions,
    },
    titleBox: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    introductionBox: {
        marginBottom: 24,
    },
    content: {
        backgroundColor: themeColor.primary,
    },
    linearGradient: {
        height: 320,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    scrollLabel: {
        paddingHorizontal: spacing.large,
    },
});

export default styles;
