import { StyleSheet } from 'react-native';
import { calculateImageDimensions } from '@shared/utils';
import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const imageDimensions = calculateImageDimensions(72, 3, 4);
const paddingCard = spacing.medium;
const innerRadius = 4;
const outerRadius = innerRadius + paddingCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.large,
    },
    movieList: {
        flex: 1,
        marginTop: spacing.medium,
        paddingVertical: spacing.medium,
    },
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: outerRadius,
        paddingVertical: paddingCard,
        marginBottom: spacing.large,
        backgroundColor: colors.primary,
    },
    movieThumbnail: {
        ...imageDimensions,
        borderRadius: innerRadius,
        marginLeft: paddingCard,
        opacity: 0.9,
    },
    crownOverlay: {
        position: 'absolute',
        top: 85,
        left: 70,
    },
    movieItem: {
        flex: 1,
        marginLeft: spacing.medium,
        justifyContent: 'center',
    },
    movieTitle: {
        fontSize: 16,
        color: colors.text,
        marginBottom: spacing.tiny,
    },
    text: {
        fontSize: 12,
        color: colors.subtext,
        marginHorizontal: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '85%',
        maxHeight: '90%',
        padding: spacing.large,
        borderRadius: outerRadius,
        backgroundColor: colors.background,
    },
    modalTitle: {
        fontSize: 18,
        color: colors.text,
        marginBottom: spacing.medium,
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
    },
    movieListItem: {
        width: '50%',
        padding: paddingCard / 2,
        alignItems: 'center',
    },
    Thumbnail: {
        ...imageDimensions,
        borderRadius: innerRadius,
    },
    movieListTitle: {
        fontSize: 12,
        color: colors.text,
        marginTop: spacing.tiny,
        textAlign: 'center',
    },
    closeButton: {
        alignItems: 'flex-end',
    },
    globalIcon: {
        marginTop: 3,
    },
    informIcon: {
        marginRight: 5,
    },
    containerText: {
        flexDirection: 'row',
        padding: 5,
    },
});

export default styles;
