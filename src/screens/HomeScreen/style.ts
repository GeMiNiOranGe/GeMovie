import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '@shared/themes';

const height = Dimensions.get('window').height;

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
    text: {
        fontSize: 14,
        color: colors.text,
    },
});
export default styles;
