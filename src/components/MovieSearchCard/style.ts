import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';

const imageDimensions = calculateImageDimensions(116, 2, 3);

const styles = StyleSheet.create({
    button: {
        marginBottom: 12,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 12,
        paddingBottom: 12,
    },
    cardImage: {
        borderRadius: 4,
        ...imageDimensions,
    },
    cardImageView: {
        elevation: 5,
    },
    cardContent: {
        top: 12,
        padding: 8,
        flexShrink: 1,
    },
    cardBackground: {
        backgroundColor: 'white',
        borderRadius: 12,
        top: 12,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
    information: {
        fontSize: 12,
        color: 'gray',
    },
    flexEnd: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    ratingView: {
        backgroundColor: '#ff4273',
        borderRadius: 1000,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        color: 'white',
    },
    overview: {
        marginVertical: 8,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
});

export default styles;
