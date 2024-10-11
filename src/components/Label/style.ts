import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { themeColor } from '@shared/themes';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    name: {
        fontSize: 12,
        color: themeColor.subtext,
    },
    value: {
        fontSize: 14,
        color: themeColor.text,
    },
    icon: {
        marginRight: spacing.tiny,
    },
});

export default styles;
