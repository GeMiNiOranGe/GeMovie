import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '@shared/themes';
import { calculateImageDimensions } from '@shared/utils';

const height = Dimensions.get('window').height;
const thumbnail = calculateImageDimensions(144, 2, 3);

const styles = StyleSheet.create({
    activityIndicator: {
        backgroundColor: colors.primary,
    },
    container: {
        backgroundColor: colors.primary,
    },
    slideshow: {
        height: height * 0.55,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    genreTag: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.neutral,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        zIndex: 1,
    },
    mediaType: {
        fontSize: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    topRatedItemContainer: {
        position: 'relative',
        flexDirection: 'row',
        marginLeft: 24,
    },
    Thumbnail: {
        ...thumbnail,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    rankingIcon: {
        position: 'absolute',
        left: -24,
        ...thumbnail,
        justifyContent: 'flex-end',
    },
    rankingText: {
        color: '#000000',
        fontFamily: '',
        fontSize: 88,
        fontWeight: 'bold',
    },
    textWithBorder: {
        textShadowColor: '#fff',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});
export default styles;
