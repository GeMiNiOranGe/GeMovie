import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: spacing.large,
    },
    text: {
        fontSize: 14,
        color: themeColor.text,
    },
    icon: {
        marginRight: spacing.tiny,
    },
});

export default styles;
