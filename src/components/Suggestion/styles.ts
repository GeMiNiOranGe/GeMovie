import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { calculateImageDimensions } from '@shared/utils';
import { colors } from '@shared/themes';

const posterDimensions = calculateImageDimensions(144, 2, 3);

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: spacing.large,
    },
    itemContainer: {
        marginRight: spacing.small,
    },
    itemImage: {
        ...posterDimensions,
        borderRadius: 8,
    },
    itemText: {
        marginTop: 5,
        fontSize: 14,
        color: colors.text,
        textAlign: 'center',
    },
    placeholderImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#fff',
        fontSize: 12,
    },
    noDataText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginTop: 10,
    },
});
export default styles;
