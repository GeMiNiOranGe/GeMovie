import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: spacing.medium,
        padding: spacing.medium,
        borderRadius: 16,
        borderColor: 'transparent',
    },
    wrapper: {
        flexDirection: 'row',
    },
    title: {
        marginBottom: spacing.tiny,
        color: 'black',
        fontSize: 16,
    },
    content: {
        justifyContent: 'center',
        flexShrink: 1,
    },
    image: {
        height: 48,
        width: 48,
        marginRight: spacing.medium,
        borderRadius: 4,
    },
    forwardButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 12,
        color: 'gray',
    },
});

export default styles;
