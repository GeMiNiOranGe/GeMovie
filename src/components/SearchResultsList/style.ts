import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.large,
    },
    footer: {
        marginTop: spacing.small,
    },
    header: {
        marginBottom: spacing.tiny,
    },
    headerText: {
        color: 'gray',
        marginLeft: spacing.medium,
    },
});

export default styles;
