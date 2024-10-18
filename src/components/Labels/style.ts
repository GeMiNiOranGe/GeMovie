import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    labelContentList: {
        paddingHorizontal: spacing.large,
    },
    itemSeparator: {
        width: 1,
        backgroundColor: colors.neutral,
        marginVertical: spacing.small,
    },
});

export default styles;
