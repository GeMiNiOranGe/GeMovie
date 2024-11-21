import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    searchIconButton: {
        margin: 0,
    },
    genreListContent: {
        padding: spacing.large,
    },
    genreColumnWrapper: {
        marginBottom: spacing.small,
    },
    genreListHeader: {
        marginBottom: spacing.large,
    },
    genreListHeaderText: {
        fontSize: 20,
        color: colors.text,
        fontWeight: 'bold',
    },
    genreChip: {
        borderRadius: 8,
        backgroundColor: colors.background,
    },
    genreChipText: {
        fontSize: 14,
        marginVertical: spacing.large,
    },
});

export default styles;
