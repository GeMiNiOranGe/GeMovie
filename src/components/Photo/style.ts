import { StyleSheet } from 'react-native';

import { calculateImageDimensions } from '@shared/utils';

const imageDimensions = calculateImageDimensions(96, 2, 3);

const styles = StyleSheet.create({
    image: {
        ...imageDimensions,
    },
});

export default styles;
