import { StyleSheet } from 'react-native';

import { spacing } from '@shared/constants';
import { colors } from '@shared/themes';

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: spacing.large,
        paddingTop: spacing.small,
        paddingBottom: spacing.large,
    },
    noRecommendationText: {
        fontSize: 14,
        color: colors.text,
    },
    activityIndicator: {
        marginTop: spacing.small,
        marginBottom: spacing.large,
    },
});
export default styles;
