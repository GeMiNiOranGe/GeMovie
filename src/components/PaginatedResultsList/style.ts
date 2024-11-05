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
    iconBox: {
        marginBottom: spacing.large,
    },
    noResultsBox: {
        marginHorizontal: spacing.extraHuge,
    },
    noResultsText: {
        color: 'black',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: spacing.small,
    },
    noResultsSubtext: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default styles;
