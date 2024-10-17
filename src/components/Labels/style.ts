import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const styles = StyleSheet.create({
    labelContentList: {
        paddingHorizontal: spacing.large,
    },
    itemSeparator: {
        width: 1,
        backgroundColor: themeColor.neutral,
        marginVertical: spacing.small,
    },
});

export default styles;
