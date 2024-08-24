import { StyleSheet } from 'react-native';

import { calculateAspectRatio } from '@shared/utils';

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
        ...calculateAspectRatio(185),
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
});

export default styles;
