import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const imageDimensions = calculateImageDimensions(72, 3, 4);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: outerRadius,
        paddingVertical: paddingCard,
        backgroundColor: themeColor.primary,
    },
    imageBox: {
        marginLeft: paddingCard,
        marginRight: spacing.large,
        backgroundColor: themeColor.background,
    },
    image: {
        borderRadius: innerRadius,
        ...imageDimensions,
    },
    content: {
        flexShrink: 1,
    },
    title: {
        fontSize: 16,
        color: themeColor.text,
        marginBottom: 12,
    },
    text: {
        fontSize: 12,
        color: themeColor.text,
    },
    subtext: {
        fontSize: 12,
        color: themeColor.subtext,
    },
    knownForDepartment: {
        marginBottom: spacing.tiny,
    },
    knownFor: {
        marginRight: spacing.small,
    },
    filmNameBox: {
        flexShrink: 1,
    },
    navigationIconButton: {
        flex: 1,
        margin: 0,
        borderRadius: 0,
        borderTopLeftRadius: outerRadius,
        borderBottomLeftRadius: outerRadius,
        marginVertical: '65%',
        backgroundColor: themeColor.accent.dark,
    },
});

export default styles;
